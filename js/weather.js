const api = {
  key: 'fdea6930a8542989e81e282315fb1934',
  base: 'http://api.openweathermap.org/data/2.5/'
}


const search = document.querySelector('.search');
search.addEventListener('keypress', setQuery);

function setQuery(even) {
  if (even.keyCode == 13) {
    getResults(search.value);
  }
}


function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  console.log(weather);
  let city = document.querySelector('.city');
  city.textContent = `${weather.name}`;

  let now = new Date();
  let date = document.querySelector('.data');
  date.textContent = dateBuilder(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)} &deg;`;

  let clouds = document.querySelector('.info');
  clouds.textContent = `${weather.weather[0].description}`;

  let maxTemp = document.querySelector('.max');
  maxTemp.innerHTML = `Max ${Math.round(weather.main.temp_max)} &deg;`;

  let minTemp = document.querySelector('.min');
  minTemp.innerHTML = `Min ${Math.round(weather.main.temp_min)} &deg;`;

  let humidity = document.querySelector('.humidity');
  humidity.innerHTML = `Humidity ${Math.round(weather.main.humidity)} %`;

  let pressure = document.querySelector('.pressure');
  pressure.innerHTML = `Pressure ${Math.round(weather.main.pressure)} hPa`;

  let speed = document.querySelector('.speed');
  speed.innerHTML = `Wind speed ${Math.round(weather.wind.speed)} km/h`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

// fetch(
//     "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=fdea6930a8542989e81e282315fb1934"
//   )
//     .then(function (resp) {
//       return resp.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       document.querySelector(".city").textContent = data.name;
//       document.querySelector(".temp").innerHTML =
//         Math.round(data.main.temp - 273.15) + "&deg;";
//       document.querySelector(".max").innerHTML =
//         "Max" + " " + Math.round(data.main.temp_max - 273.15) + "&deg;";
//       document.querySelector(".min").innerHTML =
//       "Min" + " " + Math.round(data.main.temp_min - 273.15) + "&deg;";
//       document.querySelector(".info").textContent = data.weather[0].description;
//     })
//     .catch(function () {
//       // catch any errors
//     });