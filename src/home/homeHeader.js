import { dateTime } from "../utils/dateTime.js";
import { sidebar } from "../sidebar.js";
import { getProfilePic, getUserName } from "../profile/profile.js";

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
    const el = document.querySelector('.header');
    this.el = el;
    this.quote = el.querySelector('.quote');
    this.greetingEl =  el.querySelector('.greeting');
    this.userIcon = el.querySelector('.user');

    this.renderQuotes();
    this.renderGreeting();
    this.renderUserContent();

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
      
      setTimeout(() => {
        this.quote.style.removeProperty('animation');
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
  },

  renderUserContent() {
    this.el.querySelector('.js-profile-pic').innerHTML = getProfilePic();

    this.el.querySelector('.js-user-name').innerHTML = getUserName();
  }
};