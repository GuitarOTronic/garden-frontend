export const getGreenhouseTemp = async (cb) => {
  const request = new Request("http://192.168.1.3:8081/temperature/current")
  try {
    fetch(request)
      .then(res => {
        return res.json()
      })
      .then((data) => {
        cb(data.currentTemp)
      })
  }
  catch (err) {
    console.error(err);
  }
}