import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Không được để trống"),
  password: z.string().min(1, "Không được để trống"),
})