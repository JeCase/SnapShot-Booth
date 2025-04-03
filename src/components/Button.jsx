import React from 'react';

const Button = ({ onClick, children, color }) => {
  const buttonClasses = `px-6 py-3 font-semibold rounded-lg transition-all ${
    color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : color === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600' : color === 'green' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
  } text-white`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
