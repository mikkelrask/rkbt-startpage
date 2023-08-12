// Card.tsx
import React, { ReactNode } from "react";
import "../../skotland.css";

// pass the card title as a prop
interface CardProps {
  title: string;
  children: ReactNode;
  width: string;
}

const Card: React.FC<CardProps> = ({ children, title, width }) => {
  return (
    <div className="card " style={width}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Card;
