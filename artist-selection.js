
// Function to handle input in the search bar
async function handleSearchInput() {
    const query = document.getElementById('searchInput').value.trim();
    const suggestionsContainer = document.getElementById('suggestions');

    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    if (query) {
        // Fetch artist suggestions from Spotify API
        const artists = await searchArtists(query);

        // Display artist suggestions as a list
        artists.forEach(artist => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'list-group-item list-group-item-action';
            suggestionItem.textContent = artist.name;
            suggestionItem.onclick = () => selectArtist(artist);
            suggestionsContainer.appendChild(suggestionItem);
        });
    }
}

// Function to search for artists using the Spotify API
async function searchArtists(query) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=5`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch artists');
        }

        const data = await response.json();
        return data.artists.items;
    } catch (error) {
        console.error('Error searching artists:', error);
        return [];
    }
}

// Function to handle artist selection
function selectArtist(artist) {
    const selectedArtistsContainer = document.getElementById('selectedArtists');

    // Create a badge for the selected artist
    const badge = document.createElement('span');
    badge.className = 'badge badge-primary m-1';
    badge.textContent = artist.name;

    // Remove artist from suggestions after selection
    const removeIcon = document.createElement('span');
    removeIcon.className = 'ml-2 text-white';
    removeIcon.style.cursor = 'pointer';
    removeIcon.innerHTML = '&times;';
    removeIcon.onclick = () => badge.remove();

    badge.appendChild(removeIcon);
    selectedArtistsContainer.appendChild(badge);

    // Clear search input and suggestions after selection
    document.getElementById('searchInput').value = '';
    document.getElementById('suggestions').innerHTML = '';
}




// Fetch frame to present playlist
const playlistId = '6Hk5syG8LA8nebwZAU6mbQ';

<iframe
    title="Spotify Embed: Recommendation Playlist "
    src={`https://open.spotify.com/embed/playlist/6Hk5syG8LA8nebwZAU6mbQ?utm_source=generator&theme=0`}
    width="100%"
    height="100%"
    style={{ minHeight: '360px' }}
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
/>






