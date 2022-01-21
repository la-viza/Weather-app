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
if (currentHr<10) {
currentHr = `0${currentHr}`;
}
let currentMin = now.getMinutes();
if (currentMin<10) {
currentMin = `0${currentMin}`;
}
update.innerHTML = `last updated: ${currentDay}, ${currentHr}:${currentMin}`;

function displayForecast() {
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
let days = ["Sat", "Sun", "Mon","Tue", "Wed", "Thu"];
days.forEach(function (day) {
forecastHTML = 
forecastHTML +
`
   <div class="col">
                <i class="fas fa-cloud fa-2x icon"></i>
                  <h5 class="card-title">${day}</h5>
                  <span class="card-text">
                    0°/-5 °C <br />
                    32°/23 °F
                  </span>
        </div>
       
`;
})

forecastHTML=forecastHTML+`</div>`;
forecastElement.innerHTML= forecastHTML;
}


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
    let iconElement = document.querySelector ("#main-icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    
    celsiusTemperature = response.data.main.temp;
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

function displayFahrenheitTemperature(event) {
event.preventDefault();
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
let temperatureElement = document.querySelector ("#temperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector ("#temperature");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);  
}


let celsiusTemperature=null;

let button = document.querySelector("#current-location-btn");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Toronto");
displayForecast();