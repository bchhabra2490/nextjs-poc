import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createApolloFetch } from 'apollo-fetch';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Categories from '../../components/categories';

const uri = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;

const apolloFetch = createApolloFetch({ uri });

const query = `
  query getBlogPosts {
    getBlogPosts {
      ID
      messageType
      content
      communityID
      createdOn
      community {
        title
      }
      __typename
    }
  }
`;

export const ResearchPageTemplate = ({ data, loading }) => (
  <section className="wrapper-container">
    <Categories data={data} loading={loading} />
  </section>
);


const ResearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apolloFetch.use(({ request, options }, next) => {
      if (!options.headers) {
        options.headers = {};
      }
      options.headers = {
        'api-version': 2,
      };
      next();
    });
    apolloFetch({
      query,
    })
      .then((response) => {
        setLoading(false);
        const categories = [];
        map(response.data.getBlogPosts, (item) => {
          const getCurrentIndex = findIndex(
            categories,
            (value) => value.name === item.community.title,
          );
          if (getCurrentIndex === -1) {
            categories.push({
              name: item.community.title,
              communityID: item.communityID,
              data: [{ message: item }],
            });
          } else if (getCurrentIndex !== -1) {
            categories[getCurrentIndex] = {
              ...categories[getCurrentIndex],
              data: [...categories[getCurrentIndex].data, { message: item }],
            };
          }
        });
        setData(categories);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  console.log(loading);
  return (
  <Layout>
    <SEO title="Home" />
    <ResearchPageTemplate loading={loading} data={data} />
  </Layout>
  );
};

ResearchPage.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default ResearchPage;
