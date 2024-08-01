import { addCharacter, getCharacters } from "./character.db.js";

export async function getAll(id) {
    let query = `SELECT * FROM Characters`;
    if (id)
        query += ` WHERE id = '${id}'`;
    return await getCharacters(query);
}

export async function insertCharacter(name) {
    let newCharacter = { name, age, actor }
    return await addCharacter(newCharacter, "sp_addCharacter");
}
