//Function to display the city and temperature
function getWeather(response) {
  let temperatureElement = document.querySelector(
    "#current-temperature-temperature"
  );
  let cityTemperature = Math.round(response.data.temperature.current);
  let city = document.querySelector("#current-city");
  let description = document.querySelector("#weather-despcripton");
  let humidity = document.querySelector("#humidity-percentage");
  let wind = document.querySelector("#wind-speed");
  let DateTime = document.querySelector("#current-date");
  let icon = document.querySelector("#icon");

  DateTime.innerHTML = actualDate(new Date());
  city.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(cityTemperature);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`;

  getForecast(response.data.city);
}

//Function to search the city
function searchCity(cityValue) {
  //Connection to the API to get the weather information from the city entered.
  let apiKey = "19e9ee9138td443ob800fc47e41a5774";
  let unit = "metric";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}&units=${unit}`;

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
searchCity("Mexico City");
displayForecast();

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

//Function to get the forecast data
function getForecast(cityValue) {
  //Connection to the API to get the weather information from the city entered.
  let apiKey = "19e9ee9138td443ob800fc47e41a5774";
  let unit = "metric";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityValue}&key=${apiKey}&units=${unit}`;

  axios.get(apiURL).then(displayForecast);
}

//Function to get the upcoming day
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

//Function for the week weather forecast
function displayForecast(response) {
  //This will help us to do the loop for each, to display the days
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url} class="weather-forecast-icon"/>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°</div> 
          </div>
        </div>`;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}
