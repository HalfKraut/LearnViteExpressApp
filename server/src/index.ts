import { config } from "dotenv";
config(); //Load Config for API

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getDecksController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";

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
app.use(cors());
//Setup middleware to allow support for JSON post requests.
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

//Request Routes and Controllers for Decks
app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);

/**
 * Connects to MongoDB setup for this API, then starts the server after the db
 * promise resolves.
 */
mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(PORT, () => {
        console.log(`Now Listening on Port: ${PORT}\nhttp://localhost:${PORT}`);
    });
});
