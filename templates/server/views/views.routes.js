import { Router } from "express";
import { loadAboutPage, loadCharactersPage } from "./views.controller.js";

const viewRouter = Router();

viewRouter
  .get('', (req, res) => res.render('./pages/index'))
  .get('/about', loadAboutPage)
  .get('/characters', loadCharactersPage)

export default viewRouter;