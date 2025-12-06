import z from "zod";
import type { loginSchema } from "./schama";

export type TLoginForm = z.infer<typeof loginSchema>;