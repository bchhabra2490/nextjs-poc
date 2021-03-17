import React from 'react';
import {
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

const TwitterIcon = () => (
  <svg className="svg-root iconSize" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg className="svg-root iconSize" focusable="false" viewBox="0 0 512 512" aria-hidden="true" role="presentation">
    <path
      style={{ fill: '#EDEDED' }}
      d="M0,512l35.31-128C12.359,344.276,0,300.138,0,254.234C0,114.759,114.759,0,255.117,0
      S512,114.759,512,254.234S395.476,512,255.117,512c-44.138,0-86.51-14.124-124.469-35.31L0,512z"
    />
    <path
      style={{ fill: '#55CD6C' }}
      d="M137.71,430.786l7.945,4.414c32.662,20.303,70.621,32.662,110.345,32.662
      c115.641,0,211.862-96.221,211.862-213.628S371.641,44.138,255.117,44.138S44.138,137.71,44.138,254.234
      c0,40.607,11.476,80.331,32.662,113.876l5.297,7.945l-20.303,74.152L137.71,430.786z"
    />
    <path
      style={{ fill: '#fff' }}
      d="M187.145,135.945l-16.772-0.883c-5.297,0-10.593,1.766-14.124,5.297
      c-7.945,7.062-21.186,20.303-24.717,37.959c-6.179,26.483,3.531,58.262,26.483,90.041s67.09,82.979,144.772,105.048
      c24.717,7.062,44.138,2.648,60.028-7.062c12.359-7.945,20.303-20.303,22.952-33.545l2.648-12.359
      c0.883-3.531-0.883-7.945-4.414-9.71l-55.614-25.6c-3.531-1.766-7.945-0.883-10.593,2.648l-22.069,28.248
      c-1.766,1.766-4.414,2.648-7.062,1.766c-15.007-5.297-65.324-26.483-92.69-79.448c-0.883-2.648-0.883-5.297,0.883-7.062
      l21.186-23.834c1.766-2.648,2.648-6.179,1.766-8.828l-25.6-57.379C193.324,138.593,190.676,135.945,187.145,135.945"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="svg-root iconSize" focusable="false" viewBox="0 0 430 430" aria-hidden="true" role="presentation">
    <path d="M430.1,261.5v159h-92.2V272.2c0-37.3-13.3-62.7-46.7-62.7c-25.5,0-40.6,17.1-47.3,33.7     c-2.4,5.9-3.1,14.2-3.1,22.5v154.9h-92.2c0,0,1.2-251.3,0-277.3h92.2v39.3c-0.2,0.3-0.4,0.6-0.6,0.9h0.6v-0.9     c12.3-18.9,34.1-45.8,83.1-45.8C384.6,136.7,430.1,176.4,430.1,261.5z M52.2,9.6C20.6,9.6,0,30.3,0,57.5c0,26.6,20,47.9,51,47.9     h0.6c32.2,0,52.2-21.3,52.2-47.9C103.1,30.3,83.7,9.6,52.2,9.6z M5.5,420.6h92.2V143.2H5.5V420.6z" />
  </svg>
);
const sharePost = ({ url, title, tags }) => (
  <div className="share-post-container" id="share-post">
    <div className="share-social">
      <TwitterShareButton url={url} title={title} hashtags={tags} className="button twitter">
        <TwitterIcon />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title} className="button linkedin">
        <LinkedinIcon />
      </LinkedinShareButton>
      <WhatsappShareButton url={url} title={title} separator=":" className="button whatsapp">
        <WhatsappIcon />
      </WhatsappShareButton>
    </div>
  </div>
);

export default sharePost;
