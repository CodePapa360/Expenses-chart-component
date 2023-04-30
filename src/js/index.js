"use strict";
import "../sass/main.scss";

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
