const apiKey = "7973f2c15bc8741d52b0a5f0ef5bb2ee";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorText = document.querySelector(".error");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();

    errorText.style.display = 'none';
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    const weatherCondition = data.weather[0].main;
    weatherIcon.src = `imgs/${weatherCondition.toLowerCase()}.png`;
  } catch (error) {
    errorText.style.display = 'block';
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

checkWeather('Medina');
