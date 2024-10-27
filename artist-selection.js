const accessToken = localStorage.getItem('accessToken');

if (!accessToken) {
    alert("No access token found. Please authenticate first.");
    window.location.href = "index.html";
}

// DOM elements
const artistSearchInput = document.getElementById('artist-search');
const artistResults = document.getElementById('artist-results');
const selectedArtistsContainer = document.getElementById('selected-artists');

// Retrieve selected artists from localStorage or initialize as empty array
let selectedArtists = JSON.parse(localStorage.getItem('selectedArtists')) || [];

// Display selected artists on page load
selectedArtists.forEach(artistId => {
    const artistName = localStorage.getItem(artistId); // Get the artist name stored in localStorage
    createBadge(artistId, artistName);
});

// Function to fetch artists based on user input
const searchArtists = async (query) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayArtistResults(data.artists.items);
        } else {
            console.error('Error fetching artists:', response.status);
            alert("Error fetching artists. Please try again later.");
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to display search results
const displayArtistResults = (artists) => {
    artistResults.innerHTML = ''; // Clear previous results

    artists.forEach(artist => {
        const artistElement = document.createElement('div');
        artistElement.classList.add('list-group-item', 'list-group-item-action');
        artistElement.textContent = artist.name;
        artistElement.dataset.artistId = artist.id;

        // Add click event to select the artist
        artistElement.addEventListener('click', () => {
            selectArtist(artist);
        });

        artistResults.appendChild(artistElement);
    });
};

// Function to select an artist and create a badge
const selectArtist = (artist) => {
    // Check if artist is already selected
    if (selectedArtists.includes(artist.id)) return;

    // Add artist ID to the selected list
    selectedArtists.push(artist.id);

    // Save the artist's name in localStorage for retrieval
    localStorage.setItem(artist.id, artist.name);

    // Create a badge for the selected artist
    createBadge(artist.id, artist.name);

    // Update the selected artists in localStorage
    localStorage.setItem('selectedArtists', JSON.stringify(selectedArtists));
};

// Function to create a badge
const createBadge = (artistId, artistName) => {
    // Create badge element
    const badge = document.createElement('span');
    badge.classList.add('badge', 'badge-pill', 'badge-light', 'mx-1', 'my-1');
    badge.textContent = artistName;

    // Add a remove button to the badge
    const removeButton = document.createElement('span');
    removeButton.classList.add('ml-2', 'text-danger', 'remove-artist');
    removeButton.innerHTML = '&times;';
    removeButton.style.cursor = 'pointer';

    // Remove artist from the selected list on click of the remove button
    removeButton.addEventListener('click', () => {
        // Remove artist ID from the array
        selectedArtists = selectedArtists.filter(id => id !== artistId);
        // Remove artist's name from localStorage
        localStorage.removeItem(artistId);
        // Remove badge from DOM
        badge.remove();
        // Update selected artists in localStorage
        localStorage.setItem('selectedArtists', JSON.stringify(selectedArtists));
    });

    // Append the remove button to the badge
    badge.appendChild(removeButton);
    // Append the badge to the container
    selectedArtistsContainer.appendChild(badge);
};

// Event listener to search for artists as the user types
artistSearchInput.addEventListener('input', () => {
    const query = artistSearchInput.value.trim();
    if (query) {
        searchArtists(query);
    } else {
        artistResults.innerHTML = ''; // Clear results if input is empty
    }
});

