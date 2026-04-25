let apps = [
    { nombre: "Rappi", elo: 1000 },
    { nombre: "Didi Food", elo: 1000 },
    { nombre: "Uber Eats", elo: 1000 },
    { nombre: "TaDa", elo: 1000 }
];

let a, b;

function nuevaRonda() {
    let indices = [...Array(apps.length).keys()].sort(() => 0.5 - Math.random());
    a = apps[indices[0]];
    b = apps[indices[1]];
    document.getElementById("app-a").innerText = a.nombre;
    document.getElementById("app-b").innerText = b.nombre;
}

function votar(ganador) {
    let k = 32;
    let probA = 1 / (1 + Math.pow(10, (b.elo - a.elo) / 400));
    let probB = 1 / (1 + Math.pow(10, (a.elo - b.elo) / 400));

    if (ganador === 'A') {
        a.elo += k * (1 - probA);
        b.elo += k * (0 - probB);
    } else {
        a.elo += k * (0 - probA);
        b.elo += k * (1 - probB);
    }
    nuevaRonda();
}

function verRanking() {
    document.getElementById("duelo").classList.add("hidden");
    document.getElementById("ranking").classList.remove("hidden");
    let lista = document.getElementById("lista-ranking");
    lista.innerHTML = apps.sort((x, y) => y.elo - x.elo)
        .map((app, i) => `<p>${i+1}. ${app.nombre} - <strong>${Math.round(app.elo)}</strong></p>`).join("");
}

function cerrarRanking() {
    document.getElementById("ranking").classList.add("hidden");
    document.getElementById("duelo").classList.remove("hidden");
}

nuevaRonda();
