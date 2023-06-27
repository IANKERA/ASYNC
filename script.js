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

  countriesContainer.insertAdjacentElement('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const getCountryandNeigbour = function () {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    'https://countries-api-836d.onrender.com/countries/name/portugal'
  );
  request.send();
  console.log(request);

  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data);

    const [neighbour] = data.borders;

    if (!neighbour) return;

    const request = new XMLHttpRequest();
    request.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/border/`
    );
    request.send;
  });
};

getCountryandNeigbour('portugal');
