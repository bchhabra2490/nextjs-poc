import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import moment from 'moment';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import Skeleton from '@material-ui/lab/Skeleton';
import size from 'lodash/size';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const calculateTime = (string) => {
  if (size(string) < 1) return '';
  const wordsPerMinute = 200;
  let result;
  const textLength = string.split(' ').length;
  if (textLength > 0) {
    const value = Math.ceil(textLength / wordsPerMinute);
    result = `${value} min read`;
  }
  return result;
};

const Tags = ({ tags }) => {
  const handleClick = (event) => {
    event.preventDefault();
  };
  const content = map(
    tags,
    (tag) => size(tag) > 0 && (
    <li key={`${tag}tag`}>
      <a onClick={handleClick} href={`/topics/${kebabCase(tag)}/`}>
        {tag}
      </a>
    </li>
    ),
  );
  return <ul className="card-tags">{content}</ul>;
};

Tags.propTypes = {
  tags: PropTypes.instanceOf(Array),
};

Tags.defaultProps = {
  tags: [],
};

const PostLoader = ({ number }) => Array.from({ length: number }).map((v, key) => (
  <div className="is-parent column is-4" key={key + 1}>
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
));

PostLoader.propTypes = {
  number: PropTypes.number,
};

PostLoader.defaultProps = {
  number: 9,
};

const Post = ({ post }) => {
  const content = JSON.parse(post.content);
  const publishedDate = content.postDate || Number(post.createdOn);
  return (
    <div className="is-parent column is-4" key={post.ID}>
      <article className="card">
        <div className="card-image">
          <figure className="image">
            <a
              href={`/research/${post.communityID}/${post.ID}?${kebabCase(content.title)}`}
              key={post.ID}
            >
              {content.image && (
                <PreviewCompatibleImage
                  imageInfo={{
                    image: content.image,
                    alt: content.title,
                  }}
                />
              )}
              {!content.image && (
                <div className="default-post-image-container">
                  <img src="/img/logo.png" alt="post-default" />
                </div>
              )}
            </a>
          </figure>
        </div>
        <div className="card-content">
          <a
            href={`/research/${post.communityID}/${post.ID}?${kebabCase(content.title)}`}
            key={post.ID}
          >
            <h5 className="title">{content.title}</h5>
          </a>
          <div className="content">
            <a
              href={`/research/${post.communityID}/${post.ID}?${kebabCase(content.title)}`}
              key={post.ID}
            >
              <p>{content.shortDesc}</p>
            </a>
          </div>
        </div>
        {/* <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <Tags tags={[content.sentiment]} />
        </div> */}
        <footer className="card-footer">
          <a
            href={`/research/${post.communityID}/${post.ID}?${kebabCase(content.title)}`}
            key={post.ID}
          >
            <p className="date">
              {moment(publishedDate).format('MMM DD, YYYY')}
            </p>
            <p className="timestamp">{calculateTime(content.description)}</p>
          </a>
        </footer>
      </article>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.instanceOf(Object),
};

Post.defaultProps = {
  post: {},
};

const Posts = ({
  loading, nextLoading, data, loadNextPage,
}) => {
  const handleLoadMore = () => {
    loadNextPage();
  };
  return (
    <div>
      <div className="columns is-multiline is-two-thirds-tablet">
        {size(data) > 0
          && !loading
          && map(data, ({ message: post }) => {
            if (!isEmpty(post)) {
              return <Post key={post.ID} post={post} />;
            }
          })}
        {(loading || nextLoading) && <PostLoader />}
      </div>
      {!nextLoading && size(data) >= 9 && (
        <div className="load-more-container">
          <button type="button" className="button" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

Posts.propTypes = {
  data: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  nextLoading: PropTypes.bool,
  loadNextPage: PropTypes.func,
};

Posts.defaultProps = {
  data: [],
  loading: false,
  nextLoading: false,
  loadNextPage: () => {},
};

export default Posts;
