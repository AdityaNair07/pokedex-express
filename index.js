import express, { response } from "express";
import axios from "axios";

const app = express();

const port = 3000;

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + req.body.pokemonName);

    const abilities = [...response.data.abilities.name],
      type = [...response.data.abilities.type.name];

    // response.data.abilities.forEach((element) => {
    //   abilities.push(element.ability.name);
    // });

    // response.data.types.forEach((element) => {
    //   type.push(element.type.name);
    // });

    res.render("index.ejs", {
      img: response.data.sprites.front_default,
      name: response.data.name,
      id: response.data.id,
      height: response.data.height,
      weight: response.data.weight,
      moves: response.data.moves.length,
      abilities: abilities,
      type: type,
    });
  } catch (error) {
    res.render("index.ejs", {
      err: `${req.body.pokemonName} not found`,
    });
  }
});

app.listen(port, () => console.log(`Running on ${port}`));
