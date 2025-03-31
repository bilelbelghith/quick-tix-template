
import * as z from "zod";

export const eventSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters"),
  date: z.date({
    required_error: "Please select a date",
  }),
  location: z.string().min(3, "Location must be at least 3 characters"),
  coverImage: z.string().optional(),
  logoImage: z.string().optional(),
  primaryColor: z.string().default("#6D28D9"),
  ticketTiers: z.array(
    z.object({
      name: z.string(),
      price: z.number().positive(),
      description: z.string().optional(),
      quantity: z.number().int().positive(),
    })
  ).default([
    { name: "General Admission", price: 25, description: "Standard entry", quantity: 100 },
    { name: "VIP", price: 50, description: "Premium experience with early entry", quantity: 30 },
  ]),
});

export type EventFormValues = z.infer<typeof eventSchema>;

export const defaultEventValues: Partial<EventFormValues> = {
  name: "My Awesome Event",
  date: new Date(),
  location: "123 Main St, Anytown, USA",
  primaryColor: "#6D28D9",
  ticketTiers: [
    { name: "General Admission", price: 25, description: "Standard entry", quantity: 100 },
    { name: "VIP", price: 50, description: "Premium experience with early entry", quantity: 30 },
  ],
};

export const colorOptions = [
  { value: "#6D28D9", label: "Purple" },
  { value: "#2563EB", label: "Blue" },
  { value: "#059669", label: "Green" },
  { value: "#DC2626", label: "Red" },
];
