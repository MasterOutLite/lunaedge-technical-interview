import axios from "axios";
import {GetPokemon} from "../type";

async function sendGet(path: string) {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/' + path);
        if (response.status !== 200)
            throw new Error(response.statusText)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function getPokemon() {
    const response = await sendGet('pokemon?limit=100&offset=0') as GetPokemon;
    return response.results;
}
