import { getAll, insertCharacter } from './characters.model.js';

export async function getAllCharacters(req, res) {
    try {
        let characters = await getAll();
        res.status(200).json({ characters });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getCharacterById(req, res) {
    try {
        let { id } = req.params;

        if (id.length != 24)
            return res.status(403).json({ message: 'invalid id' });

        let character = await getAll(id);

        if (!character)
            res.status(404).json({ message: 'character not found' });
        else
            res.status(200).json({ character });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function addCharacter(req, res) {
    try {
        let { name, age, actor } = req.body;
        if (!name || !age || !actor)
            return res.status(400).json({ message: 'fields are required' });
        let result = await insertCharacter(name, age, actor);

        if (!result)
            res.status(500).json({ message: 'internal server error. please try again' });
        else
            res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}
