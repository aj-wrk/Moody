document.getElementById('artist-search').oninput = async function() {
    const query = this.value;
    if (query.length < 1) return;

    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const data = await response.json();
    const artistResults = document.getElementById('artist-results');
    artistResults.innerHTML = '';

    data.artists.items.forEach(artist => {
        const artistItem = document.createElement('button');
        artistItem.className = 'list-group-item list-group-item-action';
        artistItem.textContent = artist.name;
        artistItem.onclick = () => toggleArtistSelection(artist.name);
        artistResults.appendChild(artistItem);
    });
};

function toggleArtistSelection(artistName) {
    if (selectedArtists.has(artistName)) {
        selectedArtists.delete(artistName);
    } else {
        selectedArtists.add(artistName);
    }
    updateSelectedArtists();
}

function updateSelectedArtists() {
    const selectedArtistsContainer = document.getElementById('selected-artists');
    selectedArtistsContainer.innerHTML = '';
    selectedArtists.forEach(artistName => {
        const badge = document.createElement('span');
        badge.className = 'badge bg-secondary me-1 mb-1';
        badge.textContent = artistName;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-close btn-close-white ms-2';
        removeBtn.style.fontSize = '0.6em';
        removeBtn.onclick = () => {
            selectedArtists.delete(artistName);
            updateSelectedArtists();
        };
        badge.appendChild(removeBtn);
        selectedArtistsContainer.appendChild(badge);
    });
}