import z from "zod";

export const ProductManagementSchema = () =>
  z
    .object({
      name: z.string("Required field").min(1).max(255),
      description: z.string("Required field").min(1).max(1000),
      size: z.string("Required field").min(1),
      screen_tech: z.string("Required field").min(1),
      camera: z.string("Required field").min(1),
      chip: z.string("Required field").min(1),
      ram: z.string("Required field").min(1),
      rom: z.string("Required field").min(1),
      battery: z.string("Required field").min(1),
      sim: z.string("Required field").min(1),
      os: z.string("Required field").min(1),
      resolution: z.string("Required field").min(1),
      cpu: z.string("Required field").min(1),
      compatibility: z.string("Required field").min(1),
      category: z
        .object({
          label: z.string(),
          value: z.string("Required field").min(1),
        })
        .nonoptional("Required field"),
      brand: z.object({
        label: z.string(),
        value: z.string("Required field").min(1),
      }),
    })
    .passthrough()
    .refine(
      (data) => {
        console.log(data);
        const modelKeys = Object.keys(data).filter((key) =>
          key.startsWith("model-name")
        );
        return modelKeys.length >= 1;
      },
      { message: "At least 1 model is required" }
    );
