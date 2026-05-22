import { Html, Head, Main, NextScript } from 'next/document'

/** Subir al cambiar favicons (evita caché agresiva del navegador). */
const FAVICON_VERSION = '20260522'

const faviconHref = (path) => `${path}?v=${FAVICON_VERSION}`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Georgina Robledo - Translation Services </title>
        <link rel="icon" href={faviconHref('/favicon.ico')} sizes="any" />
        <link rel="icon" href={faviconHref('/favicon-32x32.png')} type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href={faviconHref('/apple-touch-icon.png')} />
      </Head>
      <body data-theme="light" data-menu="fixed" data-footer-effect="on">
        <Main />
        <NextScript />
      </body>
    </Html>

  )
}
