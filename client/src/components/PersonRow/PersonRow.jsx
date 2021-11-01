import React from "react";
import style from "../Table/table.module.scss";

function PersonRow({ user }) {
  const arrayDaysUser = user.Days.map((el) => el);
  let hoursTimeUser = 0;
  let minuteTimeUser = 0;

  for (let i = 0; i < 31; i++) {
    const day = Number(arrayDaysUser[i]?.Date?.split("-")[2]);
    let count = 1;
    if (day !== i + count) {
      arrayDaysUser.splice(i, 0, { null: 0 });
      count++;
    }
  }

  return (
    <tr>
      <td className={style.leftColumn}>{user.Fullname}</td>
      {arrayDaysUser.map((el) => {
        if (el.Date) {
          const startTime = el.Start.split("-");
          const endTime = el.End.split("-");
          const hours = (Number(startTime[0]) - Number(endTime[0])) * -1;
          let minutes = Number(startTime[1]) - Number(endTime[1]);
          if (minutes < 0) {
            minutes = minutes * -1;
          }
          hoursTimeUser += hours;
          minuteTimeUser += minutes;
          return <td key={Math.random()}>{`${hours}h.${minutes}m`}</td>;
        }
        return <td key={Math.random()}>0</td>;
      })}
      <td className={style.rightColumn}>
        {Math.ceil(hoursTimeUser + minuteTimeUser / 60)} h.
      </td>
    </tr>
  );
}

export default PersonRow;
