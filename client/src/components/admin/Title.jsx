// Title.jsx
import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <h1 className="font-medium text-2xl text-white mb-4 px-4 pt-4">
      {text1}{' '}
      <span className="underline text-red-500 font-semibold">{text2}</span>
    </h1>
  );
};

export default Title;
