// Static fallback so production (Vercel) always shows real content instead of
// depending on the local-only CMS admin server at localhost:4000.
// Once a hero video is uploaded to Vercel Blob, set VITE_HERO_VIDEO_URL in the
// Vercel project's env vars to the returned blob URL — no code change needed.
export interface CmsContent {
  hero: { mediaType: string; mediaFile: string; headline: string; subheadline: string; buttonText: string; buttonLink: string };
  stats: { value: string; label: string }[];
  contact: { phone: string; email: string; address: string };
}

const heroVideoUrl = import.meta.env.VITE_HERO_VIDEO_URL as string | undefined;

export const defaultCmsContent: CmsContent = {
  hero: {
    mediaType: heroVideoUrl ? 'video' : 'image',
    mediaFile: heroVideoUrl || '',
    headline: 'Surfacing',
    subheadline: "Ireland's premier tarmacadam, asphalt & civil engineering specialists.",
    buttonText: 'Get A Price',
    buttonLink: '#contact',
  },
  stats: [
    { value: '69', label: 'Years of Legacy' },
    { value: '100%', label: 'In-House Crew' },
    { value: '500+', label: 'Projects Completed' },
    { value: '26', label: 'Counties Covered' },
  ],
  contact: {
    phone: '(01) 652 3544',
    email: 'quotes@enuzum.ie',
    address: 'Dublin Depot, Co. Dublin, Ireland',
  },
};

/** Dev-fetched media paths are relative (e.g. /uploads/x.mp4); env/blob URLs are already absolute. */
export function resolveMediaUrl(path: string): string {
  if (!path) return '';
  return path.startsWith('http') ? path : `http://localhost:4000${path}`;
}
