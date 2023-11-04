import { Status } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
});

const statusTypeSchema = z.union([
  z.literal('OPEN'),
  z.literal('IN_PROGRESS'),
  z.literal('CLOSED'),
]);
// type PaymentType = z.infer<typeof PaymentTypeSchema>;


export const pathIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  status:statusTypeSchema,
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(225)
    .optional()
    .nullable(),
});
