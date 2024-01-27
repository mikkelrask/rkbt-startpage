import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

function truncateUrl(url: string, maxSlashes: number) {
  const parts = url.split("/");
  return parts.length > maxSlashes + 1
    ? parts.slice(0, maxSlashes + 1).join("/") + "/..."
    : url;
}

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
  links: Link[];
  categories: Category[];
}

const DataTable: React.FC<Props> = ({ links, categories }) => {
  return (
    <>
      {categories.map((category) => (
        <Card key={category.id} className="m-4 p-2">
          <Table className="pb-6">
            <TableCaption>{category.name} Links</TableCaption>
            <TableBody>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[10vw]">ID</TableHead>
                  <TableHead className="w-[25vw]">Title</TableHead>
                  <TableHead className="w-[45vw]">URL</TableHead>
                  <TableHead className="w-[20vw] text-right">
                    {" "}
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              {links
                .filter((link) => link.category_id === category.id)
                .map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="w-[10vw] text-center">
                      {link.id}
                    </TableCell>
                    <TableCell className="w-[25vw] font-bold font-4">
                      {link.title}
                    </TableCell>
                    <TableCell className="w-[45vw] text-gray-400">
                      {truncateUrl(link.url, 3)}
                    </TableCell>
                    <TableCell className="w-[20vw] text-right">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          console.log("Edit link", link.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          console.log("Delete link", link.id);
                        }}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      ))}
    </>
  );
};

export { DataTable };
