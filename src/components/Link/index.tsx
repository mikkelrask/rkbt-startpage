// Link.tsx
import React from "react";

interface LinkProps {
  url: string;
  title: string;
}

const Link: React.FC<LinkProps> = ({ url, title }) => {
  return (
    <a href={url} target="_parent" rel="noopener noreferrer">
      {title}
    </a>
  );
};

export default Link;
