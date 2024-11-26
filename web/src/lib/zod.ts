import z from 'zod'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const zImage = z
  .instanceof(File, {
    message: 'Invalid file type',
  })
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only these types are allowed .jpg, .jpeg, .png and .webp'
  )
