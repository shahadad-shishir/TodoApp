  const quote =  document.querySelector('.header .quote');
  const greetingEl =  document.querySelector('.header .greeting');

  export function handleHeader(day, hours, greeting) {
    renderQuotes(day, hours);
    renderGreeting(greeting);
  }

  const quotes = [
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
  ];

  function renderQuotes(day, hours) {
    setInterval(() => {
      quote.style.animation = 'quoteAnim .5s ease';
      const random = Math.ceil(Math.random() * quotes.length - 1);

      if (quotes[random] === 'day') {
        quote.innerHTML = `Have a wonderful ${day}!`;
      } else if (quotes[random] === 'hours') {
        quote.innerHTML = `${hours} hours left in the day, use them wisely.`;
      } else {
        quote.innerHTML = quotes[random];
      }
      
      const timeoutId = setTimeout(() => {
        quote.style.removeProperty('animation');
        clearTimeout(timeoutId);
      }, 600)
    }, 5000);
  }

  function renderGreeting(greeting) {
    greetingEl.innerText = greeting;
  }