import { CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { handleDropdownChange } from "@/utils/handleDropdownChange";
import { useState } from "react";
import { updateLink, deleteLink } from "@/utils/apis";
import { toast } from "../ui/use-toast";

const linksUrl = "/api/links";
const baseUrl = `${import.meta.env.VITE_EXPRESS_API_BASE_URL as string}`;

const setValue = (
  setFunction: React.Dispatch<React.SetStateAction<string>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setFunction(e.target.value);
  };
};
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

interface Props {
  id: number;
  title: string;
  url: string;
  category_id: number;
  categories: Category[];
}

const EditInstance: React.FC<Props> = ({
  id,
  title: initialTitle,
  url: initialUrl,
  category_id: initialCategoryId,
  categories,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [url, setUrl] = useState(initialUrl);
  const [category_id, selectedCategoryId] = useState(initialCategoryId); // event handlers
  const onDropdownChange = (value: string | null) =>
    handleDropdownChange(value, category_id, selectedCategoryId);
  const onTitleChange = setValue(setTitle);
  const onUrlChange = setValue(setUrl);
  const onDeleteClick = async () => {
    try {
      await deleteLink(id);
      // close modal
      toast({
        title: "Link slettet",
        description: "Linket er nu slettet fra databasen.",
      });
    } catch (error) {
      window.alert("nope");
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(id);
    console.log("i am reached (submit)");
    const data = {
      title: title,
      url: url,
      category_id: category_id as number,
    };
    console.log(data);
    const endpoint = `${baseUrl}${linksUrl}/${id}`;
    console.log(endpoint, data);
    try {
      await updateLink(id, data);
      // close modal
      toast({
        title: "Link opdateret",
        description: "Linket er nu opdateret i databasen.",
      });
    } catch (error) {
      window.alert("nope");
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Rediger {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onFormSubmit}>
          <Label htmlFor="title">Titel:</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onTitleChange}
          />
          <Label htmlFor="url">Link:</Label>
          <Input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={onUrlChange}
          />
          <Label htmlFor="category">Kategori</Label>
          <Select
            id="category_id"
            name="category_id"
            value={category_id}
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
          </Select>{" "}
          <Button
            onClick={onDeleteClick}
            className="m-2"
            type="button"
            className="bg-red-600 text-white hover:bg-red-800"
          >
            Delete
          </Button>
          <Button className="m-2" type="submit">
            Save
          </Button>
        </form>
      </CardContent>
    </>
  );
};

export default EditInstance;
