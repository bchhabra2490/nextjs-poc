import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/layout';
import SectionSubscribe from '../../components/Subscribe/Subscribe';

const TagsPage = () => {
  const siteMetadata = {
    title: 'Teji Mandi - Stock Investing, Simplified',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    description:
      'Teji Mandi is an app that helps you build a strong portfolio of high-quality stocks. We are a SEBI Registered Investment Advisor and a Motilal Oswal Subsidiary.',
    author: 'TM Investment Technologies Pvt Ltd.',
  },
  return (
    <Layout>
      <section className="section">
        <Helmet defer={false} title={`Topics | ${siteMetadata.title}`} />
        <div className="container content">
          <div className="columns">
            <div
              className="column is-10 is-offset-1"
              style={{ marginBottom: '6rem' }}
            >
              <h1 className="title is-size-2 is-bold-light">Topics</h1>
            </div>
          </div>
        </div>
      </section>
      <SectionSubscribe />
    </Layout>
  );
};

export default TagsPage;

// export const tagPageQuery = graphql`
//   query TagsQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allMarkdownRemark(limit: 1000) {
//       group(field: frontmatter___tags) {
//         fieldValue
//         totalCount
//       }
//     }
//   }
// `;
