import { Router } from "express";
import type { Request, Response } from "express";
import pool from "../database/pool.ts";

const router = Router();

router.get("/api/data/all", async (req: Request, res: Response) => {
    console.log("Querying flashcards...")
    try {
        const result = await pool.query(`
            SELECT
                id,
                title,
                front_text as "frontText",
                back_text as "backText",
                created_at "createdAt",
                updated_at as "updatedAt"
            FROM flashcards
            
            `);
            res.json(result.rows);

    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
});


router.get("/api/data", async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        const result = await pool.query(
            `
            SELECT
                title,
                front_text,
                back_text
            FROM flashcards
            WHERE id = $1
            `,
            [cardId]
        )
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
})


router.post("/api/data/add", async (req: Request, res: Response) => {
    try {
        const { title, frontText, backText } = req.body;
        const queryText = `
            INSERT INTO flashcards (title, front_text, back_text)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [title, frontText, backText];
        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    };
});


router.delete("/api/data/delete", async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        const result = await pool.query(`
        DELETE FROM flashcards WHERE id = $1
        RETURNING *
        `, [cardId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Record not found' })
        }
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
})

export default router;