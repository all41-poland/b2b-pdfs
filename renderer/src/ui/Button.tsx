import React from 'react'

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  icon?: 'download';
  isDisabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const renderIcon = () => {
    switch (props.icon) {
      case 'download':
        return (
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
        );
      default:
        return null;
    }
  }

  return (
    <button
      disabled={props.isDisabled}
      className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center"
      onClick={props.onClick}
    >
      {renderIcon()}
      {props.title}
    </button>
  )
}

export default Button