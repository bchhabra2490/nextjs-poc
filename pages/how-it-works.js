import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Subscribe from '../components/Subscribe/Subscribe';

const HowItWorks = () => {
  const {
    placeholder2Image,
    placeholder3Image,
    placeholder4Image,
    placeholder5Image,
  } = useStaticQuery(graphql`
    query {
      placeholder2Image: file(relativePath: { eq: "mobile_5.png" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      placeholder3Image: file(relativePath: { eq: "mobile_2.png" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      placeholder4Image: file(relativePath: { eq: "mobile_1.png" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      placeholder5Image: file(relativePath: { eq: "mobile_6.png" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <SEO title="Tejimandi : HowItWorks" />
      <section className="how-it-works">
        <div className="container">
          <div className="section-title">
            <h2 className="title">How It Works</h2>
          </div>
          <div className="section-content">
            <div className="left-container right-text">
              <div className="text-title pad-r">
                <h2>Provide your</h2>
                <h2>experience level</h2>
              </div>
              <div className="border border-end">
                <div className="border-left" />
                <div className="border-middle" />
                <div className="border-arrow" />
              </div>
            </div>
            <div className="right-container section-image">
              <picture>
                <source
                  type="image/webp"
                  sizes={placeholder2Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder2Image.childImageSharp.fluid.srcSetWebp}
                />
                <source
                  type="image/png"
                  sizes={placeholder2Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder2Image.childImageSharp.fluid.srcSet}
                />
                <img
                  src={placeholder2Image.childImageSharp.fluid.src}
                  sizes={placeholder2Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder2Image.childImageSharp.fluid.srcSet}
                  alt="provide your"
                />
              </picture>
            </div>
          </div>
          <div className="section-content section-second">
            <div className="left-container section-image">
              <picture>
                <source
                  type="image/webp"
                  sizes={placeholder3Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder3Image.childImageSharp.fluid.srcSetWebp}
                />
                <source
                  type="image/png"
                  sizes={placeholder3Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder3Image.childImageSharp.fluid.srcSet}
                />
                <img
                  src={placeholder3Image.childImageSharp.fluid.src}
                  sizes={placeholder3Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder3Image.childImageSharp.fluid.srcSet}
                  alt="join groups"
                />
              </picture>
            </div>
            <div className="right-container left-text">
              <div className="text-title pad-l">
                <h2>Select Stock Market</h2>
                <h2>Topics to follow</h2>
              </div>
              <div className="border border-start">
                <div className="border-middle" />
                <div className="border-left" />
                <div className="border-arrow" />
              </div>
            </div>
          </div>
          <div className="section-content section-third">
            <div className="left-container right-text">
              <div className="text-title pad-r">
                <h2>Get Crisp</h2>
                <h2>Actionable Insights</h2>
              </div>
              <div className="border border-end">
                <div className="border-left" />
                <div className="border-middle" />
                <div className="border-arrow" />
              </div>
            </div>
            <div className="right-container section-image">
              <picture>
                <source
                  type="image/webp"
                  sizes={placeholder4Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder4Image.childImageSharp.fluid.srcSetWebp}
                />
                <source
                  type="image/png"
                  sizes={placeholder4Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder4Image.childImageSharp.fluid.srcSet}
                />
                <img
                  src={placeholder4Image.childImageSharp.fluid.src}
                  sizes={placeholder4Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder4Image.childImageSharp.fluid.srcSet}
                  alt="topics to follow"
                />
              </picture>
            </div>
          </div>
          <div className="section-content section-fourth">
            <div className="left-container section-image">
              <picture>
                <source
                  type="image/webp"
                  sizes={placeholder5Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder5Image.childImageSharp.fluid.srcSetWebp}
                />
                <source
                  type="image/png"
                  sizes={placeholder5Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder5Image.childImageSharp.fluid.srcSet}
                />
                <img
                  src={placeholder5Image.childImageSharp.fluid.src}
                  sizes={placeholder5Image.childImageSharp.fluid.sizes}
                  srcSet={placeholder5Image.childImageSharp.fluid.srcSet}
                  alt="Connect with investors"
                />
              </picture>
            </div>
            <div className="right-container left-text">
              <div className="text-title pad-l">
                <h2>Connect with investors</h2>
                <h2>over group chat</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Subscribe />
      <br />
      <br />
    </Layout>
  );
};

export default HowItWorks;
