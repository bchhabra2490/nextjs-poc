import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        router.push('/')
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const data = useStaticQuery(graphql`
    query {
      logoImage: file(relativePath: { eq: "not_found.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <SEO title="404: Not found" />
      <div className="not-found-container">
        <img
          src={data.logoImage.childImageSharp.fluid.src}
          alt="Not Found"
        />
        <h1 className="title">No such page found</h1>
      </div>

    </Layout>
  );
};

export default NotFoundPage;
