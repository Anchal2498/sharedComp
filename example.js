// Example of how to use the components together
const Button = require('./components/button');
const Card = require('./components/card');
const Header = require('./components/header');

// Create a header
const headerHtml = Header({
  title: 'My App',
  links: [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/about' },
    { text: 'Contact', url: '/contact' }
  ]
});

// Create a card with a button
const cardHtml = Card({
  title: 'Welcome',
  content: 'This is a sample card component.',
  buttonText: 'Click Me',
  onButtonClick: 'handleClick()'
});

console.log('Header HTML:');
console.log(headerHtml);
console.log('\nCard HTML:');
console.log(cardHtml);