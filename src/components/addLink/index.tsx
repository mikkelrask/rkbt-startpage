import React, { useEffect, useState } from "react";
import Card from "../Card";

const categoriesUrl = "/api/categories";
const linksUrl = "/api/links";
const baseUrl = `${import.meta.env.VITE_EXPRESS_API_BASE_URL as string}`;
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
        const response = await fetch(`${baseUrl}${categoriesUrl}`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const data = (await response.json()) as Category[];
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchCategories();
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a new link object based on the form data
    const newLink = {
      title: title,
      url: url,
      category_id: selectedCategoryId,
    };

    // Send the new link data to the API endpoint
    fetch(`${baseUrl}${linksUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLink),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add link.");
        }
        console.log("Link added successfully!");

        // Clear the form after successful submission
        setTitle("");
        setUrl("");
        setSelectedCategoryId(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = Number(event.target.value);
    setSelectedCategoryId(categoryId);
  };

  return (
    <Card title="Nyt link">
      <div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="title">Navn:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">Adresse:</label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dropdown">Kategori:</label>
            <select
              id="dropdown"
              value={selectedCategoryId?.toString()}
              onChange={handleDropdownChange}
            >
              <option value="Kolonne:">Select</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button type="submit" placeholder="Kolonne" value="kolonne">
              Tilføj
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AddLink;
