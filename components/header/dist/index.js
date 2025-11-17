// Header Component
function Header(props) {
  const { title, links = [] } = props;
  
  const renderLinks = () => {
    return links.map(link => `<a href="${link.url}" class="text-blue-500 hover:text-blue-700 mx-2">${link.text}</a>`).join('');
  };
  
  return `
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-2xl font-bold">${title}</h1>
      <nav class="mt-2">
        ${renderLinks()}
      </nav>
    </header>
  `;
}

module.exports = Header;