const dataButton = document.querySelector('.data-button');
const dataContainer = document.querySelector('.data-container');

dataButton.addEventListener('click', () => {
  const data = 'This is some hidden data that will be displayed when the button is clicked.';
  dataContainer.innerHTML = data;
  dataContainer.classList.toggle('show');
});





// const dataButton = document.querySelector('.data-button');
// const dataContainer = document.querySelector('.data-container');

// dataButton.addEventListener('click', () => {
//   const name = dataButton.getAttribute('data-name');
//   const age = dataButton.getAttribute('data-age');
//   const data = `Name: ${name}, Age: ${age}`;
//   dataContainer.innerHTML = data;
//   dataContainer.classList.toggle('show');
// });

//i want the code that i have a button but i want to add some data in the button and when i click on this button the data is visual to the middle of left side of the screen.

//i want the code that i have a button but i want to add some data in the button and when i click on this button the data is visual to the middle of left side