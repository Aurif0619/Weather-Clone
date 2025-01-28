const apiKey = "7973f2c15bc8741d52b0a5f0ef5bb2ee";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }

        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "imgs/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "imgs/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "imgs/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "imgs/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "imgs/mist.png";
        }

    } catch (error) {
        console.error(error);
        alert('Error fetching weather data: ' + error.message);
    }
}

function handleSearch() {
    checkWeather(searchBox.value);
}

searchBtn.addEventListener("click", handleSearch);

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});

checkWeather('Medina');
