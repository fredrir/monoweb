import { z } from "zod"

export const OfflineSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(1000).min(1),
  published: z.date(),
  fileUrl: z.string().nullable(), // s3 link
  imageUrl: z.string().nullable(), // s3 link
})

export const OfflineWriteSchema = OfflineSchema.partial({
  id: true,
})

export type Offline = z.infer<typeof OfflineSchema>
export type OfflineId = Offline["id"]
export type OfflineWrite = z.infer<typeof OfflineWriteSchema>
