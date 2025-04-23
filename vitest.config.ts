import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'src/interfaces.ts', 
        'src/index.ts',      
        'src/enums.ts',     
        'src/db/**'
      ],
    },
  },
});