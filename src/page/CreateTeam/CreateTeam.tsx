import React, {useEffect, useState} from 'react';
import {getPokemon} from "../../api/apiPokemon";
import {Pokemon} from "../../type";
import SelectMultiply from "../../components/SelectMultiply/SelectMultiply";
import TextField from "../../components/TextField/TextField";
import Badge from "../../components/Badge/Badge";
import {useForm} from "react-hook-form";


export interface IFormValues {
    firstName: string;
    lastName: string;
    pokemonTeam: string[];
}

function CreateTeam() {

    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [pokemonSelected, setPokemonSelected] = useState<any[]>([]);

    const {register, handleSubmit, setValue} = useForm<IFormValues>();

    useEffect(() => {
        const get = async () => {
            const res = await getPokemon();
            setPokemon(res);
        }
        get();
    }, [])

    function removeItem(value: any) {
        return () => {
            setPokemonSelected(items => items.filter(item => item != value));
        }
    }

    function filterSelect(search: string) {
        if (!search)
            return pokemon;
        return pokemon.filter(value => value.name.includes(search));
    }

    const onSubmit = (data: IFormValues) => {
        alert(JSON.stringify(data));
    }

    useEffect(() => {
        setValue('pokemonTeam', pokemonSelected.map(value => value.name));
    }, [pokemonSelected]);

    return (
        <div className={'container mx-auto flex flex-col gap-12 h-screen justify-center'}>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-4 items-center'}>
                <TextField form={{register, label: 'firstName', options: {minLength: 3, required: true}}}
                           placeholder={'Name'}/>
                <TextField form={{register, label: 'lastName', options: {minLength: 3, required: true}}}
                           placeholder={'Lastname'}/>

                <SelectMultiply
                    label={'Label'}
                    placeholder={'Оберіть покемонів в команду'}
                    date={pokemon}
                    valueSelected={pokemonSelected}
                    setValueSelected={setPokemonSelected}
                    filter={filterSelect}
                    renderValue={(values) => (
                        values.map(value => (<Badge key={value.name}
                                                    handleClick={removeItem(value)}>{value.name}</Badge>))
                    )}
                />

                <input type="submit"/>
            </form>
        </div>
    );
}

export default CreateTeam;
