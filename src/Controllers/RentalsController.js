import dayjs from "dayjs";
import db from "../Config/database.js";

export async function GETRentals(_, res) {
    try {
        const rentals = await db.query(`SELECT * FROM rentals JOIN games ON rentals."gameId" = games.id JOIN customers ON rentals."customerId" = customers.id`);
        console.log(rentals.rows);
        res.send(rentals.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function POSTRentals(req, res) {
    const data = req.body;
    if (data.daysRented <= 0) return res.sendStatus(400);

    try
    {
        const game = await db.query(`SELECT * FROM games WHERE id=$1`, [data.gameId]);
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1`, [data.customerId]);

        if(game.rowCount <= 0 && customer.rowCount <= 0) return res.sendStatus(400);
        if (game.rows[0].stockTotal <= 0) return res.sendStatus(400);


        const rental = {
            ...data,
            rentDate: dayjs().format('YYYY-MM-DD'),
            returnDate: null,
            delayFee: null,
            originalPrice: data.daysRented * game.rows[0].pricePerDay
        };
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [rental.customerId, rental.gameId, rental.rentDate, rental.daysRented, rental.returnDate, rental.originalPrice, rental.delayFee]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function POSTReturnRental(req, res) {
    const { id } = req.params;

    try {
        const rental = await db.query(`SELECT rentals.*, games."pricePerDay" FROM rentals JOIN games ON rentals."gameId" = games.id WHERE rentals.id=$1`, [id]);

        if (rental.rowCount <= 0) return res.sendStatus(404);
        if (rental.rows[0].returnDate != null) return res.sendStatus(400);

        let lateReturn = (dayjs() - rental.rows[0].rentDate) / (1000 * 3600 * 24) - rental.rows[0].daysRented;
        lateReturn = Math.floor(lateReturn);
        const delayFee = lateReturn > 0 ? rental.rows[0].pricePerDay * lateReturn : 0;
        const returnDate = dayjs().format('YYYY-MM-DD');

        await db.query(`UPDATE rentals SET "delayFee"=$1, "returnDate"=$2`, [delayFee, returnDate]);

        res.sendStatus(200);


    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function DELETERental(req, res) {
    const { id } = req.params;

    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id]);

        if (rental.rowCount <= 0) return res.sendStatus(404);
        if (rental.rows[0].returnDate == null) return res.sendStatus(400);

        await db.query(`DELETE FROM rentals WHERE id=$1`, [id]);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}