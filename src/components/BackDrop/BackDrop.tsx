import React from "react";
import './BackDrop.scss';

type Props = {
  onClick: () => void;
}

export const BackDrop: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="back_drop" onClick={onClick}></div>
  )
}
