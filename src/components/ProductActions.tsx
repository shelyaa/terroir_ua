import { DropdownMenuItem } from "./ui/dropdown-menu";
import { deleteWine } from "../api/wines";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

export function DeleteDropdownItem({ id }: { id: string }) {
  const { token } = useAuth();
  const navigation = useNavigate();

  const handleDelete = () => {
    if (!token) {
      console.error("No authentication token available");
      return;
    }
    deleteWine(id, token);
    navigation(0);
  };

  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={handleDelete}
      disabled={!token}
    >
      Видалити
    </DropdownMenuItem>
  );
}