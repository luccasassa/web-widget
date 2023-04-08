////////////////////// digital clock

const currentTime = () => {
  const digitalClock = document.querySelector('.date-clock');

  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  hh = hh < 10 ? `0${hh}` : hh;
  mm = mm < 10 ? `0${mm}` : mm;
  ss = ss < 10 ? `0${ss}` : ss;

  // let time = `${hh}:${mm}:${ss}`
  let time = `${hh}:${mm}`;
  digitalClock.innerText = time;
}

currentTime();
setInterval(currentTime, 1000);

const currentDate = () => {
  const dateToday = document.querySelector('.date-today');

  let date = new Date();
  let day = date.getDay();
  let daylist = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let dayNum = date.getDate();
  let month = date.getMonth();
  let monthlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  dateToday.innerText = daylist[day] + ', ' + monthlist[month] + ' ' + dayNum;
}

currentDate();

////////////////////// weather

let loc = document.querySelector(".weather-location");
let iconw = document.querySelector(".iconw");
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let hum = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let input = document.querySelector('#search-input');
let button = document.querySelector('#search-button');

let weather = {
  apiKey: "75759cf97fe18753a027ab6f7b2c8624",
  fetchWeather: function (location) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&appid=" + this.apiKey)
      .then((response) => {
        if (!response.ok) {
          document.querySelector('.toast').classList.add('on');
          setTimeout(function () {
            document.querySelector('.toast').classList.remove('on');
          }, 5000);
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    loc.innerText = name + ", " + data.sys.country;
    iconw.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    summary.innerText = description;
    temperature.innerText = (temp) + "°C";
    hum.innerText = humidity + " %";
    wind.innerText = speed + " km/h";
  },
  search: function () {
    this.fetchWeather(input.value);
  },
};

button.addEventListener("click", function () {
  weather.search();
});

input.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather('Mendoza');

document.querySelector('.close').addEventListener('click', function () {document.querySelector('.toast').classList.remove('on');})

////////////////////// browser

let browserDetailsRef = document.querySelector("#browserType");
let odDetailsRef = document.querySelector("#osType");

let browserName = (function (agent) {
  switch (true) {
      case agent.indexOf("edge") > -1:
        return "MS Edge";
      case agent.indexOf("edg/") > -1:
        return "Edge (chromium based)";
      case agent.indexOf("opr") > -1 && !!window.opr:
        return "Opera";
      case agent.indexOf("chrome") > -1 && !!window.chrome:
        return "Chrome";
      case agent.indexOf("trident") > -1:
        return "MS IE";
      case agent.indexOf("firefox") > -1:
        return "Firefox";
      case agent.indexOf("safari") > -1:
        return "Safari";
      default:
        return "Unknow browser";
  }
})(window.navigator.userAgent.toLowerCase());

browserDetailsRef.innerText = browserName;  

////////////////////// Operating system

let osName = () => {
  let userAgent = window.navigator.userAgent;
  let platform = window.navigator?.userAgentData?.platform || window.navigator.platform;
  let macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  let windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  let iosPlatforms = ['iPhone', 'iPad', 'iPod'];

  switch (true) {
    case macosPlatforms.indexOf(platform) !== -1:
      return 'Mac OS';
    case iosPlatforms.indexOf(platform) !== -1:
      return 'iOS';
    case windowsPlatforms.indexOf(platform) !== -1:
      return 'Windows';
    case /Android/.test(userAgent):
      return 'Android';
    case /Linux/.test(platform):
      return 'Linux';
    default:
      return 'Unknow Operating system';
  }
}

odDetailsRef.innerText = osName();

////////////////////// network status

const networkStatus = document.querySelector("#network-status");

if (navigator.onLine) {
  networkStatus.innerHTML = 'Online';
  networkStatus.style.color = '#60d394';

} else {
  networkStatus.innerHTML = 'Offline';
  networkStatus.style.color = '#ee6055';
};

window.addEventListener('offline', () => {
  networkStatus.innerHTML = 'Offline';
  networkStatus.style.color = '#ee6055';
});

window.addEventListener('online', () => {
  networkStatus.innerHTML = 'Online';
  networkStatus.style.color = '#60d394';
});