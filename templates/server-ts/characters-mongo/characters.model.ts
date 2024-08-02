import { ObjectId } from "mongodb";
import { addCharacter, getCharacters, updateDoc } from "./characters.db";
import { Character } from "./characters.type.js";

export async function getAll(): Promise<Character[]> {
    return await getCharacters();
}

export async function getById(id: string): Promise<Character> {
    let query = { _id: new ObjectId(id) }
    let [character] = await getCharacters(query);
    return character;
}

export async function insertCharacter(name: string, age: number, actor: string) {
    let newCharacter: Character = { name, age, actor }
    return await addCharacter(newCharacter);
}

export async function update(id: string, name: string, age: number, actor: string, lightsaberColor: string) {
    let character: Character = { name, age, actor, lightsaberColor }
    return await updateDoc(id, character);
}