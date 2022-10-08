const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const cajaPokemon = document.getElementById("cajaPokemon");
const inputPokemon = document.getElementById("inputpokemon");
const submitPoke = document.getElementById("submit-poke");
const formulario = document.getElementById("form-poke");
const anteriorPoke = document.getElementById("anterior");
const siguientePoke = document.getElementById("siguiente");


const extraerPokemon = async (input) => {
try {
    
    let response = await fetch (`https://pokeapi.co/api/v2/pokemon/${input}`);

    let data = await response.json();
    
    return data;

} 
    
    catch (error) {
        cajaPokemon.classList.add("error");
        cajaPokemon.innerHTML = `<p class="mensaje">Este ID no pertenece a ningún Pokemon.</p>`
    }
}



const renderizarPokemon = (data) => {

return  cajaPokemon.innerHTML = `
<div class="toda-lacard">

<div class="card-conteiner">
<img class="imagen-pokemon" src="${data.sprites.other.home.front_default}" alt="img-pokemon">

<h2>${data.name} </h2>
<p class="id-pokemon">🆔#${data.id}</p>

<div class="titleandphoto">

<h3><img class="logo-hp" src="./vida.png" alt="img-hp"> HP: ${data.base_experience}</h3>
<h3><img class="logo-height" src="./altura.png" alt="img-height">Height: ${data.height / 10}MTS</h3>
<h3><img class="logo-Weight" src="./peso.png" alt="img-Weight">Weight: ${data.weight / 10}kg</h3>
<h3><img class="logo-Type" src="./estrella.png" alt="img-Type"> Type: ${data.types.map((tipo) => `<span class="${tipo.type.name} poke-tipo">${tipo.type.name}</span>`).join('')}</h3></div></div>`
}




const ahoraRenderizar = async (input) => {

    if (input === '') {

        cajaPokemon.classList.add("error");
        cajaPokemon.innerHTML = `<p>Ingrese un número</p>`
        return;

    }
    else{
            cajaPokemon.classList.remove("error");
}
    


   
    let masData = await extraerPokemon(input);

    if (!masData) {

        return;
    }
    renderizarPokemon(masData);
    localStorage.setItem("Pokemon", []);
    localStorage.setItem("Pokemon", JSON.stringify(masData));
    

    }
    
    const anteriorPokemon = () => {
        const anterior = +inputPokemon.value;
        inputPokemon.value = (anterior - 1).toString();
        submitPoke.click();
    }
    const siguientePokemon = () => {
        const siguiente = +inputPokemon.value;
        inputPokemon.value = (siguiente + 1).toString();
        submitPoke.click();
    }




    const submitearFormulario = (e) => {

        e.preventDefault();

        
        let inputPokemons = inputPokemon.value;
        ahoraRenderizar(inputPokemons);
    }

    const init = () => {

        siguiente.addEventListener("click", siguientePokemon);
        anterior.addEventListener("click", anteriorPokemon);


        formulario.addEventListener("submit", submitearFormulario);
        
        if (localStorage.getItem("Pokemon")) {

            
            
            let datos = JSON.parse(localStorage.getItem("Pokemon"));
           
            renderizarPokemon(datos);
        }
    }

    init ();