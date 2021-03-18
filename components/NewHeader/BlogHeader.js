import className from 'classnames';
import React, { useRef } from 'react';
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';
import _throttle from 'lodash/throttle';
import WhatsappIcon from '../../assets/svgs/NewWhatapp';
import TwitterIcon from '../../assets/svgs/Twitter';

const getPosition = () => ({
  x: window && window.pageXOffset,
  y: window && window.pageYOffset,
});

const defaultOptions = {
  throttle: 200,
};

function useWindowScrollPosition(options) {
  const opts = { ...defaultOptions, ...options };
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  });
  React.useEffect(() => {
    const handleScroll = _throttle(() => {
      setPosition(getPosition());
    }, opts.throttle);
    window.addEventListener('scroll', handleScroll, false);
    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return position;
}

const BlogHeader = ({ title }) => {
  let location = {
    href: ''
  };
  if (typeof window != 'undefined') {
    location = window.location;
   }  
  const position = useWindowScrollPosition();
  console.log(title);
  const linkRef = useRef(null);

  const handleClick = (event, pathName, shareName) => {
    event.preventDefault();
    window.open(pathName, shareName, 'width=550,height=235');
    return false;
  };

  return (
    <div
      className={className('floating-header', {
        'floating-active': position.y >= 150,
      })}
    >
      <div className="floating-header-logo">
        <a href="/">
          <img
            src="/img/logo.png"
            alt="Teji Mandi"
          />
        </a>
      </div>
      {/* <span className="floating-header-divider">-</span> */}
      <div className="floating-header-title">{title}</div>
      <div className="floating-header-share">
        <div className="floating-header-share-label">Share this</div>
        <a
          ref={linkRef}
          onClick={(event) => handleClick(
            event,
            `https://api.whatsapp.com/send?text=${title}&url=${location.href}`,
            'share-whatsapp',
          )}
          href={`https://api.whatsapp.com/send?text=${title}&url=${location.href}`}
        >
          <WhatsappIcon />
        </a>
        <a
          ref={linkRef}
          href={`https://twitter.com/share?text=${title}&url=${location.href}`}
          onClick={(event) => handleClick(
            event,
            `https://twitter.com/share?text=${title}&url=${location.href}`,
            'share-twitter',
          )}
        >
          <TwitterIcon />
        </a>
      </div>
    </div>
  );
};

BlogHeader.propTypes = {
  title: PropTypes.string,
};

BlogHeader.defaultProps = {
  title: '',
};

export default BlogHeader;
