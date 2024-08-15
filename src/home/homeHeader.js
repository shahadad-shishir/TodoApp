import { dateTime } from "../utils/dateTime.js";
import { sidebar } from "../sidebar.js";

export const homeHeader = {
  intervalId: undefined,

  quotes: [
    'Stay organized, stay ahead.',
    'Embrace the power of productivity!',
    'Today is a new opportunity to be productive!',
    'Set your goals, crush them, repeat.',
    'Productivity is the key to success. 🔑',
    "Let's turn plans into accomplishments!",
    'Stay focused, stay productive.',
    'Get ready to make things happen!',
    'Unlock your productivity potential. 🔓',
    'Today is a new opportunity to be productive!',
    'day',
    'Make every moment count.',
    'hours',
    'Get things done and conquer the day!',
    'Be efficient, be productive.'
  ],

  init() {
    this.quote = document.querySelector('.header .quote');
    this.greetingEl =  document.querySelector('.header .greeting');
    this.userIcon = document.querySelector('.header .user');

    this.renderQuotes();
    this.renderGreeting();

    this.userIcon.addEventListener('click', () => {
      sidebar.open();
    });
  },

  renderQuotes() {
    if (this.intervalId) {
      return;
    }

    const day = dateTime.getWeekDay(new Date());
    const hours = dateTime.getRemainingHours();
    
    this.intervalId = setInterval(() => {
      this.quote.style.animation = 'quoteAnim .5s ease';
      const random = Math.ceil(Math.random() * this.quotes.length - 1);

      if (this.quotes[random] === 'day') {
        this.quote.innerHTML = `Have a wonderful ${day}!`;
      } else if (this.quotes[random] === 'hours') {
        this.quote.innerHTML = `${hours} hours left in the day, use them wisely.`;
      } else {
        this.quote.innerHTML = this.quotes[random];
      }
      
      const timeoutId = setTimeout(() => {
        this.quote.style.removeProperty('animation');
        clearTimeout(timeoutId);
      }, 600)
    }, 5000);
  },

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  },

  renderGreeting() {
    const greeting = dateTime.getGreeting();
    this.greetingEl.innerText = greeting;
  }
};