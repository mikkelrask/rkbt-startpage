// Categories.tsx
import React, { useEffect, useState } from "react";
import Link from "../Link";

const categories = "/api/categories";
const links = "/api/links";
const apiBaseUrl = "http://localhost:3001";
const apiUrl = `${apiBaseUrl}${categories}`;

interface Category {
  id: number;
  name: string;
  icon: string; // Add the 'icon' property for storing the Font Awesome icon name
  links: Array<{ id: number; title: string; url: string }>; // Assuming the link structure
}

const Categories: React.FC = () => {
  // State to store the categories data
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = () => {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch categories.");
          }
          return response.json();
        })
        .then((data: Category[]) => {
          console.log(data);
          setCategories(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} className="container">
          <h2 className="title">
            <i className={category.icon}></i>
            {category.name}
          </h2>
          <ul>
            {category.links?.map(
              (
                link // Add the nullish coalescing operator here
              ) => (
                <li class="title" key={link.id}>
                  <Link url={link.url} title={link.title} />
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default Categories;
