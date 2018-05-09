import Document, { Head, Main, NextScript } from 'next/document';

const styles = `
  body {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    padding: 0;
    margin: 0;
  }
  html {
    width: 100%;
    overflow: hidden;
    background-color: #F3F4F7;
    overflow-y: -ms-autohiding-scrollbar;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
  }
`
export default class MyDocument extends Document {
  render() {
    return (
      <html lang="de">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="description" content="Handwerk zum wohnen - Professionell, Hochwertig, Zuverlässig - Seit 20 Jahren." />
          <meta name="theme-color" content="#C1C12B" />
          <link rel="manifest" href="/static/manifest/manifest.json" />
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
