import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="de">
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="/static/images/logo/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/logo/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/logo/favicon-96x96.png"
            sizes="96x96"
          />

          <link
            rel="apple-touch-icon"
            href="/static/images/logo/icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/images/logo/icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/static/images/logo/icon-167x167.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/images/logo/icon-180x180.png"
          />

          <link rel="manifest" href="/static/manifest/manifest.json" />

          <link
            rel="preload"
            href="/static/fonts/Didonesque/Didonesque-Roman.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/static/fonts/Futura/Futura-Book.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/static/fonts/Quattrocento/Quattrocento-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />

          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta
            name="description"
            content="Handwerk zum wohnen - Professionell, Hochwertig, Zuverlässig - Seit 20 Jahren."
          />
          <meta name="theme-color" content="#8e3636" />
          <meta charSet="UTF-8" />
          <noscript>Die Seite benötigt JavaScript.</noscript>
          {flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
