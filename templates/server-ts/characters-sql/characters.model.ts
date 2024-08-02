import { addCharacter, getCharacters } from "./characters.db";
import { Character } from "./characters.type";

export async function getAll(id?: number): Promise<Character[]> {
    let query = `SELECT * FROM Characters`;
    if (id)
        query += ` WHERE id = '${id}'`;
    return await getCharacters(query);
}

export async function insertCharacter(name: string, age: number, actor: string) {
    let newCharacter: Character = { name, age, actor }
    return await addCharacter(newCharacter, "sp_addCharacter");
}
