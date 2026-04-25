// Base de datos con logos reales
let apps = [
    { nombre: "Rappi", elo: 1000, img: "https://upload.wikimedia.org/wikipedia/commons/0/06/Rappi_logo.svg" },
    { nombre: "Didi Food", elo: 1000, img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/DiDi_Logo.svg" },
    { nombre: "Uber Eats", elo: 1000, img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Uber_Eats_2018_logo.svg" },
    { nombre: "TaDa", elo: 1000, img: "https://vico.net/vico-tad-a-9-logo.png" }
];

let a, b;
let totalVotos = 0;
let myChart = null;

function nuevaRonda() {
    let indices = [...Array(apps.length).keys()].sort(() => 0.5 - Math.random());
    a = apps[indices[0]];
    b = apps[indices[1]];
    
    document.getElementById("name-a").innerText = a.nombre;
    document.getElementById("img-a").src = a.img;
    document.getElementById("name-b").innerText = b.nombre;
    document.getElementById("img-b").src = b.img;
}

function votar(ganador) {
    let k = 40; // Mayor sensibilidad para marketing
    let probA = 1 / (1 + Math.pow(10, (b.elo - a.elo) / 400));
    let probB = 1 / (1 + Math.pow(10, (a.elo - b.elo) / 400));

    if (ganador === 'A') {
        a.elo += k * (1 - probA);
        b.elo += k * (0 - probB);
    } else {
        a.elo += k * (0 - probA);
        b.elo += k * (1 - probB);
    }
    
    totalVotos++;
    document.getElementById("vote-count").innerText = totalVotos;
    nuevaRonda();
}

function toggleView() {
    const areaVotos = document.getElementById("voting-area");
    const areaResultados = document.getElementById("results-area");
    const btn = document.getElementById("view-btn");

    if (areaResultados.classList.contains("hidden")) {
        areaVotos.classList.add("hidden");
        areaResultados.classList.remove("hidden");
        btn.innerText = "Regresar a Recolección de Datos";
        renderizarGrafica();
        actualizarTabla();
    } else {
        areaVotos.classList.remove("hidden");
        areaResultados.classList.add("hidden");
        btn.innerText = "Analizar Data de Mercado";
    }
}

function renderizarGrafica() {
    const ctx = document.getElementById('eloChart').getContext('2d');
    const labels = apps.map(app => app.nombre);
    const data = apps.map(app => app.elo);

    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rating de Preferencia (Elo)',
                data: data,
                backgroundColor: '#3498db',
                borderRadius: 5
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function actualizarTabla() {
    const tbody = document.getElementById("table-body");
    const sorted = [...apps].sort((x, y) => y.elo - x.elo);
    tbody.innerHTML = sorted.map((app, i) => `
        <tr>
            <td>#${i+1}</td>
            <td><strong>${app.nombre}</strong></td>
            <td>${Math.round(app.elo)}</td>
            <td><span style="color:${i < 2 ? '#27ae60' : '#e67e22'}">${i < 2 ? 'Líder' : 'Competidor'}</span></td>
        </tr>
    `).join("");
}

nuevaRonda();
