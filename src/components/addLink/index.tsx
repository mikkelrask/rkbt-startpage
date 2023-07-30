import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  icon: string;
  links: { id: number; category_id: number; title: string; url: string }[];
}

const AddLink: React.FC = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const data: Category[] = await response.json();
        console.log(data); // Add this line to check the data received from the API
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = Number(event.target.value);
    setSelectedCategoryId(categoryId);
    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );
    if (selectedCategory) {
      setTitle(selectedCategory.name);
      // For demonstration purposes, we set the URL as the first link in the selected category
      if (selectedCategory.links.length > 0) {
        setUrl(selectedCategory.links[0].url);
      } else {
        setUrl(""); // Set the URL to empty string if there are no links in the category
      }
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dropdown">Select Category:</label>
        <select
          id="dropdown"
          value={selectedCategoryId}
          onChange={handleDropdownChange}
        >
          <option value={null}>Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Link</button>
      </div>
    </div>
  );
};

export default AddLink;
