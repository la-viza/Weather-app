// Feature #1
let now = new Date();
let update = document.querySelector("#up-date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];
let currentHr = now.getHours();
let currentMin = now.getMinutes();

update.innerHTML = `last updated: ${currentDay}, ${currentHr}:${currentMin}`;

function showWeather(response) {
  document.querySelector("#heading").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `💧 Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `💨 Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "15af5a3ccf0340783b542c810542f065";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

let form = document.querySelector("#seacrh-form");
form.addEventListener("submit", submitCity);

function showLocation(position) {
  let apiKey = "15af5a3ccf0340783b542c810542f065";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlLocation).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
let button = document.querySelector("#current-location-btn");
button.addEventListener("click", getCurrentPosition);

searchCity("Toronto");
