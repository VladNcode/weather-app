console.log('Client side js file is loaded');

const wrapper = document.querySelector('.weather--fe');
const form = document.querySelector('.weather--data');
const input = document.querySelector('.imp');
// const btn = document.querySelector('.imp-btn');

if (form)
  form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`http://127.0.0.1:3000/api?adress=${input.value}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        wrapper.innerHTML += `
        <img src="${data.icon}" alt="weather icon">
        <h3>${data.location}</h3>
        <h3>${data.data}</h3>`;
      });
  });
