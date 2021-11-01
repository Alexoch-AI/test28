
let dataJson = require("./src/data.json");
const a = dataJson.map(el => {
  let hoursTimeUser = 0;
  let minuteTimeUser = 0;
  el.Days.map(l => {
    const startTime = l.Start.split("-");
    const endTime = l.End.split("-");
    const hours = (Number(startTime[0]) - Number(endTime[0])) * -1;
    let minutes = Number(startTime[1]) - Number(endTime[1]);
    if (minutes < 0) {
      minutes = minutes * -1;
    }
    hoursTimeUser += hours
    minuteTimeUser += minutes
  })
  return { ...el, max: Math.ceil(hoursTimeUser + (minuteTimeUser / 60)) }
})
console.log(a.sort((a, b) => a.max - b.max))
