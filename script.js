const accessToken = window.location.hash.split('&')[0].split('=')[1];

if (!accessToken) {
    window.location.href = 'index.html';
}

async function fetchUserProfile() {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const data = await response.json();

    // Check if there are images and set the profile photo
    if (data.images && data.images.length > 0) {
        document.getElementById('user-photo').src = data.images[0].url;
    } else {
        document.getElementById('user-photo').src = 'default-photo-url.jpg'; // fallback image if no profile photo exists
    }
}

fetchUserProfile();

const selectedArtists = new Set();

// Fetch artists from Spotify API based on search input
document.getElementById('artist-search').oninput = async function() {
    const query = this.value;
    if (query.length < 3) return;

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
        artistItem.onclick = () => artistItem.classList.toggle('active');
        artistResults.appendChild(artistItem);
    });
};

document.getElementById('create-playlist-btn').onclick = async function() {
    const mood = document.getElementById('mood-select').value;
    const selectedArtists = Array.from(document.querySelectorAll('#artist-results .active')).map(item => item.textContent);

    const playlistResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Mood Playlist`,
            description: `A custom ${mood} playlist created just for you!`,
            public: true
        })
    });
    const playlistData = await playlistResponse.json();

    const trackUris = [];
    for (const artist of selectedArtists) {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artist)}&type=track&limit=5`, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        });
        const data = await response.json();
        trackUris.push(...data.tracks.items.map(track => track.uri));
    }

    await fetch(`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: trackUris })
    });

    alert('Playlist created successfully!');
};




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


