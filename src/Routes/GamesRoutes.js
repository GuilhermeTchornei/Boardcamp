import { Router } from "express";
import { GETGames, POSTGames } from "../Controllers/GamesController.js";
import { schemaMiddleware } from "../Middleware/SchemaMiddleware.js";
import gamesSchema from "../Schema/GamesSchema.js";

const GamesRouter = Router();

GamesRouter.get('/games', GETGames);
GamesRouter.post('/games', schemaMiddleware(gamesSchema), POSTGames);

export default GamesRouter;