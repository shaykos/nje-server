import { Router } from 'express';
import { getAllCharacters, getCharacterById, addCharacter } from './characters.controller.js';

const charactersRouter = Router();

charactersRouter
    .get('/', getAllCharacters)
    .get('/:id', getCharacterById)
    .post('/', addCharacter)

export default charactersRouter
