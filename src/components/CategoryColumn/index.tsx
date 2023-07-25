// Categories.tsx
import React, { useEffect, useState } from "react";

const endpoint = "/api/categories";
const apiBaseUrl = "http://localhost:3001";
const apiUrl = `${apiBaseUrl}${endpoint}`;

interface Category {
  id: number;
  name: string;
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
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
