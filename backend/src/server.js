import 'dotenv/config';
import { app } from './app.js';

if (!process.env.DATABASE_URL || !process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('Configura DATABASE_URL y JWT_SECRET (mínimo 32 caracteres) en backend/.env');
  process.exit(1);
}

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`API disponible: http://localhost:${port}/api/health`));
