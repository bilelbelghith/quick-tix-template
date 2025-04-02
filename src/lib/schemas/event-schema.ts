
import * as z from "zod";

// Base event schema with common fields
const baseEventSchema = {
  name: z.string().min(3, "Event name must be at least 3 characters"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().optional(),
  location: z.string().min(3, "Location must be at least 3 characters"),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  logoImage: z.string().optional(),
  primaryColor: z.string().default("#6D28D9"),
  organizerName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  capacity: z.number().int().positive().optional(),
  isOnline: z.boolean().default(false),
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
};

// Concert-specific schema fields
const concertEventSchema = z.object({
  ...baseEventSchema,
  // Concert specific fields
  artistName: z.string().optional(),
  genre: z.string().optional(),
  openingAct: z.string().optional(),
  duration: z.string().optional(),
});

// Workshop-specific schema fields
const workshopEventSchema = z.object({
  ...baseEventSchema,
  // Workshop specific fields
  instructorName: z.string().optional(),
  skillLevel: z.string().optional(),
  prerequisites: z.string().optional(),
  materials: z.string().optional(),
});

// Sports-specific schema fields
const sportsEventSchema = z.object({
  ...baseEventSchema,
  // Sports specific fields
  teamNames: z.string().optional(),
  sportType: z.string().optional(),
  competitionLevel: z.string().optional(),
  rules: z.string().optional(),
});

// Combine all template types into a discriminated union
export const eventSchema = z.discriminatedUnion('templateType', [
  concertEventSchema.extend({ templateType: z.literal('concert') }),
  workshopEventSchema.extend({ templateType: z.literal('workshop') }),
  sportsEventSchema.extend({ templateType: z.literal('sports') }),
]);

export type EventFormValues = z.infer<typeof eventSchema>;

// Default values for each template type
export const getDefaultEventValues = (templateType: string): Partial<EventFormValues> => {
  const baseDefaults = {
    name: "My Awesome Event",
    date: new Date(),
    time: "19:00",
    location: "123 Main St, Anytown, USA",
    description: "Join us for an amazing event!",
    primaryColor: "#6D28D9",
    organizerName: "",
    contactEmail: "",
    capacity: 130,
    isOnline: false,
    templateType: templateType as any,
    ticketTiers: [
      { name: "General Admission", price: 25, description: "Standard entry", quantity: 100 },
      { name: "VIP", price: 50, description: "Premium experience with early entry", quantity: 30 },
    ],
  };

  // Add template-specific defaults
  switch (templateType) {
    case 'concert':
      return {
        ...baseDefaults,
        artistName: "Featured Artist",
        genre: "Rock",
        openingAct: "",
        duration: "2 hours",
      };
    case 'workshop':
      return {
        ...baseDefaults,
        instructorName: "Workshop Instructor",
        skillLevel: "All levels",
        prerequisites: "",
        materials: "Laptop recommended",
      };
    case 'sports':
      return {
        ...baseDefaults,
        teamNames: "Team A vs Team B",
        sportType: "Basketball",
        competitionLevel: "Amateur",
        rules: "",
      };
    default:
      return baseDefaults;
  }
};

export const colorOptions = [
  { value: "#6D28D9", label: "Purple" },
  { value: "#2563EB", label: "Blue" },
  { value: "#059669", label: "Green" },
  { value: "#DC2626", label: "Red" },
];
