"use strict";
import "../sass/main.scss";

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
