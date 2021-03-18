import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
function SEO({
  description, lang, meta, image, title, type,
}) {
  const siteMetadata = {
    title: 'Teji Mandi - Stock Investing, Simplified',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    description:
      'Teji Mandi is an app that helps you build a strong portfolio of high-quality stocks. We are a SEBI Registered Investment Advisor and a Motilal Oswal Subsidiary.',
    author: 'TM Investment Technologies Pvt Ltd.',
    image: "https://firebasestorage.googleapis.com/v0/b/tejimandiprod.appspot.com/o/images%2F91e47475-c306-03bc-2a2f-6253d51a76a1.png?alt=media&token=d2a3d701-60ba-4517-9359-dd5ca5be9a24",
  };

  const siteTitle = title || siteMetadata.title;
  const siteImage = image || siteMetadata.image;
  
    const metaDescription = description || siteMetadata.description;
    return (
      <Head
      >
        <title>{siteTitle}</title>
        <meta data-react-helmet="true" name="description" content={metaDescription} />
        <meta
          data-react-helmet="true"
          name="og:title"
          content={siteTitle}
        />
        <meta data-react-helmet="true" name="og:description" content={metaDescription} />
        <meta data-react-helmet="true" name="og:type" content={type} />
        <meta data-react-helmet="true" name="og:url" content={siteMetadata.siteUrl} />
        <meta data-react-helmet="true" name="twitter:card" content="summary_large_image" />
        <meta data-react-helmet="true" name="twitter:image" content={siteImage} />
        <meta data-react-helmet="true" name="og:image" content={siteImage} />
        <meta data-react-helmet="true" name="image" content={siteImage} />
        <meta charSet="utf-8" />

        {/* <title>Teji Mandi - Stock Investing, Simplified</title>
      <meta name="title" content="Teji Mandi - Stock Investing, Simplified" />
    <meta name="description" content="Teji Mandi is an app that helps you build a strong portfolio of high-quality stocks. We are a SEBI Registered Investment Advisor and a Motilal Oswal Subsidiary. " /> */}
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={siteImage} />
        {/* <!-- Twitter --/> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={metaDescription} />

        <meta property="twitter:image" content={siteImage} />

      </Head>
    );
  }

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  type: 'website',
  image: '',
  description: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
