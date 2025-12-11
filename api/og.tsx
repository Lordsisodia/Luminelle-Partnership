import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export default function handler(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : 'Lumelle';

        // ?description=<description>
        const hasDescription = searchParams.has('description');
        const description = hasDescription
            ? searchParams.get('description')?.slice(0, 200)
            : 'Satin-lined, waterproof shower caps for frizz-free hair.';

        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundColor: '#FDF8F6', // brand-blush/20
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'sans-serif',
                        padding: '40px',
                        border: '20px solid #E6D5D0', // brand-blush
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        {/* Logo or Brand Name */}
                        <div
                            style={{
                                fontSize: 40,
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                color: '#4A3B32', // brand-cocoa
                                marginBottom: 20,
                            }}
                        >
                            Lumelle
                        </div>

                        {/* Title */}
                        <div
                            style={{
                                fontSize: 60,
                                fontWeight: 'bold',
                                color: '#4A3B32', // brand-cocoa
                                marginBottom: 20,
                                lineHeight: 1.2,
                            }}
                        >
                            {title}
                        </div>

                        {/* Description */}
                        <div
                            style={{
                                fontSize: 30,
                                color: '#4A3B32', // brand-cocoa
                                opacity: 0.8,
                                maxWidth: '800px',
                            }}
                        >
                            {description}
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
