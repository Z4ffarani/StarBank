import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="bg-primary">
      <Head>
        <link rel="icon" href="/logos/logo-star.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}