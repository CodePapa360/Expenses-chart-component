"use strict";
import "../sass/main.scss";
import data1 from "../data/data1.json";
import data2 from "../data/data2.json";
import data3 from "../data/data3.json";

const chartContainer = document.querySelector(".chart-container");
const btnData1 = document.getElementById("btn-demo-1");
const btnData2 = document.getElementById("btn-demo-2");
const btnData3 = document.getElementById("btn-demo-3");

//Dark mode veriables
const darkModeToggle = document.getElementById("dark-mode-checkbox");
const root = document.documentElement;

//////////////////////////////
/////////////////////////////
// Get today's day name, in lowercase, and abbreviation
const today = new Date()
  .toLocaleString("en-us", { weekday: "long" })
  .toLowerCase()
  .slice(0, 3);

// Convert the chart container element's children to an array
const allEl = Array.from(chartContainer.children);

// Find the element that corresponds to today's day and add the "current" class to it
allEl.find((el) => el.classList.contains(today)).classList.add("current");

////////////////
///////////////
// This function takes the data as parameter and renders it in the chart.
const renderData = function (data) {
  let total = 0;
  let allAmounts = [];

  // Calculates the total amount of data and stores all the amounts in an array.
  data.forEach((am) => {
    total = total + am.amount;
    allAmounts.push(am.amount);
  });

  // Calculates the maximum value of the data.
  const maxValue = Math.max(...allAmounts);

  // Loops through all the days in the chart and sets the data and height values.
  for (let i = 0; i < allEl.length; i++) {
    // Gets the day of the current element.
    const day = allEl[i].classList[1];

    // Finds the data for the current day and sets it to the dataset attribute of the element.
    const dataForDay = data.find((each) => each.day === day);
    allEl[i].dataset.amount = `$${dataForDay.amount}`;

    // Calculates the height of the bar for the current day and sets it as the style attribute.
    const height = (dataForDay.amount / maxValue) * 100;
    allEl[i].style.height = `0%`;

    setTimeout(() => {
      allEl[i].style.height = `${height}%`;
    }, 200);
  }
};

////////////////
// Define a function to fetch data from the provided URL
const fetchData = function (url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Call renderData function and pass the data as an argument
      renderData(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Call the fetchData function with the data1 URL when the page loads
fetchData(data1);

// Add an event listener to the buttons that calls the fetchData function with the respective URLs
btnData1.addEventListener("click", function () {
  fetchData(data1);
});

btnData2.addEventListener("click", function () {
  fetchData(data2);
});

btnData3.addEventListener("click", function () {
  fetchData(data3);
});

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
