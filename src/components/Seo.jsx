import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, BUSINESS_NAME } from '../data/businessConfig.js';

// Shared per-route metadata: title tag, meta description, canonical URL,
// Open Graph and Twitter/X card tags, plus optional JSON-LD structured
// data. Every page that should be indexed renders this once.
export default function Seo({ title, description, path, image, type = 'website', jsonLd }) {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/assets/logo/madhava-logo.png`;
  const fullTitle = title.includes(BUSINESS_NAME) ? title : `${title} | ${BUSINESS_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={BUSINESS_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd &&
        (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((entry, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(entry)}
          </script>
        ))}
    </Helmet>
  );
}
