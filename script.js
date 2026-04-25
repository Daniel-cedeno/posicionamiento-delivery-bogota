// 1. Base de Datos de Películas (Catálogo inicial de 50 películas)
const catalogo = [
    { titulo: "Inception", genero: "Sci-Fi", poster: "Inception" },
    { titulo: "El Padrino", genero: "Drama", poster: "El+Padrino" },
    { titulo: "The Dark Knight", genero: "Acción", poster: "Dark+Knight" },
    { titulo: "Interstellar", genero: "Sci-Fi", poster: "Interstellar" },
    { titulo: "Pulp Fiction", genero: "Crimen", poster: "Pulp+Fiction" },
    { titulo: "Matrix", genero: "Sci-Fi", poster: "Matrix" },
    { titulo: "El Señor de los Anillos", genero: "Fantasía", poster: "LotR" },
    { titulo: "Forrest Gump", genero: "Drama", poster: "Forrest+Gump" },
    { titulo: "Star Wars: Ep. V", genero: "Sci-Fi", poster: "Star+Wars" },
    { titulo: "Jurassic Park", genero: "Aventura", poster: "Jurassic+Park" },
    { titulo: "Avengers: Endgame", genero: "Acción", poster: "Avengers" },
    { titulo: "El Club de la Pelea", genero: "Drama", poster: "Fight+Club" },
    { titulo: "Gladiador", genero: "Acción", poster: "Gladiador" },
    { titulo: "Titanic", genero: "Romance", poster: "Titanic" },
    { titulo: "Avatar", genero: "Sci-Fi", poster: "Avatar" },
    { titulo: "El Rey León", genero: "Animación", poster: "Rey+Leon" },
    { titulo: "Terminator 2", genero: "Acción", poster: "Terminator+2" },
    { titulo: "Volver al Futuro", genero: "Sci-Fi", poster: "Back+Future" },
    { titulo: "El Resplandor", genero: "Terror", poster: "Resplandor" },
    { titulo: "Alien", genero: "Terror", poster: "Alien" },
    { titulo: "Toy Story", genero: "Animación", poster: "Toy+Story" },
    { titulo: "Coco", genero: "Animación", poster: "Coco" },
    { titulo: "Spirited Away", genero: "Animación", poster: "Spirited" },
    { titulo: "Parasite", genero: "Thriller", poster: "Parasite" },
    { titulo: "Joker", genero: "Drama", poster: "Joker" },
    { titulo: "Spider-Man: No Way Home", genero: "Acción", poster: "Spider-Man" },
    { titulo: "Mad Max: Fury Road", genero: "Acción", poster: "Mad+Max" },
    { titulo: "John Wick", genero: "Acción", poster: "John+Wick" },
    { titulo: "Dune", genero: "Sci-Fi", poster: "Dune" },
    { titulo: "Blade Runner 2049", genero: "Sci-Fi", poster: "Blade+Runner" },
    { titulo: "Whiplash", genero: "Drama", poster: "Whiplash" },
    { titulo: "La La Land", genero: "Romance", poster: "La+La+Land" },
    { titulo: "Se7en", genero: "Crimen", poster: "Se7en" },
    { titulo: "El Silencio de los Inocentes", genero: "Thriller", poster: "Silence" },
    { titulo: "Get Out", genero: "Terror", poster: "Get+Out" },
    { titulo: "Hereditary", genero: "Terror", poster: "Hereditary" },
    { titulo: "Django Unchained", genero: "Western", poster: "Django" },
    { titulo: "Braveheart", genero: "Acción", poster: "Braveheart" },
    { titulo: "Indiana Jones", genero: "Aventura", poster: "Indiana+Jones" },
    { titulo: "E.T. el Extraterrestre", genero: "Sci-Fi", poster: "ET" },
    { titulo: "Harry Potter y la Piedra Filosofal", genero: "Fantasía", poster: "Harry+Potter" },
    { titulo: "Deadpool", genero: "Comedia", poster: "Deadpool" },
    { titulo: "Superbad", genero: "Comedia", poster: "Superbad" },
    { titulo: "The Hangover", genero: "Comedia", poster: "Hangover" },
    { titulo: "Shrek", genero: "Animación", poster: "Shrek" },
    { titulo: "Catch Me If You Can", genero: "Drama", poster: "Catch+Me" },
    { titulo: "The Wolf of Wall Street", genero: "Comedia", poster: "Wolf+Wall+St" },
    { titulo: "Rocky", genero: "Drama", poster: "Rocky" },
    { titulo: "Casino Royale", genero: "Acción", poster: "Casino+Royale" },
    { titulo: "Misión Imposible: Fallout", genero: "Acción", poster: "Fallout" }
];

// Inicializamos el rating Elo de todas las películas en 1000
let peliculas = catalogo.map(p => ({
    ...p,
    elo: 1000,
    img: `https://placehold.co/200x300/222222/ffffff?text=${p.poster}`
}));

// Variables de estado
let peliA, peliB;
let totalVotos = 0;
const K = 32; // Factor de sensibilidad del algoritmo Elo

// 2. Función para seleccionar dos películas aleatorias
function nuevaRonda() {
    let indices = [];
    while (indices.length < 2) {
        let r = Math.floor(Math.random() * peliculas.length);
        if (indices.indexOf(r) === -1) indices.push(r);
    }
    
    peliA = peliculas[indices[0]];
    peliB = peliculas[indices[1]];
    
    // Actualizar el DOM (Interfaz)
    document.getElementById("title-a").innerText = peliA.titulo;
    document.getElementById("genre-a").innerText = peliA.genero;
    document.getElementById("img-a").src = peliA.img;
    
    document.getElementById("title-b").innerText = peliB.titulo;
    document.getElementById("genre-b").innerText = peliB.genero;
    document.getElementById("img-b").src = peliB.img;
}

// 3. Lógica Matemática del Algoritmo Elo
function votar(ganador) {
    // Calcular probabilidades de victoria
    let probA = 1 / (1 + Math.pow(10, (peliB.elo - peliA.elo) / 400));
    let probB = 1 / (1 + Math.pow(10, (peliA.elo - peliB.elo) / 400));

    // Actualizar ratings basados en el ganador (A o B)
    if (ganador === 'A') {
        peliA.elo += K * (1 - probA);
        peliB.elo += K * (0 - probB);
    } else {
        peliA.elo += K * (0 - probA);
        peliB.elo += K * (1 - probB);
    }
    
    // Incrementar contador y pasar a la siguiente ronda
    totalVotos++;
    document.getElementById("vote-count").innerText = totalVotos;
    nuevaRonda();
}

// 4. Navegación entre el Feed y los Resultados
function toggleView() {
    const feedArea = document.getElementById("feed-section");
    const profileArea = document.getElementById("profile-section");
    const btn = document.getElementById("btn-view");

    if (profileArea.classList.contains("hidden")) {
        // Mostrar Resultados
        feedArea.classList.add("hidden");
        profileArea.classList.remove("hidden");
        btn.innerHTML = '<i class="fas fa-home"></i> Volver al Feed';
        generarTop10();
    } else {
        // Volver a Votar
        feedArea.classList.remove("hidden");
        profileArea.classList.add("hidden");
        btn.innerHTML = '<i class="fas fa-star"></i> Mi Top 10';
    }
}

// 5. Generar la lista de recomendaciones (Ranking)
function generarTop10() {
    const contenedorLista = document.getElementById("recommendations-list");
    
    // Ordenar de mayor a menor Elo y tomar las 10 mejores
    const top10 = [...peliculas].sort((a, b) => b.elo - a.elo).slice(0, 10);
    
    contenedorLista.innerHTML = top10.map((peli, index) => `
        <div class="rank-item">
            <div class="rank-number">${index + 1}</div>
            <img src="${peli.img}" alt="${peli.titulo}" class="rank-poster">
            <div class="rank-details">
                <h4>${peli.titulo}</h4>
                <span class="genre">${peli.genero}</span>
            </div>
            <div class="rank-score">
                <i class="fas fa-fire" style="color: #e74c3c;"></i> ${Math.round(peli.elo)} pts
            </div>
        </div>
    `).join("");
}

// Iniciar la primera ronda al cargar la página
nuevaRonda();
