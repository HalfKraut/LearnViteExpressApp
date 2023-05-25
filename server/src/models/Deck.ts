import mongoose from "mongoose";

/**
 * This file is for the schema setup of the MongoDB.
 */

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
    title: String,
});

const DeckModel = mongoose.model("Deck", DeckSchema);

export default DeckModel;
