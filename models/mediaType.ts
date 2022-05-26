export enum MediaType {
  IMAGE = 'IMAGE',
  GIF = 'GIF',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  TEXT = 'TEXT',
  UNKNOWN = 'UNKNOWN',
}

export const mimeToMediaType: {
  [key: string]: MediaType
} = {
  'image/jpg': MediaType.IMAGE,
  'image/jpeg': MediaType.IMAGE,
  'image/png': MediaType.IMAGE,
  'image/tiff': MediaType.IMAGE,
  'image/gif': MediaType.GIF,
  'video/mp4': MediaType.VIDEO,
  'video/quicktime': MediaType.VIDEO,
  'audio/mpeg': MediaType.AUDIO,
  'audio/mp3': MediaType.AUDIO,
  'audio/vnd.wav': MediaType.AUDIO,
  'audio/vnd.wave': MediaType.AUDIO,
  'audio/wav': MediaType.AUDIO,
  'audio/wave': MediaType.AUDIO,
  'audio/x-wav': MediaType.AUDIO,
  'audio/aiff': MediaType.AUDIO,
  'text/markdown': MediaType.TEXT,
  'text/plain': MediaType.TEXT,
  'text/plain; charset=utf-8': MediaType.TEXT,
  'text/markdown; charset=utf-8': MediaType.TEXT,
  'application/json': MediaType.TEXT,
}
