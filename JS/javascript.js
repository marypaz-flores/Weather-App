//Function to display the city and temperature
function getWeather(response) {
  let temperatureElement = document.querySelector(
    "#current-temperature-temperature"
  );
  let cityTemperature = Math.round(response.data.temperature.current);
  let city = document.querySelector("#current-city");

  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(cityTemperature);
}

//Function to search the city
function searchCity(cityValue) {
  //Connection to the API to get the weather information from the city entered.
  let apiKey = "19e9ee9138td443ob800fc47e41a5774";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}`;

  axios.get(apiURL).then(getWeather);
}

//Function to handle the submit button
function handleButtonSubmit(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#search-city");
  searchCity(cityDisplay.value);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleButtonSubmit);

//When the page is run by the first time and no city has been searched so far we'll going to display a default city information
searchCity("Mexico");

//Function to get the actual date and time for the main screen
function actualDate() {
  let daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date();

  let currentDay = daysList[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formatDate = `${currentDay} ${currentHour}:${currentMinutes}`;

  return formatDate;
}

let DateTime = document.querySelector("#current-date");
DateTime.innerHTML = actualDate(new Date());
