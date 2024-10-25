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

// Fetch Spotify token using Client Credentials Flow
async function getSpotifyToken() {
    const client_id = '5ce6c394f74f4c7bb2bcffef6bff236a'; // Your Client ID
    const client_secret = 'eb263a1800f04db99c6fa81697a0487a'; // Your Client Secret

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

// Fetch playlist recommendations from Spotify API based on moods
async function fetchMoodTransitionPlaylist(currentMood, targetMood, token) {
    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${currentMood},${targetMood}`, {
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await response.json();
    return data.tracks[0];
}
