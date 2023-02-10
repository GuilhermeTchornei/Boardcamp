import { Router } from "express";
import { GETCustomerById, GETCustomers, POSTCustomer, PUTCustomer } from "../Controllers/CustomersController.js";
import { schemaMiddleware } from "../Middleware/SchemaMiddleware.js";
import customersSchema from "../Schema/CustomersSchema.js";

const customersRouter = Router();

customersRouter.get('/customers', GETCustomers);
customersRouter.get('/customers/:id', GETCustomerById);
customersRouter.post('/customers', schemaMiddleware(customersSchema), POSTCustomer);
customersRouter.put('/customers/:id', schemaMiddleware(customersSchema), PUTCustomer);

export default customersRouter;