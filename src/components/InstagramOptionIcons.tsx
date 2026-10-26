"use client";

import {
  Film,
  Eye,
  Clock,
  Image as ImageIcon,
  Video,
  Layers,
  User,
  Music,
  Sparkles,
} from "lucide-react";

export function getInstagramToolIcon(id: string, className = "h-4 w-4") {
  switch (id) {
    case "viewer":
      return <Eye className={className} />;
    case "reels":
      return <Film className={className} />;
    case "story":
      return <Clock className={className} />;
    case "photo":
      return <ImageIcon className={className} />;
    case "video":
      return <Video className={className} />;
    case "carousel":
      return <Layers className={className} />;
    case "profile":
      return <User className={className} />;
    case "audio":
      return <Music className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
