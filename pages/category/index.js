import React, { useState, useEffect } from 'react';
import { createApolloFetch } from 'apollo-fetch';
import split from 'lodash/split';
import size from 'lodash/size';
import Skeleton from '@material-ui/lab/Skeleton';
import Layout from '../../components/layout';
import Posts from '../../components/Posts';
import SEO from '../../components/seo';

const uri = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;

const apolloFetch = createApolloFetch({ uri });

const query = `
  query getFeedV2 ($searchText: String, $messageID: ID, $communityID: ID, $offset: Int, $limit: Int) {
    getFeedV2 (searchText: $searchText, messageID:  $messageID, communityID: $communityID, offset: $offset, limit: $limit) {
      message {
        ID
        communityID
        community {
          title
        }
        messageType
        createdOn
        creator {
          ID
          fullname
          profilePic
        }
        status
        content
        __typename
      }
    }
  }
`;

const Category = ({ location }) => {
  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [communityID, setCommunityID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nextLoading, setNextLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    let pathCommunityID = communityID;
    if (location.search) {
      const locationPath = split(location.search, '-');
      setCommunityID(locationPath[size(locationPath) - 1]);
      pathCommunityID = locationPath.pop();
      setCategoryName(locationPath.join(' ').substring(1));
    }
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
      variables: {
        communityID: pathCommunityID,
        limit: 9,
      },
    })
      .then((response) => {
        setLoading(false);
        setData(response.data.getFeedV2);
        if (size(response.data.getFeedV2) > 0) {
          setCategoryName(response.data.getFeedV2[0].message.community.title);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  const loadNextPage = () => {
    setNextLoading(true);
    apolloFetch({
      query,
      variables: {
        offset: size(data),
        communityID,
        limit: 9,
      },
    })
      .then((response) => {
        setData((prevState) => prevState.concat(response.data.getFeedV2));
        setNextLoading(false);
      })
      .catch(() => {
        setNextLoading(false);
      });
  };
  return (
    <Layout location={location} showLinks={false}>
      <SEO title="Home" />
      <section className="section categories">
        <div className="container content">
          <div className="category">
            {loading && (
              <Skeleton
                animation="wave"
                height={15}
                width="30%"
                variant="rect"
                style={{ marginBottom: 6 }}
              />
            )}
            {!loading && <h1 className="title">{categoryName}</h1>}
          </div>
          <Posts
            loading={loading}
            nextLoading={nextLoading}
            data={data}
            loadNextPage={loadNextPage}
          />
        </div>
      </section>
    </Layout>
  );
};

Category.propTypes = {};

export default Category;
