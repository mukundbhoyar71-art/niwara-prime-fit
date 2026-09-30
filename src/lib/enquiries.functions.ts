import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

const enquirySchema = z.object({
  enquiry_type: z.enum(["membership", "pricing", "visit", "trainer"]).default("membership"),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(25),
  email: z.union([z.literal(""), z.string().trim().email().max(200)]).optional().default(""),
  fitness_goal: optionalText(100),
  preferred_training_time: optionalText(100),
  message: optionalText(2000),
  website: z.string().max(200).optional(),
});

const typeLabel = { membership: "General enquiry", pricing: "Membership pricing", visit: "Free visit request", trainer: "Talk to a trainer" } as const;

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { success: true };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("gym_enquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      fitness_goal: data.fitness_goal || "Not specified",
      preferred_training_time: data.preferred_training_time || "Not specified",
      message: `[${typeLabel[data.enquiry_type]}] ${data.message}`.trim(),
    });
    if (error) throw new Error("Your enquiry could not be sent. Please call or WhatsApp the gym instead.");
    return { success: true };
  });
