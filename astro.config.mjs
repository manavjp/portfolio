import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://manav-patel.com',
  output: 'static',
  // Enables data-astro-prefetch on links + the astro:prefetch module used by
  // the Next Project proximity prefetch (ProjectPageLayout).
  prefetch: true,
});
