import { Router } from "express";
import { DELETERental, GETRentals, POSTRentals, POSTReturnRental } from "../Controllers/RentalsController.js";

const RentalsRouter = Router();

RentalsRouter.get('/rentals', GETRentals);
RentalsRouter.post('/rentals', POSTRentals);
RentalsRouter.post('/rentals/:id/return', POSTReturnRental);
RentalsRouter.delete('/rentals/:id', DELETERental);

export default RentalsRouter;