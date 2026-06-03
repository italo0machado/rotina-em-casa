import { Router } from 'express';
import { db } from '../db/index.js';
import { activities } from '../db/schema.js';
import { eq, or } from 'drizzle-orm';
import { z } from 'zod';
const router = Router();
// Blacklist simples
const blacklist = ['sexo', 'porn', 'puta', 'caralho', 'merda', 'foder', 'viado', 'buceta'];
const activitySchema = z.object({
    name: z.string().min(2).max(80),
    category: z.string().min(2).max(40),
});
router.get('/', async (req, res) => {
    const all = await db.query.activities.findMany({
        where: or(eq(activities.isGlobal, true)),
        orderBy: (activities, { asc }) => [asc(activities.name)],
    });
    res.json(all);
});
router.post('/', async (req, res) => {
    try {
        const { name, category } = activitySchema.parse(req.body);
        const lower = name.toLowerCase();
        if (blacklist.some(word => lower.includes(word))) {
            return res.status(400).json({ error: 'Atividade contém palavras não permitidas' });
        }
        const [newActivity] = await db.insert(activities).values({
            name,
            category,
            isGlobal: true,
        }).returning();
        res.status(201).json(newActivity);
    }
    catch (error) {
        console.error('Activity error:', error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Dados inválidos' });
    }
});
export default router;
