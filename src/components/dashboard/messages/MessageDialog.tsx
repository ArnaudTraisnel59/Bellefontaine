import { Message } from "../../../types/messages";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MessageDialogProps {
  message: Message | null;
  replyText: string;
  submitting: boolean;
  onOpenChange: (open: boolean) => void;
  onReplyChange: (text: string) => void;
  onSubmit: () => void;
}

export const MessageDialog = ({
  message,
  replyText,
  submitting,
  onOpenChange,
  onReplyChange,
  onSubmit,
}: MessageDialogProps) => {
  if (!message) return null;

  return (
    <Dialog open={!!message} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Message de {message.full_name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Reçu le{" "}
              {format(new Date(message.created_at), "dd MMMM yyyy", {
                locale: fr,
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              Email: {message.email}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Message:</h4>
            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
          </div>
          {message.status === "replied" ? (
            <div className="space-y-2">
              <h4 className="font-medium">Réponse:</h4>
              <p className="text-sm whitespace-pre-wrap">
                {message.admin_response}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <h4 className="font-medium">Votre réponse:</h4>
              <Textarea
                value={replyText}
                onChange={(e) => onReplyChange(e.target.value)}
                placeholder="Écrivez votre réponse ici..."
                className="min-h-[100px]"
              />
              <Button
                onClick={onSubmit}
                disabled={submitting}
                className="w-full md:w-auto"
              >
                {submitting ? "Envoi..." : "Envoyer la réponse"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};