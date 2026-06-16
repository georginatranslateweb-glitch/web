import Link from 'next/link';
import { HOME_LOGO_HREF } from './headerEvents';

/**
 * Desktop: enlace a home-5. Móvil: botón (p. ej. abrir menú).
 */
const HeaderLogoLink = ({
  isNarrowViewport,
  className,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  onMobileClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onTouchStart,
  onTouchEnd,
  children,
}) => {
  if (!isNarrowViewport) {
    return (
      <Link
        href={HOME_LOGO_HREF}
        className={className}
        aria-label={ariaLabel}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      onClick={(e) => {
        e.stopPropagation();
        onMobileClick?.(e);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </button>
  );
};

export default HeaderLogoLink;
