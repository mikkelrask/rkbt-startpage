import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { handleDropdownChange } from "@/utils/handleDropdownChange";
import { newLink } from "@/utils/apis";

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

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      return await newLink(title, url, selectedCategoryId as number);
    } catch (error) {
      console.error(error);
    }
    // // Create a new link object based on the form data
    // const newLink = {
    //   title: title,
    //   url: url,
    //   category_id: selectedCategoryId,
    // };

    // // Send the new link data to the API endpoint
    // fetch(`${baseUrl}${linksUrl}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newLink),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Failed to add link.");
    //     }
    //     console.log("Link added successfully!");
    //     // make toast
    //     toast({
    //       title: "Link tilføjet",
    //       description: "Linket er nu tilføjet til databasen.",
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  const onDropdownChange = (value: string | null) =>
    handleDropdownChange(value, setSelectedCategoryId);

  return (
    <form onSubmit={handleFormSubmit}>
      <Card className="m-4 p-2">
        <CardHeader>
          <CardTitle>Tilføj link</CardTitle>
          <CardDescription>
            Indtast link titel, url og vælg kategori herunder
          </CardDescription>
          <Label htmlFor="title">Titel:</Label>
          <Input
            type="text"
            placeholder='eks. "RKBT Radio - Spotify Playlist"'
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Label htmlFor="url">Link:</Label>
          <Input
            type="url"
            placeholder='URL inkl. "https://" - eks. "https://open.spotify.com"'
            id="url"
            name="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <Label htmlFor="category_id">Kategori:</Label>
          <Select
            id="category_id"
            name="category_id"
            value={selectedCategoryId}
            onValueChange={onDropdownChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Vælg herunder"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Link kategori</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <CardFooter>
            <Button type="submit">Tilføj</Button>
          </CardFooter>
        </CardHeader>
      </Card>
    </form>
  );
};

export default AddLink;
