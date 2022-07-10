import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const numPokemon = 898;
const url = "https://pokeapi.co/api/v2/pokemon/";
const descUrl = "https://pokeapi.co/api/v2/pokemon-species/";
const imgUrl = "https://cdn.traction.one/pokedex/pokemon/";

const Entry = () => {
  const [index, setIndex] = useState(1);
  const [pokemon, setPokemon] = useState("");
  const [pokemonDescription, setPokemonDescription] = useState("");
  const [pokemonTypes, setPokemonTypes] = useState("");

  const getPokemon = async () => {
    const pokeData = await fetch(descUrl + index);
    const pokemonData = await pokeData.json();

    setPokemon(pokemonData.name);
    const cleanedText = pokemonData.flavor_text_entries[1].flavor_text.replace(
      "\f",
      " "
    );
    setPokemonDescription(cleanedText);

    const pokeInfo = await fetch(url + index);
    const pokemonInfo = await pokeInfo.json();
    let types = "";
    for (let i = 0; i < pokemonInfo.types.length; i++) {
      types +=
        pokemonInfo.types[i].type.name.charAt(0).toUpperCase() +
        pokemonInfo.types[i].type.name.slice(1);
      if (i != pokemonInfo.types.length - 1) {
        types += " ";
      }
    }
    console.log(types);
    setPokemonTypes(types);
  };

  useEffect(() => {
    getPokemon();
  }, [index, getPokemon]);

  const checkNumber = (number) => {
    if (number > numPokemon) {
      return 1;
    }
    if (number < 1) {
      return numPokemon;
    }
    return number;
  };
  const nextPokemon = () => {
    let newIndex = checkNumber(index + 1);
    setIndex(newIndex);
  };
  const prevPokemon = () => {
    let newIndex = checkNumber(index - 1);
    setIndex(newIndex);
  };
  const randomPokemon = () => {
    let randomNumber = Math.floor(Math.random() * numPokemon);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    const correctedNum = checkNumber(randomNumber);
    setIndex(checkNumber(correctedNum));
  };

  return (
    <article className="review">
      <div className="img-container">
        <img
          src={imgUrl + index + ".png"}
          alt={pokemon + "-img"}
          className="pokemon-img"
        />
      </div>
      <h3 className="pokemon-name">{pokemon}</h3>
      <h4 className="type-text">{pokemonTypes}</h4>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPokemon}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPokemon}>
          <FaChevronRight />
        </button>
      </div>
      <h4>{pokemonDescription}</h4>
      <button className="random-btn" onClick={randomPokemon}>
        Random Pokemon
      </button>
    </article>
  );
};

export default Entry;
