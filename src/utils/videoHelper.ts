export interface ParsedVideo {
  type: 'youtube' | 'vimeo' | 'drive' | 'direct_url' | 'file';
  embedUrl: string;
}

export function parseVideoUrl(url: string): ParsedVideo {
  const trimmed = url.trim();

  // Blob URLs from local file uploads
  if (trimmed.startsWith('blob:')) {
    return { type: 'file', embedUrl: trimmed };
  }

  // YouTube
  // Matches youtube.com/watch?v=XYZ, youtu.be/XYZ, youtube.com/shorts/XYZ, youtube.com/embed/XYZ
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const ytMatch = trimmed.match(youtubeRegex);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Vimeo
  // Matches vimeo.com/123456789
  const vimeoRegex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
  const vimeoMatch = trimmed.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`,
    };
  }

  // Google Drive
  // Matches drive.google.com/file/d/FILE_ID/view
  const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const driveMatch = trimmed.match(driveRegex);
  if (driveMatch && driveMatch[1]) {
    return {
      type: 'drive',
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
    };
  }

  // Default direct video URL (e.g. mp4, webm, or external video feed)
  return {
    type: 'direct_url',
    embedUrl: trimmed,
  };
}
