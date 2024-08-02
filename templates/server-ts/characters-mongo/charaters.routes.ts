import { Router } from 'express';
import { getAllCharacters, getCharacterById, addCharacter, updateCharacter } from './characters.controller';

const charactersRouter = Router();

charactersRouter
    .get('/', getAllCharacters)
    .get('/:id', getCharacterById)
    .post('/', addCharacter)
    .put('/:id', updateCharacter)

export default charactersRouter
