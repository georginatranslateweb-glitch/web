import { useCallback, useState } from 'react';

/**
 * Carrusel simple: cada clic avanza a la siguiente imagen (circular).
 * Pensado para previsualizar variantes de banner durante el diseño.
 */
export function useClickImageCarousel(images, startIndex = 0) {
    const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
    const [index, setIndex] = useState(() => {
        if (!safeImages.length) return 0;
        return Math.min(Math.max(startIndex, 0), safeImages.length - 1);
    });

    const advance = useCallback(() => {
        if (safeImages.length < 2) return;
        setIndex((current) => (current + 1) % safeImages.length);
    }, [safeImages.length]);

    const currentSrc = safeImages[index] ?? safeImages[0] ?? '';

    return {
        index,
        total: safeImages.length,
        src: currentSrc,
        advance,
        canAdvance: safeImages.length > 1,
    };
}
