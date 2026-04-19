export const getPrimaryImage = (images: string[], fallback: string): string => {
  return images.length > 0 ? images[0] : fallback
}

export const resolveImage = (url: string): string => {
  return url && url.length > 0
    ? url
    : 'https://images.dummyjson.com/thumbnail?text=Fashion'
}
