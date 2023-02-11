import db from "../Config/database.js";

export async function GETCustomers(_, res) {
    try {
        const customers = await db.query("SELECT * FROM customers;");
        res.send(customers.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function GETCustomerById(req, res) {
    const { id } = req.params;

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);
        if (!customer.rowCount > 0) return res.sendStatus(404);
        res.send(customer.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function POSTCustomer(req, res) {
    const customer = req.body;

    try
    {
        if ((await db.query(`SELECT * FROM customers WHERE cpf=$1`, [customer.cpf])).rowCount > 0) return res.sendStatus(409);

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [customer.name, customer.phone, customer.cpf, customer.birthday]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
export async function PUTCustomer(req, res) {
    const { id } = req.params;
    const customer = req.body;

    try {
        if ((await db.query(`SELECT * FROM customers WHERE cpf=$1 and id<>$2`, [customer.cpf, id])).rowCount > 0) return res.sendStatus(409);

        await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [customer.name, customer.phone, customer.cpf, customer.birthday, id]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}