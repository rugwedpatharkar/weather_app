const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "e383a51cd88ebd04d15807989d734a59";

// Initially hide the card
card.style.display = "none";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a valid city name!");
  }
});

async function getWeatherData(city) {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Couldn't get weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  // Show the card
  card.style.display = "block";

  card.textContent = "";
  const cityDisplay = document.createElement("h2");
  const tempDisplay = document.createElement("h3");
  const humidityDisplay = document.createElement("h4");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
  humidityDisplay.textContent = `Humidity: ${humidity}`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityName");
  tempDisplay.classList.add("temp");
  humidityDisplay.classList.add("weather");
  descDisplay.classList.add("description");
  weatherEmoji.classList.add("emoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 500:
      return "⛈️";
    case weatherId >= 500 && weatherId < 600:
      return "⛈️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "⛅";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";

  card.appendChild(errorDisplay);
}
