import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface MessagesFilterProps {
  filters: {
    read: boolean | null;
    replied: boolean | null;
  };
  onFilterChange: (
    type: "read" | "replied",
    value: boolean | null
  ) => void;
}

export const MessagesFilter = ({
  filters,
  onFilterChange,
}: MessagesFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtres
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <h4 className="text-sm font-semibold mb-1">État de lecture</h4>
        </div>
        <DropdownMenuCheckboxItem
          checked={filters.read === true}
          onCheckedChange={(checked) => {
            onFilterChange(
              "read",
              checked ? true : checked === false ? false : null
            );
          }}
        >
          Messages lus
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <h4 className="text-sm font-semibold mb-1">État de réponse</h4>
        </div>
        <DropdownMenuCheckboxItem
          checked={filters.replied === true}
          onCheckedChange={(checked) => {
            onFilterChange(
              "replied",
              checked ? true : checked === false ? false : null
            );
          }}
        >
          Messages répondus
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};