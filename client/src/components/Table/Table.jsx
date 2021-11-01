import React, { useState } from "react";
import ModalAddItem from "../ModalAddItem/ModalAddItem";
import PersonRow from "../PersonRow/PersonRow";
import style from "./table.module.scss";
let dataJson = require("../../data.json");

function Table() {
  const [modalActive, setModalActive] = useState(false);

  const [modalData, setModalData] = useState({
    covid: null,
    el: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [countResolve, setCountResolve] = useState(10);

  const countPages = Math.ceil(dataJson.length / 10);

  const arrayPages = [];
  for (let i = 1; i <= countPages; i++) {
    arrayPages.push(i);
  }

  const monthDay = [];
  for (let i = 1; i <= 31; i++) {
    monthDay.push(i);
  }

  const clickHandler = async (el) => {
    const a = await fetch(
      `https://covid-19-data.p.rapidapi.com/report/country/name?name=russia&date=2020-05-${el}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key":
            "f7e5129388mshd71bc2096ae46c7p15f887jsn533233b1a6c2",
        },
      }
    );
    let serverresponse = await a.json();
    setModalData({ covid: serverresponse[0]?.provinces[0], el: el });
    setModalActive(true);
  };

  const paggHandler = (el) => {
    setCurrentPage(el);
    setCountResolve(el * 10);
  };

  return (
    <>
      <div className={style.main}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {monthDay.map((el) => (
                <th
                  className={style.modd}
                  onClick={() => clickHandler(el)}
                  key={el}
                >
                  {el}
                </th>
              ))}
              <th className={style.rightColumn}>Monthly total</th>
            </tr>
          </thead>
          <tbody>
            {dataJson.slice(countResolve - 10, countResolve).map((el, i) => (
              <PersonRow key={el.id} user={el} index={i} />
            ))}
          </tbody>
        </table>
        <ModalAddItem active={modalActive} setActive={setModalActive}>
          <p>
            На 2020.05.{modalData?.el} в России обнаружено: подтверждено -{" "}
            {modalData?.covid?.confirmed}, вылечено -{" "}
            {modalData?.covid?.recovered}, умерло - {modalData?.covid?.deaths},
            болеет - {modalData?.covid?.active}
          </p>
        </ModalAddItem>
      </div>
      <div className={style.paggDiv}>
        {arrayPages.map((el, index) => (
          <span
            onClick={() => paggHandler(el)}
            className={currentPage === el ? style.pagg__active : style.pagg}
            key={index}
          >
            {el}
          </span>
        ))}
      </div>
    </>
  );
}

export default Table;
