import React from 'react';
import PropTypes from 'prop-types';

const Instagram = ({ classname }) => (
  <svg className="svg-root iconSize" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 16 16" xmlSpace="preserve">
    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="1.4645" y1="14.5355" x2="14.5355" y2="1.4645">
      <stop offset="0" stopColor="#FFC107" />
      <stop offset="0.5074" stopColor="#F44336" />
      <stop offset="0.9901" stopColor="#9C27B0" />
    </linearGradient>
    <path d="M11 0H5a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm3.5 11c0 1.93-1.57 3.5-3.5 3.5H5c-1.93 0-3.5-1.57-3.5-3.5V5c0-1.93 1.57-3.5 3.5-3.5h6c1.93 0 3.5 1.57 3.5 3.5v6z" fill="url(#SVGID_1_)" />
    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="5.1716" y1="10.8284" x2="10.8284" y2="5.1716">
      <stop offset="0" stopColor="#FFC107" />
      <stop offset="0.5074" stopColor="#F44336" />
      <stop offset="0.9901" stopColor="#9C27B0" />
    </linearGradient>
    <path d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5A2.503 2.503 0 0 1 5.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z" fill="url(#SVGID_2_)" />
    <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="11.9229" y1="4.0771" x2="12.6771" y2="3.3229">
      <stop offset="0" stopColor="#FFC107" />
      <stop offset="0.5074" stopColor="#F44336" />
      <stop offset="0.9901" stopColor="#9C27B0" />
    </linearGradient>
    <circle cx="12.3" cy="3.7" r="0.533" fill="url(#SVGID_3_)" />
  </svg>
);

// const Instagram = ({ classname }) => (
//   <svg className="svg-root iconSize" viewBox="0 0 512 512">
//     <linearGradient
//       id="a"
//       gradientUnits="userSpaceOnUse"
//       x1="42.966156268"
//       x2="469.0337477"
//       y1="469.0296477168"
//       y2="42.9620562848"
//     >
//       <stop offset="0" stopColor="#ffd600" />
//       <stop offset=".5" stopColor="#ff0100" />
//       <stop offset="1" stopColor="#d800b9" />
//     </linearGradient>
//     <linearGradient
//       id="b"
//       gradientUnits="userSpaceOnUse"
//       x1="163.0429956456"
//       x2="348.9539083464"
//       y1="348.9538083312"
//       y2="163.0428956304"
//     >
//       <stop offset="0" stopColor="#ff6400" />
//       <stop offset=".5" stopColor="#ff0100" />
//       <stop offset="1" stopColor="#fd0056" />
//     </linearGradient>
//     <linearGradient
//       id="c"
//       gradientUnits="userSpaceOnUse"
//       x1="370.9291325432"
//       x2="414.3727849912"
//       y1="141.0676714336"
//       y2="97.6240189856"
//     >
//       <stop offset="0" stopColor="#f30072" />
//       <stop offset="1" stopColor="#e50097" />
//     </linearGradient>
//     <path
//       d="m510.460938 150.453125c-1.246094-27.25-5.574219-45.859375-11.902344-62.140625-6.425782-17.082031-16.503906-32.554688-29.527344-45.34375-12.785156-13.023438-28.261719-23.105469-45.34375-29.535156-16.285156-6.324219-34.890625-10.648438-62.140625-11.886719-27.300781-1.25-36.023437-1.546875-105.546875-1.546875s-78.246094.296875-105.546875 1.539062c-27.25 1.246094-45.855469 5.574219-62.140625 11.902344-17.082031 6.425782-32.554688 16.503906-45.34375 29.527344-13.023438 12.785156-23.105469 28.257812-29.535156 45.339844-6.324219 16.285156-10.648438 34.894531-11.886719 62.140625-1.25 27.304687-1.546875 36.023437-1.546875 105.546875 0 69.527344.296875 78.25 1.546875 105.550781 1.242187 27.246094 5.570313 45.855469 11.898437 62.140625 6.425782 17.078125 16.503907 32.554688 29.527344 45.339844 12.785156 13.023437 28.261719 23.101562 45.34375 29.527344 16.28125 6.332031 34.890625 10.65625 62.140625 11.902343 27.304688 1.246094 36.023438 1.539063 105.546875 1.539063 69.523438 0 78.246094-.292969 105.546875-1.539063 27.25-1.246093 45.855469-5.570312 62.140625-11.902343 34.386719-13.296876 61.570313-40.480469 74.867188-74.867188 6.332031-16.285156 10.65625-34.894531 11.902344-62.140625 1.242187-27.304687 1.539062-36.023437 1.539062-105.546875 0-69.527344-.296875-78.246094-1.539062-105.546875zm-46.082032 208.996094c-1.136718 24.960937-5.308594 38.515625-8.8125 47.535156-8.613281 22.328125-26.257812 39.972656-48.585937 48.585937-9.019531 3.503907-22.574219 7.675782-47.535157 8.8125-26.988281 1.234376-35.085937 1.492188-103.445312 1.492188-68.363281 0-76.457031-.257812-103.449219-1.492188-24.957031-1.136718-38.511719-5.308593-47.535156-8.8125-11.117187-4.105468-21.175781-10.648437-29.433594-19.152343-8.503906-8.257813-15.046875-18.3125-19.152343-29.433594-3.503907-9.019531-7.675782-22.574219-8.8125-47.535156-1.230469-26.992188-1.492188-35.089844-1.492188-103.445313 0-68.359375.261719-76.453125 1.492188-103.449218 1.140624-24.960938 5.308593-38.515626 8.8125-47.535157 4.105468-11.121093 10.652343-21.179687 19.152343-29.4375 8.257813-8.503906 18.316407-15.046875 29.4375-19.148437 9.019531-3.507813 22.574219-7.675782 47.535157-8.816406 26.992187-1.230469 35.089843-1.492188 103.445312-1.492188h-.003906c68.355468 0 76.453125.261719 103.449218 1.496094 24.960938 1.136718 38.511719 5.308594 47.535157 8.8125 11.117187 4.105468 21.175781 10.648437 29.433593 19.148437 8.503907 8.257813 15.046876 18.316407 19.148438 29.4375 3.507812 9.019531 7.679688 22.574219 8.816406 47.535157 1.230469 26.992187 1.492188 35.089843 1.492188 103.445312 0 68.359375-.257813 76.453125-1.492188 103.449219zm0 0"
//       fill="url(#a)"
//     />
//     <path
//       d="m255.996094 124.539062c-72.601563 0-131.457032 58.859376-131.457032 131.460938s58.855469 131.457031 131.457032 131.457031c72.605468 0 131.460937-58.855469 131.460937-131.457031s-58.855469-131.460938-131.460937-131.460938zm0 216.792969c-47.125-.003906-85.332032-38.207031-85.328125-85.335937 0-47.125 38.203125-85.332032 85.332031-85.332032 47.128906.003907 85.332031 38.207032 85.332031 85.332032 0 47.128906-38.207031 85.335937-85.335937 85.335937zm0 0"
//       fill="url(#b)"
//     />
//     <path
//       d="m423.371094 119.347656c0 16.964844-13.753906 30.71875-30.71875 30.71875-16.96875 0-30.722656-13.753906-30.722656-30.71875 0-16.96875 13.753906-30.722656 30.722656-30.722656 16.964844 0 30.71875 13.753906 30.71875 30.722656zm0 0"
//       fill="url(#c)"
//     />
//   </svg>
// );

Instagram.propTypes = {
  classname: PropTypes.string,
};

Instagram.defaultProps = {
  classname: '',
};

export default Instagram;
