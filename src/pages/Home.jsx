import { Grid, Skeleton } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";

export const Home = () => {

    const [pokemons, setPokemons] = useState([])
    useEffect(() => {
        getPokemons()
    }, [])

    const getPokemons = () => {
        let endpoints = []
        for (let i = 1; i < 151; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        console.log(endpoints)
        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then((res) => setPokemons(res))
            .catch((err) => console.log(err))
    }
    const pokemonFilter = (name) => {
        let filteredPokemons = [];
        if (name === "") {
            getPokemons();
        }
        for (let i in pokemons) {
            if (pokemons[i].data.name.includes(name.toLowerCase())) {
                filteredPokemons.push(pokemons[i]);
            }
        }

        setPokemons(filteredPokemons);
    };


    return (
        <div>
            < NavBar pokemonFilter={pokemonFilter} />
            <Container maxWidth="false">
                <Grid container spacing={3}>
                    {pokemons.length === 0 ?
                        <Skeleton />
                        : (
                            
                                pokemons.map((pokemon, key) => (
                                    <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                                        <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
                                    </Grid>
                                ))
                            
                        )}

                </Grid>
            </Container>
        </div>
    )
}