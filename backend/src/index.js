import app from './app.js';
import { env } from './config/env.js';

// Di Vercel, app diekspor lewat api/index.js. Listen hanya untuk development / hosting biasa.
if (!process.env.VERCEL) {
  app.listen(env.port, () => {
    console.log(`DRIVORA API berjalan di http://localhost:${env.port}  (data: ${env.dataSource})`);
  });
}

export default app;
