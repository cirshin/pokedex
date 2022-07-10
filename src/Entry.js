import React, { useState, useEffect } from "react";
import pokemons from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const url = "https://pokeapi.co/api/v2/pokemon/";
const Review = () => {
  const [index, setIndex] = useState(0);
  // const { name, job, image, text } = pokemons[index];
  const [pokemonImg, setPokemonImg] = useState(
    "https://cdn.traction.one/pokedex/pokemon/1.png"
  );

  async function fetchPokemon() {
    const pokemonData = await fetch(url + (index + 1))
      .then((response) => response.json())
      .then((data) => console.log(data));
    return pokemonData;
  }

  const checkNumber = (number) => {
    if (number > pokemons.length - 1) {
      return 0;
    }
    if (number < 0) {
      return pokemons.length - 1;
    }
    return number;
  };
  const nextPokemon = () => {
    let newIndex = checkNumber(index + 1);
    setPokemonImg(
      "https://cdn.traction.one/pokedex/pokemon/" + (newIndex + 1) + ".png"
    );
    setIndex(newIndex);
  };
  const prevPokemon = () => {
    let newIndex = checkNumber(index - 1);
    setPokemonImg(
      "https://cdn.traction.one/pokedex/pokemon/" + (newIndex - 1) + ".png"
    );
    setIndex(newIndex);
  };
  const randomPokemon = () => {
    let randomNumber = Math.floor(Math.random() * pokemons.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    const correctedNum = checkNumber(randomNumber);
    setIndex(checkNumber(correctedNum));
    setPokemonImg(
      "https://cdn.traction.one/pokedex/pokemon/" + (correctedNum + 1) + ".png"
    );
  };

  return (
    <article className="review">
      <div className="img-container">
        <img
          src={pokemonImg}
          alt={pokemons[index] + "-img"}
          className="pokemon-img"
        />
      </div>
      <h4 className="author">{pokemons[index]}</h4>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPokemon}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPokemon}>
          <FaChevronRight />
        </button>
      </div>
      <button className="random-btn" onClick={randomPokemon}>
        surprise me
      </button>
      <button
        style={{ marginLeft: "1rem" }}
        className="random-btn"
        onClick={fetchPokemon}
      >
        get pokemon data
      </button>
    </article>
  );
};

export default Review;
