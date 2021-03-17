import className from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Link from 'next/link';
import kebabCase from 'lodash/kebabCase';
import Img from 'gatsby-image';
import { autoPlay } from 'react-swipeable-views-utils';
import ArrowLeft from '../assets/svgs/ArrowLeft';
import ArrowRight from '../assets/svgs/ArrowRight';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Tags = ({ tags, readingTime }) => {
  const content = tags.map(
    (tag) => tag.length > 0 && (
    <li key={`${tag}tag`}>
      <Link to={`/topics/${kebabCase(tag)}`}>{tag}</Link>
    </li>
    ),
  );
  return (
    <ul className="post-tags">
      {content}
      <li className="post-reading-time">{readingTime}</li>
    </ul>
  );
};

Tags.propTypes = {
  tags: PropTypes.instanceOf(Array),
  readingTime: PropTypes.string,
};

Tags.defaultProps = {
  tags: [],
  readingTime: '',
};
const Post = ({ post }) => {
  const image = (post.frontmatter.featuredimage
      && post.frontmatter.featuredimage.childImageSharp.fluid)
    || {};
  const sources = [
    {
      ...image,
      media: '(min-width: 768px)',
    },
  ];

  return (
    <article
      className={className('post-container', {
        'post-image-container': !post.frontmatter.featuredimage,
      })}
    >
      {post.frontmatter.featuredimage && (
        <figure>
          <Link to={post.fields.slug} title={post.frontmatter.title}>
            <Img
              fadeIn={false}
              className="slider-image-container"
              imgStyle={{ objectFit: 'contain' }}
              fluid={sources}
            />
          </Link>
        </figure>
      )}
      <footer className="text-container">
        <Link to={post.fields.slug} title={post.frontmatter.title}>
          <time className="post-date" dateTime={post.frontmatter.date}>
            {post.frontmatter.date}
          </time>
          <h1 className="title">{post.frontmatter.title}</h1>
          <p
            dangerouslySetInnerHTML={{ __html: post.frontmatter.description }}
          />
        </Link>
        <div className="post-info">
          {post.frontmatter.tags.length > 0 && (
            <Tags
              tags={post.frontmatter.tags}
              readingTime={post.fields.readingTime.text}
            />
          )}
        </div>
      </footer>
    </article>
  );
};
Post.propTypes = {
  post: PropTypes.instanceOf(Object),
};

Post.defaultProps = {
  post: {},
};
const Dots = ({ maxSteps, activeStep, onClick }) => (
  <div className="dots-container">
    {Array.from({ length: maxSteps }).map((value, index) => (
      <div
        role="presentation"
        key={index}
        onClick={() => onClick(index)}
        className={className('dot', { active: activeStep === index })}
      />
    ))}
  </div>
);

Dots.propTypes = {
  maxSteps: PropTypes.number,
  activeStep: PropTypes.number,
  onClick: PropTypes.func,
};

Dots.defaultProps = {
  maxSteps: 0,
  activeStep: 0,
  onClick: () => {},
};

const Slider = ({ posts }) => {
  const maxSteps = posts.length;
  const [activeStep, setActiveStep] = React.useState(0);
  const handleChange = (step) => {
    setActiveStep(step);
  };
  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  const handleNext = () => {
    if (activeStep < maxSteps - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="post-item-slider">
      <div className="container">
        <div className="slider-items">
          <button
            type="button"
            className="button arrow prev-arrow"
            onClick={handlePrev}
          >
            <ArrowLeft />
          </button>
          <AutoPlaySwipeableViews
            index={activeStep}
            onChangeIndex={handleChange}
            enableMouseEvents
            interval={7000}
          >
            {posts.map(({ node: post }) => (
              <Post post={post} key={post.id} />
            ))}
          </AutoPlaySwipeableViews>
          <button
            type="button"
            className="button arrow next-arrow"
            onClick={handleNext}
          >
            <ArrowRight />
          </button>
        </div>
        <Dots
          maxSteps={maxSteps}
          activeStep={activeStep}
          onClick={handleChange}
        />
      </div>
    </div>
  );
};

Slider.propTypes = {
  posts: PropTypes.instanceOf(Array).isRequired,
};

export default Slider;
