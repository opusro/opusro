interface ImportMetaEnv {
	/** 'holding' or 'full'. Set by astro.config.mjs from SITE_MODE. */
	readonly SITE_MODE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
