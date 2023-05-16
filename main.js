import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";

// elements
const searchText = document.querySelector("#input");
const searchButton = document.querySelector("#searchButton");
const alternateWords = document.querySelector("#alternateWords");

//listeners
searchButton.addEventListener("click", handleSearchButton);

//helpers
async function handleSearchButton(e) {
  e.preventDefault();
  const url = `${import.meta.env.VITE_API_URL}/wordforms?word=${
    searchText.value
  }`;
  const response = await fetch(url);
  const responseData = await response.json().wordForms;
  alternateWords.value = responseData || "";
}
