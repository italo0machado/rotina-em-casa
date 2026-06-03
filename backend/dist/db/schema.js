import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});
export const scales = pgTable('scales', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    name: text('name').notNull(),
    daysOfWeek: text('days_of_week').notNull(), // JSON string: ["monday","tuesday"] or empty = mon-fri
    startTime: text('start_time').notNull().default('06:00'),
    endTime: text('end_time').notNull().default('19:00'),
    createdAt: timestamp('created_at').defaultNow(),
});
export const activities = pgTable('activities', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    category: text('category').notNull(),
    isGlobal: boolean('is_global').default(true),
    createdBy: integer('created_by').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
});
export const scaleActivities = pgTable('scale_activities', {
    id: serial('id').primaryKey(),
    scaleId: integer('scale_id').notNull().references(() => scales.id),
    activityId: integer('activity_id').notNull().references(() => activities.id),
    day: text('day').notNull(), // monday, tuesday...
    startTime: text('start_time').notNull(),
    durationMinutes: integer('duration_minutes').notNull(),
    order: integer('order').notNull(),
});
// Blacklist de atividades por usuário
export const blacklists = pgTable('blacklists', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    activityId: integer('activity_id').notNull().references(() => activities.id),
    reason: text('reason'),
    createdAt: timestamp('created_at').defaultNow(),
});
// Rotinas geradas (histórico)
export const routines = pgTable('routines', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    scaleId: integer('scale_id').notNull().references(() => scales.id),
    date: text('date').notNull(), // YYYY-MM-DD
    generatedAt: timestamp('generated_at').defaultNow(),
});
// Itens da rotina diária
export const routineItems = pgTable('routine_items', {
    id: serial('id').primaryKey(),
    routineId: integer('routine_id').notNull().references(() => routines.id),
    activityId: integer('activity_id').notNull().references(() => activities.id),
    day: text('day').notNull(),
    startTime: text('start_time').notNull(),
    durationMinutes: integer('duration_minutes').notNull(),
    completed: boolean('completed').default(false),
});
