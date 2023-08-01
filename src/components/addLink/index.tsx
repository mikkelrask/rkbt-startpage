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
        const response = await fetch("http://localhost:3001/api/categories");
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

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Create a new link object based on the form data
      const newLink = {
        title: title,
        url: url,
        category_id: selectedCategoryId
      };

      // Send the new link data to the API endpoint
      const response = await fetch("http://localhost:3001/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newLink)
      });
        console.log(JSON.stringify(newLink));

      if (!response.ok) {
        throw new Error("Failed to add link.");
      }

      console.log("Link added successfully!");

      // Clear the form after successful submission
      setTitle("");
      setUrl("");
      setSelectedCategoryId(null);
    } catch (error) {
      console.error(error);
    }
  };

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
        setUrl(""); // Set the URL to an empty string if there are no links in the category
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
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
            value={selectedCategoryId?.toString()}
            onChange={handleDropdownChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Link</button>
        </div>
      </form>
    </div>
  );
};

export default AddLink;
