import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import Skeleton from '@material-ui/lab/Skeleton';
import Posts from './Posts';

const CategoriesLoader = ({ number }) => Array.from({ length: number }).map((v, key) => (
  <div key={key + 1}>
    <div className="category">
      <Skeleton
        animation="wave"
        height={15}
        width="30%"
        variant="rect"
        style={{ marginBottom: 6 }}
      />
      <Skeleton
        animation="wave"
        height={20}
        width="10%"
        variant="rect"
        style={{ marginBottom: 6 }}
      />
    </div>
    <div className="columns is-multiline is-two-thirds-tablet">
      {Array.from({ length: 3 }).map((item, keyItem) => (
        <div className="is-parent column is-4" key={keyItem + 1}>
          <article className="card">
            <div className="card-image">
              <figure className="image">
                <Skeleton variant="rect" width="100%" height={200} />
              </figure>
            </div>
            <div className="card-content">
              <Skeleton
                animation="wave"
                height={10}
                width="100%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="60%"
                style={{ marginBottom: 6 }}
              />
              <div className="content">
                <Skeleton
                  animation="wave"
                  height={10}
                  width="100%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  width="100%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  width="100%"
                  style={{ marginBottom: 6 }}
                />
              </div>
            </div>
            <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
              <ul className="card-tags">
                <li>
                  <Skeleton
                    variant="rect"
                    width={55}
                    height={33}
                    style={{ borderRadius: 10 }}
                  />
                </li>
                <li>
                  <Skeleton
                    variant="rect"
                    width={55}
                    height={33}
                    style={{ borderRadius: 10 }}
                  />
                </li>
                <li>
                  <Skeleton
                    variant="rect"
                    width={55}
                    height={33}
                    style={{ borderRadius: 10 }}
                  />
                </li>
                <li>
                  <Skeleton
                    variant="rect"
                    width={55}
                    height={33}
                    style={{ borderRadius: 10 }}
                  />
                </li>
                <li>
                  <Skeleton
                    variant="rect"
                    width={55}
                    height={33}
                    style={{ borderRadius: 10 }}
                  />
                </li>
              </ul>
            </div>
            <footer className="card-footer">
              <Skeleton variant="text" width="25%" />
              <Skeleton variant="text" width="25%" />
            </footer>
          </article>
        </div>
      ))}
    </div>
  </div>
));

const Categories = ({ loading, data }) => (
  <div className="category-posts">
    <div className="container">
      {/* <Posts
        data={data["TM Feature"]}
        loading={loading}
        nextLoading={nextLoading}
        loadNextPage={loadNextPage}
      /> */}
      {loading && <CategoriesLoader number={5} />}
      {!loading
        && map(data, (category) => {
          if (!isEmpty(category)) {
            return (
              <React.Fragment key={category.name}>
                <div className="category">
                  <h1 className="title">{category.name}</h1>
                  <a
                    href={`/category?${kebabCase(category.name)}-${
                      category.communityID
                    }`}
                  >
                    See all
                  </a>
                </div>
                <Posts data={category.data} hideShowMore />
              </React.Fragment>
            );
          }
        })}
    </div>
  </div>
);

Categories.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.instanceOf(Object),
};

Categories.defaultProps = {
  data: {},
  loading: false,
};

export default Categories;
