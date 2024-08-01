import { getAll, getById, insertCharacter, update } from './character.model.js';

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

        let character = await getById(id);

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
        let { name } = req.body;
        if (!name)
            return res.status(400).json({ message: 'name is required' });
        let result = await insertCharacter(name);

        if (!result.acknowledged)
            res.status(500).json({ message: 'internal server error. please try again' });
        else
            res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function updateCharacter(req, res) {
    try {
        let { id } = req.params;
        let { name, lightsaberColor } = req.body;

        if (id.length != 24)
            return res.status(403).json({ message: 'invalid id' });

        if (!name)
            return res.status(400).json({ message: 'name is required' });

        let result = await update(id, name, lightsaberColor);
        
        if (result.modifiedCount == 0)
            res.status(404).json({ message: 'character not found' });
        else
            res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}