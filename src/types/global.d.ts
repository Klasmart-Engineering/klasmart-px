declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIGMA_ACCESS_TOKEN: string;
      FIGMA_ICON_FILE_KEY: string;
      FIGMA_ICON_CONTAINER: string;
    }
  }
}

export {};
