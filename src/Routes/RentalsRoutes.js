import { Router } from "express";
import { DELETERental, GETRentals, POSTRentals, POSTReturnRental } from "../Controllers/RentalsController.js";
import { schemaMiddleware } from "../Middleware/SchemaMiddleware.js";
import rentalsSchema from "../Schema/RentalsSchema.js";

const RentalsRouter = Router();

RentalsRouter.get('/rentals', GETRentals);
RentalsRouter.post('/rentals', schemaMiddleware(rentalsSchema), POSTRentals);
RentalsRouter.post('/rentals/:id/return', POSTReturnRental);
RentalsRouter.delete('/rentals/:id', DELETERental);

export default RentalsRouter;