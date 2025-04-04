<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";

    let chart;
    let toolData = [];

    // Adatok lekérése az API-ból
    async function fetchData() {
        const res = await fetch("/statistic"); // API hívás
        toolData = await res.json();

        renderChart();
    }

    function renderChart() {
        if (chart) {
            chart.destroy(); // Ha létezik, először töröljük a régi chartot
        }

        const ctx = document.getElementById("toolChart").getContext("2d");

        chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: toolData.map(d => d.user_name), // Felhasználók nevei
                datasets: [{
                    label: "Felhasználóhoz tartozó eszközök",
                    data: toolData.map(d => d.tool_count), // Eszközök száma
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgb(54, 162, 235)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    onMount(fetchData); // Betöltéskor futtatjuk az adatok lekérését
</script>

<main>
    <h1>Statisztika</h1>
    <canvas id="toolChart"></canvas>
</main>
