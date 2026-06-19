import React from 'react';

const DOTS_MAX = 5;

const ImagePreviewCarouselDots = ({ index, total, className = '' }) => {
    if (total < 2) return null;

    const useCounter = total > DOTS_MAX;

    return (
        <div
            className={`image-preview-carousel-dots${
                useCounter ? ' image-preview-carousel-dots--counter' : ''
            } ${className}`.trim()}
            aria-hidden="true"
        >
            {useCounter ? (
                <span className="image-preview-carousel-dots__counter">
                    {index + 1} / {total}
                </span>
            ) : (
                Array.from({ length: total }, (_, i) => (
                    <span
                        key={i}
                        className={
                            i === index
                                ? 'image-preview-carousel-dots__dot is-active'
                                : 'image-preview-carousel-dots__dot'
                        }
                    />
                ))
            )}
        </div>
    );
};

export default ImagePreviewCarouselDots;
