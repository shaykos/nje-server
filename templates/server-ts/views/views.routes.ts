import { Router, Requset, Response } from "express";
import { loadAboutPage, loadCharactersPage } from "./views.controller";

const viewRouter = Router();

viewRouter
  .get('', (req: Requset, res: Response) => res.render('./pages/index'))
  .get('/about', loadAboutPage)
  .get('/characters', loadCharactersPage)

export default viewRouter;