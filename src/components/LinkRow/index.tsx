/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";

const baseUrl = `${import.meta.env.VITE_EXPRESS_API_BASE_URL as string}`;
const linksUrl = "/api/links";

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

interface LinkRowProps {
  link: Link;
  categories: Category[];
}

const LinkRow: React.FC<LinkRowProps> = ({ link, categories }) => {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    link.category_id
  );

  const handleSave = async () => {

    const updatedLink = {
      id: link.id,
      title: title,
      url: url,
      category_id: selectedCategoryId,
    };

    try {
      const response = await fetch(`${baseUrl}${linksUrl}/${link.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Bearer": `${import.meta.env.VITE_EXPRESS_API_BEARER as string}`,
        },
        body: JSON.stringify(updatedLink),
      });

      if (!response.ok) {
        throw new Error("Failed to update link.");
      }

      console.log("Changes saved successfully!");
    } catch (error) {
      console.error(error);
    }
    console.log({ title, url, selectedCategoryId });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}${linksUrl}/${link.id}/delete`, {
        method: "GET", // You might need to adjust the HTTP method here
      });

      if (!response.ok) {
        throw new Error("Failed to delete link.");
      }

      console.log("Link deleted successfully!");
      window.location.reload();
      // You might also want to update your local state or refetch data here
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    await handleSave();
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategoryId(Number(event.target.value));
  };

  return (
    <tr>
      <td>
        <input type="text" value={title} onChange={handleTitleChange} />
      </td>
      <td>
        <input type="url" value={url} onChange={handleUrlChange} />
      </td>
      <td>
        <select value={selectedCategoryId} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <a href="#" onClick={handleDelete}>
          <button className="del">Delete</button>
        </a>
        
      </td>
      <td>
        <a href="#" onClick={handleSave}>
          <button className="save">Save</button>
        </a>
      </td>
    </tr>
  );
};

export default LinkRow;
