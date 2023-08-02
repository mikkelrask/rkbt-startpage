import React, { useEffect, useState } from "react";
import Link from "../Link";

const categoriesUrl = "/api/categories"; // Updated route URL
const apiBaseUrl = "https://api.raske.xyz";
const categoriesApiUrl = `${apiBaseUrl}${categoriesUrl}`;

interface LinkData {
  id: number;
  title: string;
  url: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  links: LinkData[];
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(categoriesApiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {categories.map((category) => (
        <div key={category.id} className="categories">
          <h2 className="title">
            <span className={category.icon}> </span>
            {category.name}
          </h2>
          {category.links.length > 0 ? (
            <ul>
              {category.links.map((link) => (
                <li className="title" key={link.id}>
                  <Link url={link.url} title={link.title} />
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <li className="title color-gray">
                <Link url="#" title="No links." />
              </li>
            </ul>
          )}
        </div>
      ))}
    </>
  );
};

export default Categories;
