const searchTab = document.getElementById("searchTab");
const searchContent = document.getElementById("searchContent");
const searchGames = document.getElementById('searchGames');
const frame = document.querySelector("iframe");
const div = document.querySelector(".center-container");

// Hide the iframe initially
frame.style.display = "none";

// Show search content when the search tab is clicked
searchTab.addEventListener("click", function () {
  gamesContent.classList.remove("active");
  searchContent.classList.add("active");
  homeTab.classList.remove("active");
  gamesTab.classList.remove("active");
  searchTab.classList.add("active");
});

// Listen for input in the search bar and perform the search when the user types
searchGames.addEventListener('input', function (event) {
  const searchQuery = event.target.value.trim().toLowerCase();
  if (searchQuery) {
    // Direct search in games (if matches found)
    const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchQuery));
    renderGames(filteredGames);
  } else {
    // If the search bar is empty, render all games
    renderGames(games);
  }
});

// Allow the user to press Enter to search and show iframe with the result
searchGames.addEventListener('keydown', function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default action of the Enter key (like submitting a form)

    const searchQuery = searchGames.value.trim();
    if (searchQuery) {
      // Treat it as a URL search if it’s a valid URL
      let searchUrl = search(searchQuery);
      div.style.display = 'none';
      frame.style.display = 'block';
      frame.src = searchUrl;
    }
  }
});

// If the URL query parameter is set (i.e., ?q=search_term)
const params = new URLSearchParams(window.location.search);
if (params.get("q")) {
  const searchQuery = params.get("q");
  div.style.display = 'none';
  frame.style.display = 'block';
  frame.src = search(searchQuery);
}

// Function to handle search logic
function search(query) {
  try {
    // Check if the input is a valid URL (https://example.com)
    return new URL(query).toString();
  } catch (err) {
    // If not a valid URL, perform a Google search
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
}
