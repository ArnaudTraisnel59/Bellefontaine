import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types/messages";
import { MessagesTable } from "./messages/MessagesTable";
import { MessageDialog } from "./messages/MessageDialog";
import { DeleteConfirmDialog } from "./messages/DeleteConfirmDialog";
import { MessagesFilter } from "./messages/MessagesFilter";

type SortField = "date" | "status" | "name";
type SortOrder = "asc" | "desc";

const Messages = () => {
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState<{ [key: string]: boolean }>({});
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [filters, setFilters] = useState({
    read: null as boolean | null,
    replied: null as boolean | null,
  });
  const { toast } = useToast();

  const { data: messages, refetch } = useQuery({
    queryKey: ["contact-messages", sortField, sortOrder, filters],
    queryFn: async () => {
      let query = supabase
        .from("contact_messages")
        .select("*")
        .order(
          sortField === "date"
            ? "created_at"
            : sortField === "name"
            ? "full_name"
            : "status",
          { ascending: sortOrder === "asc" }
        );

      if (filters.read !== null) {
        query = query.eq("read", filters.read);
      }
      if (filters.replied !== null) {
        query = query.eq("status", filters.replied ? "replied" : "pending");
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Message[];
    },
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleMessageClick = async (message: Message) => {
    if (!message.read) {
      const { error } = await supabase
        .from("contact_messages")
        .update({ read: true })
        .eq("id", message.id);

      if (error) {
        console.error("Error marking message as read:", error);
      } else {
        refetch();
      }
    }
    setSelectedMessage(message);
  };

  const handleReply = async (messageId: string) => {
    if (!replyText[messageId]?.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "La réponse ne peut pas être vide",
      });
      return;
    }

    setSubmitting((prev) => ({ ...prev, [messageId]: true }));
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({
          admin_response: replyText[messageId],
          status: "replied",
        })
        .eq("id", messageId);

      if (error) throw error;

      toast({
        title: "Réponse envoyée",
        description: "La réponse a été enregistrée avec succès",
      });
      await refetch();
      setReplyText((prev) => ({ ...prev, [messageId]: "" }));
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error sending reply:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de la réponse",
      });
    } finally {
      setSubmitting((prev) => ({ ...prev, [messageId]: false }));
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;

      toast({
        title: "Message supprimé",
        description: "Le message a été supprimé avec succès",
      });
      await refetch();
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du message",
      });
    } finally {
      setMessageToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const handleFilterChange = (type: "read" | "replied", value: boolean | null) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Messages de contact</h2>
        <MessagesFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <MessagesTable
        messages={messages || []}
        onMessageClick={handleMessageClick}
        onDeleteClick={(id) => {
          setMessageToDelete(id);
          setDeleteConfirmOpen(true);
        }}
        onSort={handleSort}
      />

      <MessageDialog
        message={selectedMessage}
        replyText={replyText[selectedMessage?.id || ""] || ""}
        submitting={submitting[selectedMessage?.id || ""]}
        onOpenChange={(open) => !open && setSelectedMessage(null)}
        onReplyChange={(text) =>
          setReplyText((prev) => ({
            ...prev,
            [selectedMessage?.id || ""]: text,
          }))
        }
        onSubmit={() => selectedMessage && handleReply(selectedMessage.id)}
      />

      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={() => messageToDelete && handleDelete(messageToDelete)}
      />
    </div>
  );
};

export default Messages;