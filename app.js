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
