'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data) {
  const html = ` <article class="country">
 <img class="country__img" src="${data.flag}" />
<div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${data.population} people</p>
  <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
  <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
</div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};


const getPosition = function () {
  return new Promise (function (resolve, reject){
    
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos))

const whereAmI = function () {
  getPosition()
  .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click' , whereAmI);







// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       if (!neighbour) return;

//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'));
// };
// btn.addEventListener('click', function () {
//   getCountryData('greece');
// });

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Probem ${response.status}`);
//       return response.json();
//     })
//     .then(data =>{
//         console.log(data)
//         console.log(`You are ${data.city}, ${data.country}`) 
//          return re.json();
//        })
// };
// reverse(39.71454, 21.62164);

// console.log('test start');
// setTimeout(() => console.log('0 sec'), 0);
// Promise.resolve('resolved').then(res => console.log(res));
// console.log('Test end');


// const lotteryPromise = new Promise(function(resolve, reject){
//   console.log('lotery draw');
//   setTimeout(function(){
//     if (Math.random() >= 0.5){
//       resolve('You win');
//     }else {
//       reject(new Error('you lost'))
//     } 
//   },2000);

// });

// lotteryPromise.then(res=> console.log(res)).catch(err => console.error(err));