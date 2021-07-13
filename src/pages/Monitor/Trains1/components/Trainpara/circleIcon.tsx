
import React from 'react';

export interface AirIconProps {
  color?: string;
}

const AirIcon: React.FC<AirIconProps> = (props) => {
  const { color } = props;


  return (
    <div>
      <svg t="1616926200677" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18051" width="20" height="20"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" p-id="18052"
        fill={color}></path></svg>
    </div>
  );
};

export default AirIcon;
