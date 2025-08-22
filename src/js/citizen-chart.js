// Citizen Chart - Donut Chart untuk Jumlah Penduduk
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("citizen-chart");

  if (ctx) {
    // Plugin untuk menambahkan teks di tengah chart
    const centerTextPlugin = {
      id: "centerText",
      afterDraw(chart, args, options) {
        const {
          ctx,
          chartArea: { left, top, width, height },
        } = chart;

        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Posisi tengah chart
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Teks "1500"
        ctx.font = "bold 24px Lexend Deca, sans-serif";
        ctx.fillStyle = "#000000";
        ctx.fillText("1500", centerX, centerY - 10);

        // Teks "Jumlah Penduduk"
        ctx.font = "14px Lexend Deca, sans-serif";
        ctx.fillStyle = "#6B7280"; // Secondary text color
        ctx.fillText("Jumlah Penduduk", centerX, centerY + 15);

        ctx.restore();
      },
    };

    const citizenChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Pria", "Wanita", "Anak-anak", "Balita"],
        datasets: [
          {
            data: [400, 300, 300, 500],
            backgroundColor: ["#34613A", "#8EBD55", "#FA7139", "#FBAD48"],
            borderWidth: 0,
            cutout: "70%", // Membuat donut chart
            spacing: 5, // Jarak antar segmen
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false, // Sembunyikan legend karena sudah ada di HTML
          },
          tooltip: {
            enabled: true, // Aktifkan tooltip
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            titleFont: {
              size: 14,
              family: "Lexend Deca, sans-serif",
            },
            bodyFont: {
              size: 12,
              family: "Lexend Deca, sans-serif",
            },
            padding: 10,
            cornerRadius: 6,
            displayColors: true,
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        elements: {
          arc: {
            borderWidth: 0,
            borderRadius: 6, // Menambahkan border radius pada setiap segmen
          },
        },
      },
      plugins: [centerTextPlugin],
    });
  }
});
