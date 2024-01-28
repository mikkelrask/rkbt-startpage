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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditInstance from "@/components/EditInstance";

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
        <Card key={category.id} className="m-4 px-6 p-4">
          <CardTitle className="text-2xl font-bold">
            {category.name} Links
          </CardTitle>
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
                    <TableCell className="w-[9vw] text-center">
                      {link.id}
                    </TableCell>
                    <TableCell className="w-[15%] font-bold font-4">
                      {link.title}
                    </TableCell>
                    <TableCell className="w-[60vw] text-gray-400">
                      {truncateUrl(link.url, 3)}
                    </TableCell>
                    <TableCell className="w-[20vw] text-right">
                      <Dialog>
                        <DialogTrigger>
                          <Button className="bg-gray-200 hover:bg-primary hover:text-white text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 inline-block mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.293 4.293a1 1 0 011.414 0L10 9.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white shadow-lg rounded-md p-4">
                          <EditInstance
                            id={link.id}
                            title={link.title}
                            url={link.url}
                            category_id={link.category_id}
                            categories={categories}
                          ></EditInstance>
                        </DialogContent>
                      </Dialog>
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
