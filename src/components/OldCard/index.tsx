// Card.tsx
import React, { ReactNode } from "react";

// make the width passable as a prop
interface CardProps {
  title: string;
  children: ReactNode;
  width?: string;
}
const OldCard: React.FC<CardProps> = ({ children, title, width }) => {
  const cardStyle: React.CSSProperties = { width: width };
  return (
    <div className="card rounded" style={cardStyle}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default OldCard;
