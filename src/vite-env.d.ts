/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PASSCODE_HASH: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
