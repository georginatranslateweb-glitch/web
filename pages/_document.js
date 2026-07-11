import { Html, Head, Main, NextScript } from 'next/document'

/** Subir al cambiar favicons (evita caché agresiva del navegador). */
const FAVICON_VERSION = '20260522'

const faviconHref = (path) => `${path}?v=${FAVICON_VERSION}`

const SITE_URL = 'https://www.georginatranslates.com'
const SITE_TITLE = 'Georgina Robledo - Translation Services'
const SITE_DESCRIPTION = 'Georgina Robledo - Professional translation services.'
const SHARE_IMAGE = `${SITE_URL}/images/logo/share-preview.png`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Georgina Robledo - Translation Services </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={faviconHref('/favicon.ico')} sizes="any" />
        <link rel="icon" href={faviconHref('/favicon-32x32.png')} type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href={faviconHref('/apple-touch-icon.png')} />

        <link rel="preload" href="/images/bg/banner-1-768.webp" as="image" type="image/webp" media="(max-width: 767px)" fetchPriority="high" />
        <link rel="preload" href="/images/bg/banner-1-1200.webp" as="image" type="image/webp" media="(min-width: 768px) and (max-width: 1399px)" fetchPriority="high" />
        <link rel="preload" href="/images/bg/banner-1.webp" as="image" type="image/webp" media="(min-width: 1400px)" fetchPriority="high" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={SHARE_IMAGE} />
        <meta property="og:image:secure_url" content={SHARE_IMAGE} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="838" />
        <meta property="og:image:alt" content={SITE_TITLE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SHARE_IMAGE} />
      </Head>
      <body data-theme="light" data-menu="fixed" data-footer-effect="on">
        <Main />
        <NextScript />
      </body>
    </Html>

  )
}
