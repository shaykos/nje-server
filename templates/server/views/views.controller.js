
export async function loadAboutPage(req, res) {
  const data = {
    text: 'קוקו הלך לגן',
    showImg: false,
    imgUrl: 'https://mtrnews.ruppin.tech/info/images/CollegeLogo.png'
  }

  res.render('./pages/about', data);
}

export async function loadCharactersPage(req, res) {
  const characters = [
    {
      charater_name: "Luke Skywaker",
      age: 20,
      actor: "Mark Hammil"
    },
    {
      charater_name: "Princess Leia",
      age: 20,
      actor: "Carry Fisher"
    }
  ]
  console.log(characters)
  res.render('./pages/characters', { characters });
}