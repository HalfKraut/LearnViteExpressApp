import { config } from "dotenv";
config(); //Load Config for API

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

/**
 * This is made based on the following youtube tutorial:
 * https://www.youtube.com/watch?v=G_XyAfcLeqI
 *
 * We are making a flashcard app for users to study with.
 * The app will have a restful Express backend with a frontend
 * made using Vite and React.
 *
 */

//Set API port from env file
const PORT = process.env.PORT;
//Setup the express app for requests
const app = express();

//Setup API to allow cross origin requests.
app.use(
    cors({
        origin: "*",
    })
);
//Setup middleware to allow support for JSON post requests.
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

//Request Routes and Controllers for Decks
app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);

//Request Routes and Controllers for Cards
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

/**
 * Connects to MongoDB setup for this API, then starts the server after the db
 * promise resolves.
 */
mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(PORT, () => {
        console.log(`Now Listening on Port: ${PORT}\nhttp://localhost:${PORT}`);
    });
});
