import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Wine } from "../../../types/Wine";
import { getWines } from "../../../api/wines";
import PaginationRounded from "../../ui/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Loading } from "../../ui/loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { DeleteDropdownItem } from "../../ui/ProductActions";

export const ProductsTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Wine[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setProducts([]);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const result = await getWines({ page });
        setProducts(result.content);
        setTotalPages(result.totalPages);
      } catch (e) {
        console.error("Помилка при отриманні вин:", e);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  if (isLoading)
    return (
      <div className="mx-auto py-4 max-w-7xl justify-center flex">
        <Loading />
      </div>
    );
  console.log(products);

  if (!isLoading && products.length === 0) return <p className="text-center font-medium text-2xl">Продуктів не знайдено</p>;
  return (
    <div className="px-4">
      <Table className="mx-auto py-4 max-w-5xl">
        <TableHeader>
          <TableRow className="text-xl font-semibold">
            <TableHead>Назва</TableHead>
            <TableHead>Ціна</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Дії</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-manrope font-normal">
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price} грн</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="font-manrope font-medium">
                    <DropdownMenuItem asChild>
                      <Link to={`/admin/products/${product.id}/edit`}>
                        Редагувати
                      </Link>
                    </DropdownMenuItem>

                    <DeleteDropdownItem id={product.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {products.length !== 0 && (
        <div className="mt-8 flex justify-center">
          <PaginationRounded
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
};
