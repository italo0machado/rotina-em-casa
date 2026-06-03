import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './db/index.js';
import authRoutes from './routes/auth.js';
import scaleRoutes from './routes/scales.js';
import activityRoutes from './routes/activities.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL;
async function startServer() {
    // Run migrations automatically on startup
    try {
        await migrate(db, { migrationsFolder: './drizzle' });
        console.log('✅ Migrations applied successfully');
    }
    catch (err) {
        console.error('⚠️  Migration error (may be safe to ignore if tables already exist):', err);
    }
    app.use(cors({
        origin: FRONTEND_URL || '*',
        credentials: true,
    }));
    app.use(express.json());
    app.use('/api/auth', authRoutes);
    app.use('/api/scales', scaleRoutes);
    app.use('/api/activities', activityRoutes);
    app.get('/health', (req, res) => {
        res.json({ status: 'ok', project: 'rotina-em-casa' });
    });
    app.listen(PORT, () => {
        console.log(`🚀 Backend running on port ${PORT}`);
    });
}
startServer();
