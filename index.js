const weatherForm = document.querySelector(".searchForm");
const cityInput = document.getElementById('cityInput');
const weather = document.querySelector(".container");
const apikey = "";
const errorMessage = document.getElementById('error-message');
let timeoutId; 

document.querySelector(".searchForm").addEventListener("submit", async event =>{ 
  event.preventDefault();
  const city = cityInput.value.trim();
   if (!city) {
        displayError("Please enter a city!");
        return;
    }

     try{
      const weatherData = await getWeatherData(city);
      displayWeather(weatherData);
     }catch{
      displayError("City not found!");
     }
    });
async function getWeatherData(city) {  
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
;
   const response = await fetch(apiUrl);
   const data = await response.json();
   console.log(data);
    if (data.cod === "404") {
        throw new Error("City not found");
    }
   return data;
};

function displayWeather(data){
   
  const {name : city ,
          main : {temp , humidity} ,
          weather: [{description, icon}],
          wind : {speed}} = data;
    
  const cityDisplay = document.querySelector(".city");
  const tempDisplay = document.querySelector(".temp");
  const descDisplay = document.querySelector(".description");
  const humidityDisplay = document.querySelector(".humidity");
  const windDisplay = document.querySelector(".wind");
  const iconDisplay = document.querySelector(".img");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp.toFixed(1)}°C`;
    descDisplay.textContent = description ;
    humidityDisplay.textContent = `${humidity}%`;
    windDisplay.textContent = `${(speed * 3.6).toFixed(1)} km/h`;
    iconDisplay.src = getMySVG(icon);

}

function getWeatherEmoji(weatherId){

}

function displayError(message) {
    if (timeoutId) clearTimeout(timeoutId);

    errorMessage.textContent = message; 
    errorMessage.classList.add("show");

    timeoutId = setTimeout(() => {
        errorMessage.classList.remove("show");
    }, 5000);
}

function getMySVG(iconCode) {

    const iconsMap = {
        "01d": "picture/animated/day.svg",
        "01n": "picture/animated/night.svg",

        "02d": "picture/animated/cloudy-day-1.svg",
        "02n": "picture/animated/cloudy-night-1.svg",

        "03d": "picture/animated/cloudy-day-2.svg",
        "03n": "picture/animated/cloudy-night-2.svg",

        "04d": "picture/animated/cloudy-day-3.svg",
        "04n": "picture/animated/cloudy-night-3.svg",

        "09d": "picture/animated/rainy-3.svg",
        "09n": "picture/animated/rainy-7.png",

        "10d": "picture/animated/rainy-1.svg",
        "10n": "picture/animated/rainy-4.png",

        "11d": "picture/animated/thunder.svg",
        "11n": "picture/animated/thunder.svg",

        "13d": "picture/animated/snowy-3.svg",
        "13n": "picture/animated/snowy-6.svg",

        "50d": "picture/animated/cloudy.svg",
        "50n": "picture/animated/cloudy.svg"
    };

    return iconsMap[iconCode] || "images/default.png"; 
}


let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})


