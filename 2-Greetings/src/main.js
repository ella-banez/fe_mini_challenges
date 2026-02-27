import './style.css'
import { populateGreetingOption } from './js/ui/greetings.js';
import { generateGreeting } from './js/ui/greetings.js';
import { getTodayTime } from './js/service/getPhTime.js';
import applyTheme from './js/applyTheme.js';

document.querySelector('#app').innerHTML = `
  <section class="greeting-msg hero is-align-items-center">
  <div class="hero-body">
    <p id="title" class="title is-size-2 is-size-3-mobile m-4">Create a personalized greeting</p>
    <p id="subtitle" class="subtitle is-size-4 is-size-5-mobile">We’ll generate a greeting based on the time or occasion</p>
  </div>
</section>`

// Populate Greeting Options
populateGreetingOption();

const form = document.getElementById('greeting-form');
const inputEl = document.getElementById('name-input');
const btnEl = document.getElementById('btn-show-greeting');
const titleEl = document.getElementById('title');
const subtitleEl = document.getElementById('subtitle');

//Disable button if input is empty
inputEl.addEventListener('input', () => {
  btnEl.disabled = inputEl.value.trim() === '';
});

//Event Listener for Greeting Generation
form.addEventListener('submit', async(event) => {
  event.preventDefault(); // Prevent form submission

  const toSentenceCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const name = toSentenceCase(inputEl.value.trim());

  if (!name) return;
  const { message, themeKey } = await generateGreeting();

  titleEl.textContent = `${name}!`;
  subtitleEl.textContent = `${message}`;
  applyTheme(themeKey);
});

window.getTodayTime = getTodayTime; // Expose getTodayTime to the global scope for testing purposes
window.generateGreeting = generateGreeting; // Expose generateGreeting to the global scope for testing purposes