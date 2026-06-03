import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'rotina-em-casa-secret';
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
router.post('/register', async (req, res) => {
    try {
        const { email, password } = registerSchema.parse(req.body);
        const existing = await db.query.users.findFirst({
            where: eq(users.email, email),
        });
        if (existing) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [newUser] = await db.insert(users).values({
            email,
            password: hashedPassword,
        }).returning();
        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: newUser.id, email: newUser.email } });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Dados inválidos' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = registerSchema.parse(req.body);
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, email: user.email } });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Dados inválidos' });
    }
});
export default router;
