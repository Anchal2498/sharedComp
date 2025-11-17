// Simple Button Component
function Button(props) {
  const { children, onClick, variant = 'primary' } = props;
  
  const buttonStyles = {
    primary: 'bg-blue-500 text-[18px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded',
  };
  
  return `
    <button class="${buttonStyles[variant]}" onclick="${onClick || ''}">
      ${children}
    </button>
  `;
}

module.exports = Button;