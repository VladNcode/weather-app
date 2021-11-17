console.log('Client side js file is loaded');

const wrapper = document.querySelector('.weather--container');
const form = document.querySelector('.form--reset');
const input = document.querySelector('.imp');
const weatherData = document.querySelector('.weather--data');

let timer;
const doneTypingInterval = 1500; // wait 1.5 seconds

if (form) {
  form.addEventListener('keyup', function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      doneTyping();
    }, doneTypingInterval);
  });

  form.addEventListener('keydown', function () {
    clearTimeout(timer);
  });

  function doneTyping() {
    input.placeholder = 'Loading...';

    fetch(`/api?adress=${input.value}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);

        if (data.status === 'fail') {
          input.placeholder = 'Loading...';
          weatherData.innerHTML = `
          <h3>Status: "${data.status}"</h3>
          <h3>${data.message}</h3>`;
          input.placeholder = '';
          return input.blur();
        }

        weatherData.innerHTML = `
        <br>
        <img src="${data.icon}" alt="weather icon">
        <h3>${data.location}</h3>
        <h3>${data.data}</h3>`;
        input.placeholder = '';
        input.blur();
      });

    form.reset();
  }
}

// if (form)
//   form.addEventListener('submit', e => {
//     e.preventDefault();

//     input.placeholder = 'Loading...';

//     fetch(`https://127.0.0.1:3000/api?adress=${input.value}`)
//       .then(response => {
//         return response.json();
//       })
//       .then(data => {
//         console.log(data);

//         if (data.status === 'fail') {
//           input.placeholder = 'Loading...';
//           weatherData.innerHTML = `
//         <h3>Status: "${data.status}"</h3>
//         <h3>${data.message}</h3>`;
//           input.placeholder = '';
//           return input.blur();
//         }

//         weatherData.innerHTML = `
//       <br>
//       <img src="${data.icon}" alt="weather icon">
//       <h3>${data.location}</h3>
//       <h3>${data.data}</h3>`;
//         input.placeholder = '';
//         input.blur();
//       });

//     form.reset();
//   });
