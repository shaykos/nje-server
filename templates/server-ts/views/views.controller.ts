import { Request, Response } from 'express';

export async function loadAboutPage(req: Requset, res: Response) {
  const data = {
    text: 'קוקו הלך לגן',
    showImg: false,
    imgUrl: 'https://mtrnews.ruppin.tech/info/images/CollegeLogo.png'
  }

  res.render('./pages/about', data);
}

export async function loadCharactersPage(req: Requset, res: Response) {
  const characters = [
    {
      name: "Luke Skywaker",
      age: 20,
      actor: "Mark Hammil"
    },
    {
      name: "Princess Leia",
      age: 20,
      actor: "Carry Fisher"
    }
  ]
  console.log(characters)
  res.render('./pages/characters', { characters });
}