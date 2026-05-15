import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const NAV_LINKS = [
  { href: '/home-5', labelKey: 'mainNavHome' },
  { href: '/services', labelKey: 'mainNavServices' },
  { href: '/about', labelKey: 'mainNavAbout' },
  { href: '/contact', labelKey: 'mainNavContact' },
];

const MenuItems = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation('navigation');

  return (
    <>
      {NAV_LINKS.map(({ href, labelKey }) => {
        const active = pathname === href;
        const label = t(labelKey);
        return (
          <li key={href} className={active ? 'menu-item active' : 'menu-item'}>
            <Link href={href} title={label}>
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default MenuItems;
