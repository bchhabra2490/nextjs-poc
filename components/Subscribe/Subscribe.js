import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import SubscribeForm from './SubscribeForm';

const Subscribe = ({ showVisible }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "playstore_round.png" }) {
        childImageSharp {
          fluid(maxWidth: 160) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);
  // const handleVisible = (isVisible) => {
  //   if (isVisible) {
  //     document.getElementById('share-post').classList.add('animated');
  //   } else {
  //     document.getElementById('share-post').classList.remove('animated');
  //   }
  // };
  return (
    <div className="subscribe-section" id="subscribe">
      {/* {showVisible && (
        <VisibilitySensor
          scrollCheck
          minTopValue={200}
          partialVisibility
          onChange={handleVisible}
        >
          <div className="sensor" />
        </VisibilitySensor>
      )} */}
      <div className="container">
        {/* <h3 className="title is-3">Join 5000+ investors on TejiMandi</h3> */}
        {/* <div className="socialContainer">
          <a
            href="https://twitter.com/TejiMandi_App"
            target="_to"
            rel="noopener"
          >
            <TwitterIcon classname="iconSize" />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=919324459287&text=Save%20our%20number%20+919324459287%20to%20your%20contacts%20and%20send%20this%20message%20to%20start"
            target="_to"
            rel="noopener"
          >
            <Whatsapp classname="iconSize" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.tejimandi&hl=en_IN"
            target="_to"
            rel="noopener"
          >
            <img
              src={data.placeholderImage.childImageSharp.fluid.src}
              alt="Teji Mandi"
            />
          </a>
        </div> */}
        <SubscribeForm />
      </div>
    </div>
  );
};

Subscribe.propTypes = {
  showVisible: PropTypes.bool,
};
Subscribe.defaultProps = {
  showVisible: false,
};
export default Subscribe;
