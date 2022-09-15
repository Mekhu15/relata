import React from 'react';

function Image(props) {
  const { height, width, src } = props;
  return <img src={src} alt='tools_icon' height={height} widht={width} />;
}

export default Image;
