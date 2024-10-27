const accessToken = window.location.hash.split('&')[0].split('=')[1];

if (!accessToken) {
    window.location.href = 'index.html';
}

async function fetchUserProfile() {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const data = await response.json();
    document.getElementById('user-name').textContent = data.display_name;
    // Check if there are images and set the profile photo
    if (data.images && data.images.length > 0) {
        document.getElementById('user-photo').src = data.images[0].url;
    } else {
        document.getElementById('user-photo').src = 'default-photo-url.jpg'; // fallback image if no profile photo exists
    }
}

fetchUserProfile();



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







// Moods and their respective class names (for color matching)
const moods = [
    'Enraged', 'Panicked', 'Stressed', 'Jittery', 'Shocked', 'Surprised',
    'Upbeat', 'Festive', 'Exhilarated', 'Ecstatic', 'Livid', 'Furious',
    'Frustrated', 'Tense', 'Stunned', 'Hyper', 'Cheerful', 'Motivated',
    'Inspired', 'Elated', 'Fuming', 'Frightened', 'Angry', 'Nervous', 'Restless', 'Energized',
    'Lively', 'Giddy', 'Optimistic', 'Enthusiastic', 'Anxious', 'Apprehensive',
    'Worried', 'Irritated', 'Annoyed', 'Pleased', 'Focused', 'Happy',
    'Proud', 'Thrilled', 'Repulsed', 'Troubled', 'Concerned', 'Uneasy', 'Peeved', 'Pleasant',
    'Joyful', 'Hopeful', 'Playful', 'Blissful', 'Disgusted', 'Glum',
    'Disappointed', 'Down', 'Apathetic', 'Ease', 'Easygoing', 'Content',
    'Loving', 'Fulfilled', 'Pessimistic', 'Morose', 'Discouraged', 'Sad', 'Bored', 'Calm',
    'Secure', 'Satisfied', 'Grateful', 'Touched', 'Alienated', 'Miserable',
    'Lonely', 'Disheartened', 'Tired', 'Relaxed', 'Chill', 'Restful',
    'Blessed', 'Excited', 'Despondent', 'Depressed', 'Sullen', 'Exhausted', 'Fatigued', 'Mellow',
    'Thoughtful', 'Peaceful', 'Comfortable', 'Carefree', 'Despair', 'Hopeless',
    'Desolated', 'Spent', 'Drained', 'Sleepy', 'Complacent', 'Tranquil',
    'Cozy', 'Serene'
];

// Function to generate mood selection circles
function generateMoodCircles() {
    const moodGrid = document.querySelector('.mood-grid');

    moods.forEach(mood => {
        const moodCircle = document.createElement('div');
        moodCircle.className = `mood-circle mood-${mood.toLowerCase()}`;
        moodCircle.textContent = mood;
        moodCircle.addEventListener('click', () => selectMood(mood));
        moodGrid.appendChild(moodCircle);
    });
}

// Run function on page load
window.onload = function() {
    if (document.querySelector('.mood-grid')) {
        generateMoodCircles();
    }
};


// Spotify Credentials
const clientId = '5ce6c394f74f4c7bb2bcffef6bff236a';  // Use your client ID
const redirectUri = 'https://aj-wrk.github.io/Moody/';  // Replace with your actual redirect URI

// Spotify Authorization Endpoint
const authEndpoint = 'https://accounts.spotify.com/authorize';

// Scopes that define the permissions the app will need
const scopes = [
    'user-library-read',
    'playlist-read-private',
    'playlist-modify-public'
].join('%20');  // Space-separated scopes for the URL

// Handle the login button
document.getElementById('login-btn').addEventListener('click', () => {
    const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;
    window.location.href = loginUrl;
});


// Handle playlist creation based on mood or randomization
document.getElementById('randomize-btn').addEventListener('click', async () => {
    const token = localStorage.getItem('spotifyAccessToken');
    if (!token) {
        alert('Please log in first!');
        return;
    }

    try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        // Get a random playlist from user's collection
        const randomPlaylist = data.items[Math.floor(Math.random() * data.items.length)];

        alert(`Your random playlist is: ${randomPlaylist.name}`);
    } catch (error) {
        console.error('Error fetching playlists:', error);
        alert('Failed to fetch playlists.');
    }
});


// Mood selection (current and target mood pages)
function selectMood(mood) {
    if (window.location.pathname.includes('mood-selection.html')) {
        localStorage.setItem('currentMood', mood);
        window.location.href = 'target-mood-selection.html';
    } else if (window.location.pathname.includes('target-mood-selection.html')) {
        const currentMood = localStorage.getItem('currentMood');
        localStorage.setItem('targetMood', mood);
        createMoodTransitionPlaylist(currentMood, mood);
    }
}

// Function that creates a playlist based on moods (stubbed for now)
async function createMoodTransitionPlaylist(currentMood, targetMood) {
    const token = await getSpotifyToken();
    const playlist = await fetchMoodTransitionPlaylist(currentMood, targetMood, token);
    window.open(playlist.external_urls.spotify, '_blank');
}


// Fetch playlist recommendations from Spotify API based on moods
async function fetchMoodTransitionPlaylist(currentMood, targetMood, token) {
    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${currentMood},${targetMood}`, {
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await response.json();
    return data.tracks[0];
}

