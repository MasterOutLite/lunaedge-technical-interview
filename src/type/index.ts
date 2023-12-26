export type Pokemon = {
    name: string;
    url: string;
}

export type GetPokemon = {
    count: number;
    next: string;
    previous: any;
    results: Pokemon[];
}
