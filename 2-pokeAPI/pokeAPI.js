async function allPokemonData() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1400');
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de Pokémon.');
        }

        const data = await response.json();
        const allPokemon = data.results;

        const pokemonDataList = await Promise.all(allPokemon.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            if (!pokemonResponse.ok) {
                throw new Error(`No se pudo obtener la información del Pokemon: ${pokemon.name}`);
            }
            const pokemonData = await pokemonResponse.json();
            return pokemonData;
        }));

        return pokemonDataList;
    } catch (error) {
        throw new Error(`Error al obtener los datos: ${error.message}`);
    }
}

async function getPokemon(value) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    if (!response.ok) {
        throw new Error(`No se pudo obtener la información del Pokémon numero ${value}.`);
    }
    return await response.json();
}

/* ITEM 1: OBTENER LA CANTIDAD TOTAL DE POKEMON DEL TIPO(STRING)*/
async function getTotalPokemonByType(allData, type) {
    try {
        const total = await allData.filter((pokemon) => {
            return pokemon.types.some(t => t.type.name === type)
        }).length
        console.log(`Total pokemon de tipo ${type}: ${total}`)
        console.log('_____________________________________')
        return total
    } catch (error) {
        console.error('Error al obtener los datos:', error.message)
    }
}

/* ITEM 2: OBTENER LOS POKEMON QUE CUMPLE CON 2 TIPOS*/
async function getPokemonMatchTypes(allData, type1, type2) {
    try {

        const pokemonMatchList = allData.filter((pokemon) => {
            return (pokemon.types.some(t => (t.type.name === type1)) &&
                pokemon.types.some(t => (t.type.name === type2)))
        })
        console.log(`Pokemon de tipo ${type1} y ${type2}:`)
        pokemonMatchList.forEach(pokemon => {
            console.log(`- ${pokemon.name}`)
        });
        console.log('_____________________________________')
        return pokemonMatchList;
    } catch (error) {
        console.error('Error al obtener los datos:', error.message)
    }
}

/* ITEM 3: OBTENER LOS DATOS DE POKEMON POR NOMBRE*/
async function getPokemonNumberByName(pokemonName) {
    try {
        const data = await getPokemon(pokemonName)
        console.log(`${pokemonName} tiene el número ${data.id}`)
        console.log('_____________________________________')
        return data.id
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
}

async function getPokemonStatsByNumber(pokemonNumber) {
    try {
        const data = await getPokemon(pokemonNumber)
        const stats = data.stats.map(stat => {
            return { name: stat.stat.name, baseValue: stat.base_stat };
        });

        const pokemonStats = {
            name: data.name,
            number: data.id,
            stats: stats
        };

        console.log(pokemonStats)
        console.log('_____________________________________')
        return pokemonStats
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
}

async function getPokemonListWithOrder(ids, orderBy) {
    try {
        const pokemonDataList = await Promise.all(ids.map(async (id) => {
            const data = await getPokemon(id)

            return {
                id: data.id,
                name: data.name,
                types: data.types.map(type => type.type.name),
                weight: data.weight
            }
        }));

        switch (orderBy) {
            case 'name':
                pokemonDataList.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'type':
                pokemonDataList.sort((a, b) => {
                    const typeA = a.types.join(', ');
                    const typeB = b.types.join(', ');
                    return typeA.localeCompare(typeB);
                });
                break;
            case 'weight':
                pokemonDataList.sort((a, b) => a.weight - b.weight);
                break;
            default:
                throw new Error('El indicador de ordenamiento es inválido. Debe ser "name", "type" o "weight".');
        }
        pokemonDataList.forEach(pokemon => {
            console.log(pokemon)
        });
        console.log('_____________________________________')
        return pokemonDataList
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
}

//Funcion principal que realiza el llamado a los distintos items requeridos
async function main() {
    try {
        //Llamada unica a la API para obtener los datos de los pokemon
        const allPokemon = await allPokemonData();

        //ITEM 1 -> getTotalPokemonByType
        let type = 'grass'
        getTotalPokemonByType(allPokemon, type)

        //ITEM 2 -> getPokemonMatchTypes
        let type1 = 'fire'
        let type2 = 'flying'
        getPokemonMatchTypes(allPokemon, type1, type2)

        //ITEM 3 -> getPokemonNumberByName
        let name = 'pikachu'
        getPokemonNumberByName(name)

        //ITEM 4 -> getPokemonStatsByNumber
        let number = 12
        getPokemonStatsByNumber(number);

        //ITEM 5 -> getPokemonListWithOrder
        let ids = [1, 12, 24, 25]
        let orderBy = 'weight'
        getPokemonListWithOrder(ids, orderBy)

    } catch (error) {
        console.error(error.message);
    }
}

main()