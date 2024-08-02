import { connect } from 'mssql';
import { Character } from './characters.type';

const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME,
}

export async function getCharacters(query): Promise<Character[]> {
    try {
        const pool = await connect(DB_INFO.host);
        const result = await pool.request().query(query);
        let data = result.recordset<Character[]>
        let characters: Character[] = data;
        return characters;
    } catch (err) {
        console.log(err);
        return []
    }
}

export async function addCharacter(character: Character, procName: string) {
    try {
        const pool = await connect(DB_INFO.host);
        const result = await pool.request()
            .input("name", character.name)
            .input("age", character.age)
            .input("actor", character.actor)
            .execute(procName);
        return result;
    } catch (error) {
        throw new Error();
    }
}


