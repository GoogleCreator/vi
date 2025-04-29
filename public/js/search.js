const searchInput = document.querySelector("#searchGames");
const iframe = document.querySelector("iframe");
const div = document.querySelector(".center-container");

iframe.style.display = "none"; // Hide iframe initially
div.style.display = "block";  // Show the search container

function search(input) {
  try {
    return new URL(input).toString();
  } catch (err) {
    return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
  }
}

function handleSearch(query) {
  div.style.display = 'none'; // Hide search container
  iframe.style.display = 'block'; // Show iframe
  iframe.src = search(query); // Set iframe src to the URL
}

searchInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      handleSearch(query);
    }
  }
});
