// Card.tsx
import React, { ReactNode } from "react";
import "../../skotland.css";

// pass the card title as a prop
interface CardProps {
  title: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Card;
