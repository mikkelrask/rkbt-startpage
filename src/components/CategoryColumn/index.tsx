import React, { useEffect, useState } from "react";
import Link from "../Link";

const categoriesUrl = "/api/categories";
const categoriesApiUrl = `${
  import.meta.env.VITE_EXPRESS_API_BASE_URL as string
}${categoriesUrl}`;

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
          throw new Error("Kunne ikke hente kategorier");
        }
        const data = (await response.json()) as Category[];
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchCategories();
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
