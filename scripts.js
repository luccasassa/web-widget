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

let lon;
let lat;
let loc = document.querySelector(".date-location");
let iconw = document.querySelector(".iconw");
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let hum = document.querySelector(".humidity");
let wind = document.querySelector(".wind");

const apiKey = "75759cf97fe18753a027ab6f7b2c8624";
const kelvin = 273;
  
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {

      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
  
      // API URL
      const base = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=75759cf97fe18753a027ab6f7b2c8624`;

      // Calling the API
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          const { icon, description } = data.weather[0];
          const { temp, humidity } = data.main;
          const { speed } = data.wind;

          loc.textContent = data.name + ", " + data.sys.country;
          iconw.src = "https://openweathermap.org/img/wn/" + icon + ".png";
          temperature.innerText = Math.floor(data.main.temp - kelvin) + " °C";
          summary.innerText = description;
          hum.innerText = humidity + " %";
          wind.innerText = speed + " km/h";
        });
    });
  }
});

////////////////////// browser & OS

let browserDetailsRef = document.querySelector("#browserType");
let odDetailsRef = document.querySelector("#osType");

let browserList = [
  {name: 'Firefox', value: 'Firefox'},
  {name: 'Opera', value: 'Opera'},
  {name: 'Chrome', value: 'Chrome'},
  {name: 'Edge', value: 'Edge'},
  {name: 'Brave', value: 'Brave'},
  {name: 'Safari', value: 'Safari'}
];

let osList = [
  {name: 'Android', value: 'Android'},
  {name: 'iOs', value: 'iOs'},
  {name: 'Linux', value: 'Linux'},
  {name: 'Windows', value: 'Win'},
  {name: 'Macintosh', value: 'Mac'},
  {name: 'ipad', value: 'ipad'}
];

let browserOsChecker = () => {
  let userDetails = navigator.userAgent;

  for (let i in browserList) {
    if (userDetails.includes(browserList[i].value)) {
      browserDetailsRef.innerText = browserList[i].name || 'unknown Browser';
      break;
    }
  }

  for (const i in osList) {
    if (userDetails.includes(osList[i].value)) {
      odDetailsRef.innerText = osList[i].name;
      break;
    }
  }
};

window.onload = browserOsChecker();

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