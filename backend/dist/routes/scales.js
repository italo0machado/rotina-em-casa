import { Router } from 'express';
import { db } from '../db/index.js';
import { scales } from '../db/schema.js';
import { z } from 'zod';
const router = Router();
// TODO: Add auth middleware later
const scaleSchema = z.object({
    name: z.string().min(2),
    daysOfWeek: z.array(z.string()).optional(),
    startTime: z.string().default('06:00'),
    endTime: z.string().default('19:00'),
});
router.post('/', async (req, res) => {
    try {
        const data = scaleSchema.parse(req.body);
        // TODO: Get userId from token
        const [newScale] = await db.insert(scales).values({
            userId: 1, // placeholder
            name: data.name,
            daysOfWeek: JSON.stringify(data.daysOfWeek || []),
            startTime: data.startTime,
            endTime: data.endTime,
        }).returning();
        res.status(201).json(newScale);
    }
    catch (error) {
        console.error('Scale error:', error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Dados inválidos' });
    }
});
export default router;
