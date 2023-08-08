import React from "react";
import LinkRow from "../LinkRow/index.tsx";
import Card from "../Card/index.tsx";

interface Link {
  id: number;
  title: string;
  url: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
}

interface LinkTableProps {
  links: Link[];
  categories: Category[];
}

const LinkTable: React.FC<LinkTableProps> = ({ links, categories }) => {
  return (
    <Card title="Rediger links">
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Adresse</th>
            <th>Kategori</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <LinkRow key={link.id} link={link} categories={categories} />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default LinkTable;
