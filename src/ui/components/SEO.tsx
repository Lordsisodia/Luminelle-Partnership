import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    jsonLd?: Record<string, any>;
}

export function SEO({ title, description, image, url, type = 'website', jsonLd }: SEOProps) {
    const siteTitle = 'Lumelle';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

    // Default to the main hero image if no specific image is provided
    const metaImage = image || 'https://lumelle.com/uploads/luminele/hero-main.png';
    const metaDescription = description || 'Luxury satin-lined, waterproof shower cap that keeps silk presses, curls, and braids frizz-free.';
    const metaUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Structured Data (JSON-LD) */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
}
