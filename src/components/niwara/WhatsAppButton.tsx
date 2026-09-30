import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site-config";

type Variant = "dark" | "outlineEditorial" | "light" | "transparent";

export function WhatsAppButton({ label = "WHATSAPP", variant = "outlineEditorial", message, className }: { label?: string; variant?: Variant; message?: string; className?: string }) {
  return <Button asChild variant={variant} size="editorial" className={className}>
    <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" aria-label={`${label} — chat with Niwara Gym on WhatsApp (opens in a new tab)`}>{label} <MessageCircle aria-hidden="true" /></a>
  </Button>;
}
