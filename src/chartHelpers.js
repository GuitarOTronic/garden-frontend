export const ONE_WEEK = 24 * 60 * 60 * 1000 * 7;

export function formatChartData (data) {
  const greenhouseTemp = [];
  const openWeatherTemp = [];
  data.forEach(datum => {
    if(datum.temp !== "NaN" && datum.openWeatherTemp !== "NaN") {
      const date = new Date(datum.date);
      greenhouseTemp.push({
        key: "Clotch",
        value: parseInt(parseInt(datum.temp, 10).toFixed(0), 10),
        date
      });
      openWeatherTemp.push({
        key: "Outdoor",
        value: parseInt(parseInt(datum.openWeatherTemp, 10).toFixed(0), 10),
        date
      })
    }
  })
console.log([greenhouseTemp, openWeatherTemp])
  return [greenhouseTemp, openWeatherTemp];
}
