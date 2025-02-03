import { Message } from "../../../types/messages";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowUpDown, EyeOff, MessageCircleReply, Trash2 } from "lucide-react";

interface MessagesTableProps {
  messages: Message[];
  onMessageClick: (message: Message) => void;
  onDeleteClick: (messageId: string) => void;
  onSort: (field: "date" | "name" | "status") => void;
}

export const MessagesTable = ({
  messages,
  onMessageClick,
  onDeleteClick,
  onSort,
}: MessagesTableProps) => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("date")}
                className="flex items-center gap-1"
              >
                Date
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("name")}
                className="flex items-center gap-1"
              >
                Nom
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-center">Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages?.map((message) => (
            <TableRow
              key={message.id}
              className={`cursor-pointer transition-colors ${
                !message.read ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-100"
              }`}
              onClick={() => onMessageClick(message)}
            >
              <TableCell className="whitespace-nowrap">
                {format(new Date(message.created_at), "dd MMM yyyy", {
                  locale: fr,
                })}
              </TableCell>
              <TableCell>{message.full_name}</TableCell>
              <TableCell className="hidden md:table-cell">
                {message.email}
              </TableCell>
              <TableCell className="max-w-[200px]">
                <div className="truncate">{message.message}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  {message.status === "replied" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      <MessageCircleReply className="h-3 w-3 mr-1" />
                      Répondu
                    </span>
                  )}
                  {!message.read && (
                    <EyeOff className="h-4 w-4 text-blue-500" />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(message.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};