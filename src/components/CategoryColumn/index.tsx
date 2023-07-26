import React, { useEffect, useState } from "react";
import Link from "../Link";

const categoriesUrl = "/api/categories";
const linksUrl = "/api/links";
const apiBaseUrl = "http://localhost:3001";
const categoriesApiUrl = `${apiBaseUrl}${categoriesUrl}`;
const linksApiUrl = `${apiBaseUrl}${linksUrl}`;

interface Category {
  id: number;
  name: string;
  icon: string;
  links: Array<{ id: number; title: string; url: string }>;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = () => {
      fetch(categoriesApiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch categories.");
          }
          return response.json();
        })
        .then((data: Category[]) => {
          console.log(data);
          setCategories(data);

          // Fetch links for each category
          data.forEach((category) => {
            fetchLinksForCategory(category.id);
          });
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(categories)
    };

    fetchCategories();
  }, []);

  const fetchLinksForCategory = (categoryId: number) => {
    fetch(`${linksApiUrl}?categoryId=${categoryId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch links for category.");
        }
        return response.json();
      })
      .then((data: Array<{ id: number; title: string; url: string }>) => {
        // Find the category in the state and update its links with the fetched data
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryId ? { ...category, links: data } : category
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {categories.map((category) => (
        <div key={category.id} className="categories">
          <h2 className="title">
            <i className={category.icon}></i>
            {category.name}
          </h2>
          <ul>
            {category.links?.map((link) => (
              <li className="title" key={link.id}>
                <Link url={link.url} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Categories;
