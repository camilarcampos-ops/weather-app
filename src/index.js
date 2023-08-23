function updateTime() {
  let now = new Date();
  let h2 = document.querySelector("#date"); // Update the selector to match your HTML
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = now.getHours();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  h2.innerHTML = `${day}, ${date} ${month} ${hours}:${minutes}`;
}

updateTime();

setInterval(updateTime, 60000);

// Define a function to display the weather forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="https://openweathermap.org/img/wn/50d.png" // Update this URL
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//function search(event)

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  getCity(cityInput.value);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", search);

//Format Weather

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let description = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;

  let locationTemp = document.querySelector("#temperature");
  locationTemp.innerHTML = temperature;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name.toUpperCase();

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = windSpeed;

  let descriptionElement = document.querySelector("#temperature-description");
  descriptionElement.innerHTML = description.toUpperCase();

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}.png` // Use the correct icon URL
  );

  displayForecast(); // Call the displayForecast function here to display the forecast
}

//Format Search Engine Functions

function handleCity(event) {
  let cityInput = document.querySelector("#city-input");
  getCity(cityInput.value);
}

function getCity(city) {
  let apiKey = "e847656cc28a6e5bb451821d4153d52f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios
    .get(apiUrl)
    .then(showTemperature)
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

// Format Current Button
function retrievePosition(position) {
  let apiKey = "e847656cc28a6e5bb451821d4153d52f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", handleLocation);

// Format Degrees °C to °F
let celsiusTemperature = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function fetchDefaultTemperature() {
  let defaultCity = "Vancouver";
  getCity(defaultCity);
}

fetchDefaultTemperature();
