import db from "../Config/database.js";

export async function GETGames(_, res) {
    try {
        const games = await db.query("SELECT * FROM games;");
        res.send(games.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function POSTGames(req, res) {
    const game = req.body;

    try
    {
        if ((await db.query(`SELECT * FROM games WHERE name=$1`, [game.name])).rowCount > 0) return res.sendStatus(409);

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`, [game.name, game.image, game.stockTotal, game.pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}