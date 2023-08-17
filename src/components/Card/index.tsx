// Card.tsx
import React, { ReactNode } from "react";
import "../../skotland.css";

// make the width passable as a prop
interface CardProps {
  title: string;
  children: ReactNode;
  width?: string;
}
const Card: React.FC<CardProps> = ({ children, title, width }) => {
  const cardStyle: React.CSSProperties = { width: width };
  return (
    <div className="card " style={cardStyle}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Card;
