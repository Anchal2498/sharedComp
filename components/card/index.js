// Card Component that uses Button
const Button = require('@Anchal2498/button');

function Card(props) {
  const { title, content, buttonText, onButtonClick } = props;
  
  return `
    <div class="border rounded-lg p-4 shadow-md max-w-sm">
      <h2 class="text-xl font-bold mb-2">${title}</h2>
      <p class="mb-4">${content}</p>
      ${Button({ children: buttonText, onClick: onButtonClick })}
    </div>
  `;
}

module.exports = Card;