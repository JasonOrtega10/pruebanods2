import Head from "next/head";

const Meta = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  const metaTitle = `${title} - Nodeny.me`;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="og:title" content={metaTitle} />
      <meta
        name="og:description"
        content={
          description ?? "Comparte tus archivos con tus clientes."
        }
      />
      <meta property="og:image" content="/img/opengraph-default.png" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default Meta;
