import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

function SEO({
  description, lang, meta, image, title, type,
}) {
  const siteMetadata = {
    title: 'Teji Mandi - Stock Investing, Simplified',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    description:
      'Teji Mandi is an app that helps you build a strong portfolio of high-quality stocks. We are a SEBI Registered Investment Advisor and a Motilal Oswal Subsidiary.',
    author: 'TM Investment Technologies Pvt Ltd.',
  };
  
  const [metaData, setMetaData] = useState([]);

  useEffect(() => {
    const metaDescription = description || siteMetadata.description;
    const metaArray = [
      {
        property: 'description',
        content: metaDescription,
      },
      {
        property: 'title',
        content: title,
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: metaDescription,
      },
      {
        property: 'og:type',
        content: type,
      },
      {
        property: 'og:url',
        content: siteMetadata.siteUrl,
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'twitter:image',
        content: `${image}`,
      },
      {
        property: 'og:image',
        content: `${image}`,
      },
      {
        property: 'image',
        content: `${image}`,
      },
    ].concat(meta);

    setMetaData(metaArray);
  }, [title]);

  if (typeof window !== 'undefined' && title !== undefined) {
    document.title = title;
    metaData.forEach((ele) => {
      console.log(ele.property, ele.content);
      if (ele.property !== undefined && ele.content !== undefined) {
        const tag = document.querySelector(`[name='${ele.property}']`);
        if (tag != null) {
          tag.remove();
        }
        const link = document.createElement('meta');
        link.setAttribute('name', ele.property);
        link.content = ele.content;
        document.getElementsByTagName('head')[0].prepend(link);
      }
    });
  }
  if (title !== undefined) {
    const metaDescription = description || siteMetadata.description;
    return (
      <Helmet
        htmlAttributes={{
          lang,
        }}
        defer
        titleTemplate={`%s | ${siteMetadata.title}`}
      >
        <meta data-react-helmet="true" name="description" content={metaDescription} />
        <meta
          data-react-helmet="true"
          name="og:title"
          content="Teji Mandi - Stock Investing, Simplified"
        />
        <meta data-react-helmet="true" name="og:description" content={metaDescription} />
        <meta data-react-helmet="true" name="og:type" content={type} />
        <meta data-react-helmet="true" name="og:url" content={siteMetadata.siteUrl} />
        <meta data-react-helmet="true" name="twitter:card" content="summary_large_image" />
        <meta data-react-helmet="true" name="twitter:image" content={image} />
        <meta data-react-helmet="true" name="og:image" content={image} />
        <meta data-react-helmet="true" name="image" content={image} />
        <meta charSet="utf-8" />

        {/* <title>Teji Mandi - Stock Investing, Simplified</title>
      <meta name="title" content="Teji Mandi - Stock Investing, Simplified" />
    <meta name="description" content="Teji Mandi is an app that helps you build a strong portfolio of high-quality stocks. We are a SEBI Registered Investment Advisor and a Motilal Oswal Subsidiary. " /> */}
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Teji Mandi - Stock Investing, Simplified" />
        <meta property="og:description" content="Teji Mandi is an app that helps you build a strong portfolio of high-quality stocks. We are a SEBI Registered Investment Advisor and a Subsidiary of Motilal. " />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/tejimandiprod.appspot.com/o/images%2F91e47475-c306-03bc-2a2f-6253d51a76a1.png?alt=media&token=d2a3d701-60ba-4517-9359-dd5ca5be9a24" />
        {/* <!-- Twitter --/> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Teji Mandi - Stock Investing, Simplified" />
        <meta property="twitter:description" content="Teji Mandi is an app that helps you build a strong portfolio of high-quality stocks. We are a SEBI Registered Investment Advisor and a Motilal Oswal Subsidiary. " />

        <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/tejimandiprod.appspot.com/o/images%2F91e47475-c306-03bc-2a2f-6253d51a76a1.png?alt=media&token=d2a3d701-60ba-4517-9359-dd5ca5be9a24" />

      </Helmet>
    );
  }
  return <div />;
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
