import { ObjectId } from "mongodb";
import { addCharacter, getCharacters, updateDoc } from "./characters.db.js";

export async function getAll() {
    return await getCharacters();
}

export async function getById(id) {
    let query = { _id: new ObjectId(id) }
    let [character] = await getCharacters(query);
    return character;
}

export async function insertCharacter(name) {
    let newCharacter = { name }
    return await addCharacter(newCharacter);
}

export async function update(id, name, lightsaberColor) {
    let character = { name, lightsaberColor }
    return await updateDoc(id, character);
}