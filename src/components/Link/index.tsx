// Link.tsx
import React from "react";

interface LinkProps {
  url: string;
  title: string;
}

const Link: React.FC<LinkProps> = ({ url, title }) => {
  return (
    <a href={url} target="_top" rel="noopener noreferrer">
      {title}
    </a>
  );
};

export default Link;
