import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  slug?: string;
  image?: string;
}

const SITE_NAME = 'Les Poids des Mots';
const DEFAULT_DESCRIPTION = 'A digital chronicle of integration into the semantic grid. From the "Low-Res" humidity of Manila to the "High-Def" sterile halls of Montréal, Donato documents the price of belonging. Ma fluence est mon prix. My words are being deleted. Un monde qui demande d’oublier.';
const BASE_URL = 'https://les-poids-des-mots.com'; // Replace with actual domain if known

export default function SEO({ 
  title, 
  description = DEFAULT_DESCRIPTION, 
  type = 'website', 
  slug = '', 
  image = '/favicon.svg' 
}: SEOProps) {
  useEffect(() => {
    // Update Document Title
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attr, value);
      } else {
        const head = document.head;
        const newMeta = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('[', '').replace(']', '').split('=');
        newMeta.setAttribute(attrName, attrVal.replace(/['"]/g, ''));
        newMeta.setAttribute(attr, value);
        head.appendChild(newMeta);
      }
    };

    // Update Meta Tags
    updateMetaTag('meta[name="description"]', 'content', description);
    
    // Open Graph
    updateMetaTag('meta[property="og:title"]', 'content', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:type"]', 'content', type);
    updateMetaTag('meta[property="og:url"]', 'content', `${BASE_URL}${slug ? `/${slug}` : ''}`);
    updateMetaTag('meta[property="og:site_name"]', 'content', SITE_NAME);
    updateMetaTag('meta[property="og:image"]', 'content', `${BASE_URL}${image}`);

    // Twitter
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    updateMetaTag('meta[name="twitter:image"]', 'content', `${BASE_URL}${image}`);

    // Cleanup (optional, but good for SPA)
    return () => {
      // We don't necessarily want to remove them, just let the next SEO component update them
    };
  }, [title, description, type, slug, image]);

  return null;
}
