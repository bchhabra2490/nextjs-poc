import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const PreviewCompatibleImage = ({ imageInfo }) => {
  const imageStyle = { borderRadius: '0px', height: '200px', background: '#fff' };
  const { alt = '', childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    );
  }

  if (childImageSharp) {
    return <img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />;
  }

  if (!!image && typeof image === 'string') { return <img style={imageStyle} src={image} alt={alt} />; }

  return <div style={imageStyle} />;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleImage;
