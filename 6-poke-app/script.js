async function searchPokemon() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const pokemonInfoContainer = document.getElementById("pokemonInfo");
    pokemonInfoContainer.innerHTML = "";

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
        const data = await response.json();

        const name = data.name;
        const number = data.id;
        const type = data.types.map((typeObj) => typeObj.type.name).join(", ");
        const weight = data.weight;
        const height = data.height;
        const imageUrl = data.sprites.front_default;

        const pokemonInfoHTML = `
        <h2>${name}</h2>
        <p>Número: ${number}</p>
        <p>Tipo: ${type}</p>
        <p>Peso: ${weight / 10} kg</p>
        <p>Altura: ${height / 10} m</p>
        <img src="${imageUrl}" alt="${name}">
      `;

        pokemonInfoContainer.innerHTML = pokemonInfoHTML;
    } catch (error) {
        pokemonInfoContainer.innerHTML = "<p>Pokémon no encontrado.</p>";
    }
}
