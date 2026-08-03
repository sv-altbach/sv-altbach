/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_MASTERS_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
