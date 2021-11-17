console.log('Client side js file is loaded');

const wrapper = document.querySelector('.weather--container');
const form = document.querySelector('.weather--form');
const input = document.querySelector('.imp');
const weatherData = document.querySelector('.weather--data');
const btn = document.querySelector('.imp-btn');

if (form)
  form.addEventListener('submit', e => {
    e.preventDefault();

    btn.textContent = 'Loading...';

    fetch(`http://127.0.0.1:3000/api?adress=${input.value}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);

        if (data.error) {
          btn.textContent = 'Search';
          return (weatherData.innerHTML = `
        <h3>${data.error.statusCode}</h3>
        <h3>${data.message}</h3>`);
        }

        weatherData.innerHTML = `
        <br>
        <img src="${data.icon}" alt="weather icon">
        <h3>${data.location}</h3>
        <h3>${data.data}</h3>`;

        btn.textContent = 'Search';
      });

    form.reset();
  });
