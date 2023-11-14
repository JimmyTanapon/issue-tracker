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

export const  commentSchema = z.object({
  userId: z
  .string()
  .min(1, " Please log in before comment.")
  .max(225),
  content:z.string()
  .min(1, "comment is required")
  .max(65535),
})

export const  commentSchemaForm = z.object({
  content:z.string()
  .min(1, "comment is required")
  .max(65535),
})