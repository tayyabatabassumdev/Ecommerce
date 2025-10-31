declare interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add other env variables here
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}