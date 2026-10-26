import InstagramDownloader from "@/components/InstagramDownloader";
import { getInstagramToolBySlug, INSTAGRAM_TOOLS } from "@/lib/instagram-tools";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return INSTAGRAM_TOOLS.filter((t) => t.slug).map((tool) => ({
    type: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const tool = getInstagramToolBySlug(type);

  return {
    title: `${tool.name} | VidSnap`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - Free & Anonymous | VidSnap`,
      description: tool.heroSubtitle,
    },
  };
}

export default async function InstagramToolPage({ params }: PageProps) {
  const { type } = await params;
  return <InstagramDownloader initialSlug={type} />;
}
