let scale = 100;

let chart_options = (scale) => ({
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: -scale,
          suggestedMax: scale,
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
          display: false,
        },
      },
    ],
  },
});

let chartData = (data, color, person) => {
  if (person) {
    scale = person == 1 ? 100 : 800;
  }
  console.log(scale);
  let __options = chart_options(scale);
  return {
    data: (canvas) => {
      let _color = color ? "red" : "green";

      let ctx = canvas.getContext("2d");

      let colors = {
        green: {
          color_1: "rgba(46, 204, 113,0.2)",
          color_2: "rgba(46, 204, 113,0)",
          color: "rgba(46, 204, 113,1)",
        },
        red: {
          color_1: "rgba(231, 76, 60,0.2)",
          color_2: "rgba(231, 76, 60,0)",
          color: "rgba(231, 76, 60,1)",
        },
      };

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, colors[_color].color_1);
      gradientStroke.addColorStop(0.4, colors[_color].color_2);
      gradientStroke.addColorStop(0, colors[_color].color_2);
      return {
        labels: data,
        datasets: [
          {
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: colors[_color].color,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: colors[_color].color,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: colors[_color].color,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 1,
            data: data,
          },
        ],
      };
    },
    options: __options,
  };
};

module.exports = {
  chartData,
};
