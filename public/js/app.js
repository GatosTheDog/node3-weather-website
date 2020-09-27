console.log('client side js file is loaded');



const weather_form = document.querySelector('form');
const search_element = document.querySelector('input');
const messsage1 = document.querySelector('#messsage1')
const messsage2 = document.querySelector('#messsage2')



weather_form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search_element.value;

  messsage1.textContent = 'Loading...';
  messsage2.textContent = '';

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if(data.error){
          messsage1.textContent = data.error;
      }else{
        messsage1.textContent = data.location;
        messsage2.textContent = data.forecast;
        
      }
    })
  })
})
