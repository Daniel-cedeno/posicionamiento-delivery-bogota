let apps = [
    { nombre: "Rappi", elo: 1000, img: "https://upload.wikimedia.org/wikipedia/commons/0/06/Rappi_logo.svg" },
    { nombre: "Didi Food", elo: 1000, img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/DiDi_Logo.svg" },
    { nombre: "Uber Eats", elo: 1000, img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Uber_Eats_2018_logo.svg" },
    { nombre: "TaDa", elo: 1000, img: "https://vico.net/vico-tad-a-9-logo.png" }
];
let a, b, myChart = null;

function nuevaRonda() {
    let i = [...Array(apps.length).keys()].sort(() => 0.5 - Math.random());
    a = apps[i[0]]; b = apps[i[1]];
    document.getElementById("name-a").innerText = a.nombre;
    document.getElementById("img-a").src = a.img;
    document.getElementById("name-b").innerText = b.nombre;
    document.getElementById("img-b").src = b.img;
}

function votar(ganador) {
    let k = 32;
    let pA = 1 / (1 + Math.pow(10, (b.elo - a.elo) / 400));
    let pB = 1 / (1 + Math.pow(10, (a.elo - b.elo) / 400));
    if (ganador === 'A') { a.elo += k*(1-pA); b.elo += k*(0-pB); }
    else { a.elo += k*(0-pA); b.elo += k*(1-pB); }
    nuevaRonda();
}

function toggleView() {
    const areaVotos = document.getElementById("voting-area");
    const areaRes = document.getElementById("results-area");
    const btn = document.getElementById("view-btn");
    if (areaRes.classList.contains("hidden")) {
        areaVotos.classList.add("hidden"); areaRes.classList.remove("hidden");
        btn.innerText = "Volver a votar"; renderizarGrafica();
    } else {
        areaVotos.classList.remove("hidden"); areaRes.classList.add("hidden");
        btn.innerText = "Analizar Data de Mercado";
    }
}

function renderizarGrafica() {
    const ctx = document.getElementById('eloChart').getContext('2d');
    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: apps.map(app => app.nombre),
            datasets: [{ label: 'Rating Elo', data: apps.map(app => app.elo), backgroundColor: '#3498db' }]
        },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false }
    });
}
nuevaRonda();
