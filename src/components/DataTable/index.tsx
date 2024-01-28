import { truncateUrl } from "../../utils/truncate";
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
import { Button } from "@/components/ui/button";

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
                      <Button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </Button>
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
