import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import AddLink from "@/components/AddLink";
// import App.css from src/app.css
import "/App.css";
import { DataTable } from "@/components/DataTable";

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

const baseUrl = `${import.meta.env.VITE_EXPRESS_API_BASE_URL as string}`;
const categoriesUrl = "/api/categories";
const linksUrl = "/api/links";

const App: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchLinksAndCategories = async () => {
      try {
        const linksResponse = await fetch(`${baseUrl}${linksUrl}`);
        const categoriesResponse = await fetch(`${baseUrl}${categoriesUrl}`);

        if (!linksResponse.ok || !categoriesResponse.ok) {
          throw new Error("Failed to fetch data.");
        }

        const linksData: Link[] = (await linksResponse.json()) as Link[];
        const categoriesData: Category[] =
          (await categoriesResponse.json()) as Category[];

        setLinks(linksData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLinksAndCategories();
  }, []);

  return (
    <div className="container">
      <AddLink />
      <DataTable links={links} categories={categories} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
