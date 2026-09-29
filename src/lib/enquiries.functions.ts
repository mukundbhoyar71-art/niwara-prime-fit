import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(25),
  email: z.string().trim().email().max(200),
  fitness_goal: z.string().trim().min(2).max(100),
  preferred_training_time: z.string().trim().min(2).max(100),
  message: z.string().trim().max(2000),
  website: z.string().max(200).optional(),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { success: true };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { website: _website, ...enquiry } = data;
    const { error } = await supabaseAdmin.from("gym_enquiries").insert(enquiry);
    if (error) throw new Error("Your enquiry could not be sent. Please call the gym instead.");
    return { success: true };
  });