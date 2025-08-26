const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetail = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const searchInput = document.querySelector('.search-box input'); // input field

// Main function
function getWeather() {
    const APIkey = 'aabba02632ba1d7d413047df023f8ec4';
    const City = searchInput.value;

    if (City === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '404px';
                weatherBox.classList.remove('active');
                weatherDetail.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '554px';
            weatherBox.classList.add('active');
            weatherDetail.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .discription'); // keep class as in HTML
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear-sky.png';
                    break;
                case 'Rain':
                    image.src = 'thunder.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':
                    image.src = 'clouds.png';
                    break;
                case 'Mist':
                    image.src = 'mist.png';
                    break;
                case 'Haze':
                    image.src = 'foggy.png';
                    break;
                default:
                    image.src = 'Sun-weather.jpg';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        });
}

// 🔹 Button click event
search.addEventListener('click', getWeather);

// 🔹 Enter key event
searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});
