# ==============================================================================
# Production Dockerfile for VidSnap (Next.js 16 + FFmpeg + yt-dlp + gallery-dl)
# Multi-stage build optimized for minimum image size, security, and performance.
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Install Node Dependencies
# ------------------------------------------------------------------------------
FROM node:20-bookworm-slim AS deps
WORKDIR /app

# Install build essentials if native node-gyp bindings are ever required
RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6 \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm ci

# ------------------------------------------------------------------------------
# Stage 2: Build the Next.js Application
# ------------------------------------------------------------------------------
FROM node:20-bookworm-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Compile production standalone build
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 3: Production Runtime
# ------------------------------------------------------------------------------
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install production system dependencies:
# - ffmpeg: Required for video/audio remuxing and quality conversion
# - python3 + python3-venv: Runtime for yt-dlp, gallery-dl, and instaloader
# - ca-certificates: TLS verification for media streams
# - curl: Healthchecks and diagnostic tooling
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    python3 \
    python3-venv \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set up isolated Python virtual environment for media extraction tools
RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir --upgrade pip && \
    /opt/venv/bin/pip install --no-cache-dir \
      yt-dlp \
      gallery-dl \
      instaloader

# Expose Python tools globally in PATH
ENV PATH="/opt/venv/bin:$PATH"

# Create secure unprivileged user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs

# Copy static assets and standalone application from builder
COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next

# Next.js output standalone bundles minimal dependencies into .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ensure temp directory has write access for download staging
RUN chmod 777 /tmp

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Start the standalone HTTP server
CMD ["node", "server.js"]
