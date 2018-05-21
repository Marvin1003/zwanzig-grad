import Document, { Head, Main, NextScript } from 'next/document';

// CRITICIAL CSS
const styles = `
  *, *::before, *::after {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    box-sizing: inherit;
    outline: none;
    margin: 0;
    padding: 0;
  }

  html {
    width: 100%;
    overflow: hidden;
    overflow-y: -ms-autohiding-scrollbar;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
    box-sizing: border-box;
  }

  ::selection {
    background-color: rgba(0,0,0,.99);
    color: white;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  body {
    background-color: white;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

    // DISPLAY TO SMALL 
  @media only screen and (max-width: 300px) {
    html::after {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      padding: 0 10px;
      font-family: "didonesque-roman", serif;
      text-align: center;
      content: 'To visit this Website you need a larger display.'
    }
    // CAUSES BUG !! -- REMINDER -- / BUTTON HOVER / AUTOSLIDER
    body {
      display: none;
    }
  }
  .button {
    border: 0;
    background-color: transparent;
    font-family: inherit;
    color: inherit;
    cursor: pointer;
  }
`;

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="de">
        <Head>
          <link rel="manifest" href="/static/manifest/manifest.json" />
          <link rel="preload" href="/static/fonts/Didonesque/Didonesque-Roman.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/static/fonts/Futura/Futura-Book.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
          <link rel="preload" href="/static/fonts/Quattrocento/Quattrocento-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />

          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="description" content="Handwerk zum wohnen - Professionell, Hochwertig, Zuverlässig - Seit 20 Jahren." />
          <meta name="theme-color" content="#6D2A2A" />
          <meta charSet="utf-8" />
          <noscript>Die Seite benötigt JavaScript.</noscript>
          <style>{styles}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
