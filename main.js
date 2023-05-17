import "./style.css";

// elements
const searchBar = document.querySelector("#input");
const searchButton = document.querySelector("#searchButton");
const alternateWords = document.querySelector("#alternateWords");

//listeners
searchButton.addEventListener("click", handleSearchButton);
searchBar.addEventListener("input", handleSearchInput);

//helpers
async function handleSearchButton(e) {
  e.preventDefault();
  const url = `${import.meta.env.VITE_API_URL}/wordforms?word=${
    searchBar.value
  }`;
  const response = await fetch(url);
  const responseData = await response.json();
  alternateWords.innerHTML = responseData.wordForms || "No forms found";
}

function handleSearchInput() {
  alternateWords.innerHTML = "";
}
