// eslint-disable-next-line import/namespace
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());
  const PORT = `${env.VITE_CLIENT_PORT ?? '8080'}`;

  return {
    base: '/',
    plugins: [react()],
    preview: {
      port: PORT,
      strictPort: true,
    },
    server: {
      port: PORT,
      strictPort: true,
      host: true,
      historyApiFallback: true,
    },
  };
});
