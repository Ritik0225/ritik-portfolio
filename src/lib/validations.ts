import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email"),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a bit more — at least 20 characters")
    .max(2000, "Message is too long"),
  honeypot: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
