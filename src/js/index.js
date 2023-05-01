"use strict";
import "../sass/main.scss";
import data1 from "../data/data.json";
import data2 from "../data/data2.json";
import data3 from "../data/data3.json";

const chartContainer = document.querySelector(".chart-container");

//Dark mode veriables
const darkModeToggle = document.getElementById("dark-mode-checkbox");
const root = document.documentElement;
//////////////////////////////////
//dark mode feature
//////////////////
const darkMode = function () {
  root.classList.toggle("dark-mode", darkModeToggle.checked);
  localStorage.setItem("darkMode", darkModeToggle.checked ? "on" : "off");
};

darkModeToggle.addEventListener("change", darkMode);
window.addEventListener("load", function () {
  darkModeToggle.checked = localStorage.getItem("darkMode") === "on";
  darkMode();
});
//////////////////////////////
/////////////////////////////
const today = new Date()
  .toLocaleString("en-us", { weekday: "long" })
  .toLowerCase()
  .slice(0, 3);
const allEl = Array.from(chartContainer.children);

allEl.find((el) => el.classList.contains(today)).classList.add("current");
////////////////

const renderData = function (data) {
  let total = 0;
  let allAmounts = [];

  data.forEach((am) => {
    //Adding the total amounts for sevent days
    total = total + am.amount;
    //Storing all amounts
    allAmounts.push(am.amount);
  });

  const maxValue = Math.max(...allAmounts);

  for (let i = 0; i < allEl.length; i++) {
    const day = allEl[i].classList[1];
    const dataForDay = data.find((each) => each.day === day);
    allEl[i].dataset.amount = `$${dataForDay.amount}`;

    const height = (dataForDay.amount / maxValue) * 100;
    allEl[i].style.height = `0%`;
    setTimeout(() => {
      allEl[i].style.height = `${height}%`;
    }, 200);
  }
};

////////////////

const btnData1 = document.getElementById("btn-demo-1");
const btnData2 = document.getElementById("btn-demo-2");
const btnData3 = document.getElementById("btn-demo-3");

fetch(data1)
  .then((response) => response.json())
  .then((data) => {
    renderData(data);
  })
  .catch((error) => {
    console.error(error);
  });

btnData1.addEventListener("click", function () {
  fetch(data1)
    .then((response) => response.json())
    .then((data) => {
      renderData(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

btnData2.addEventListener("click", function () {
  fetch(data2)
    .then((response) => response.json())
    .then((data) => {
      renderData(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

btnData3.addEventListener("click", function () {
  fetch(data3)
    .then((response) => response.json())
    .then((data) => {
      renderData(data);
    })
    .catch((error) => {
      console.error(error);
    });
});
