import React, { useEffect, useRef } from 'react';

/**
 * Hero con imagen de fondo en capa absoluta + parallax (Jarallax).
 * Jarallax se carga solo en cliente (compatible con SSR de Next.js).
 */
const MsHeroParallax = ({
    className = '',
    speed = 0.7,
    type = 'scroll',
    children,
}) => {
    const parallaxRef = useRef(null);

    useEffect(() => {
        const el = parallaxRef.current;
        if (!el) return undefined;

        let cancelled = false;

        (async () => {
            const { jarallax } = await import('jarallax');
            if (cancelled || !parallaxRef.current) return;

            jarallax(parallaxRef.current, {
                speed,
                type,
                imgElement: '.jarallax-img',
            });
        })();

        return () => {
            cancelled = true;
            if (el.jarallax) {
                el.jarallax.destroy();
            }
        };
    }, [speed, type]);

    const heroClass = ['ms-hero', className].filter(Boolean).join(' ');

    return (
        <section className={heroClass}>
            <div
                ref={parallaxRef}
                className="ms-parallax"
                data-speed={speed}
                data-type={type}
            >
                <div className="jarallax-img">{children}</div>
            </div>
        </section>
    );
};

export default MsHeroParallax;
