// Get the access token from localStorage
const accessToken = localStorage.getItem('accessToken');

// Check if the access token is present
if (!accessToken) {
    alert("No access token found. Please authenticate first.");
    window.location.href = "index.html";
}

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


// Mapping moods to audio feature preferences
const moodToAudioFeatures = {
    'Enraged': {energy: 0.95, tempo: 160, danceability: 0.5},
    'Panicked': {energy: 0.9, tempo: 155, danceability: 0.6},
    'Stressed': {energy: 0.85, tempo: 140, danceability: 0.4},
    'Jittery': {energy: 0.8, tempo: 145, danceability: 0.5},
    'Shocked': {energy: 0.7, tempo: 150, danceability: 0.3},
    'Surprised': {energy: 0.75, tempo: 140, danceability: 0.5},
    'Upbeat': {energy: 0.8, tempo: 130, danceability: 0.8},
    'Festive': {energy: 0.9, tempo: 125, danceability: 0.9},
    'Exhilarated': {energy: 0.9, tempo: 135, danceability: 0.85},
    'Ecstatic': {energy: 0.95, tempo: 140, danceability: 0.9},
    'Livid': {energy: 0.85, tempo: 150, danceability: 0.4},
    'Furious': {energy: 0.9, tempo: 145, danceability: 0.3},
    'Frustrated': {energy: 0.8, tempo: 140, danceability: 0.4},
    'Tense': {energy: 0.75, tempo: 130, danceability: 0.4},
    'Stunned': {energy: 0.7, tempo: 120, danceability: 0.3},
    'Hyper': {energy: 0.95, tempo: 150, danceability: 0.85},
    'Cheerful': {energy: 0.8, tempo: 120, danceability: 0.85},
    'Motivated': {energy: 0.85, tempo: 125, danceability: 0.8},
    'Inspired': {energy: 0.75, tempo: 115, danceability: 0.7},
    'Elated': {energy: 0.9, tempo: 130, danceability: 0.8},
    'Fuming': {energy: 0.85, tempo: 140, danceability: 0.4},
    'Frightened': {energy: 0.65, tempo: 130, danceability: 0.3},
    'Angry': {energy: 0.8, tempo: 135, danceability: 0.4},
    'Nervous': {energy: 0.6, tempo: 120, danceability: 0.3},
    'Restless': {energy: 0.75, tempo: 130, danceability: 0.5},
    'Energized': {energy: 0.85, tempo: 130, danceability: 0.8},
    'Lively': {energy: 0.8, tempo: 125, danceability: 0.8},
    'Giddy': {energy: 0.85, tempo: 125, danceability: 0.85},
    'Optimistic': {energy: 0.7, tempo: 110, danceability: 0.75},
    'Enthusiastic': {energy: 0.8, tempo: 120, danceability: 0.85},
    'Anxious': {energy: 0.6, tempo: 115, danceability: 0.3},
    'Apprehensive': {energy: 0.5, tempo: 105, danceability: 0.3},
    'Worried': {energy: 0.5, tempo: 100, danceability: 0.2},
    'Irritated': {energy: 0.7, tempo: 110, danceability: 0.4},
    'Annoyed': {energy: 0.65, tempo: 105, danceability: 0.4},
    'Pleased': {energy: 0.6, tempo: 100, danceability: 0.7},
    'Focused': {energy: 0.55, tempo: 90, danceability: 0.5},
    'Happy': {energy: 0.75, tempo: 115, danceability: 0.85},
    'Proud': {energy: 0.7, tempo: 105, danceability: 0.7},
    'Thrilled': {energy: 0.9, tempo: 120, danceability: 0.9},
    'Repulsed': {energy: 0.4, tempo: 95, danceability: 0.2},
    'Troubled': {energy: 0.5, tempo: 85, danceability: 0.3},
    'Concerned': {energy: 0.5, tempo: 90, danceability: 0.3},
    'Uneasy': {energy: 0.55, tempo: 95, danceability: 0.3},
    'Peeved': {energy: 0.6, tempo: 90, danceability: 0.4},
    'Pleasant': {energy: 0.6, tempo: 90, danceability: 0.7},
    'Joyful': {energy: 0.8, tempo: 115, danceability: 0.85},
    'Hopeful': {energy: 0.6, tempo: 100, danceability: 0.7},
    'Playful': {energy: 0.75, tempo: 110, danceability: 0.85},
    'Blissful': {energy: 0.8, tempo: 90, danceability: 0.6},
    'Disgusted': {energy: 0.4, tempo: 80, danceability: 0.2},
    'Glum': {energy: 0.3, tempo: 70, danceability: 0.2},
    'Disappointed': {energy: 0.35, tempo: 75, danceability: 0.2},
    'Down': {energy: 0.3, tempo: 70, danceability: 0.1},
    'Apathetic': {energy: 0.2, tempo: 60, danceability: 0.1},
    'Ease': {energy: 0.25, tempo: 65, danceability: 0.3},
    'Easygoing': {energy: 0.4, tempo: 75, danceability: 0.5},
    'Content': {energy: 0.5, tempo: 80, danceability: 0.6},
    'Loving': {energy: 0.5, tempo: 80, danceability: 0.7},
    'Fulfilled': {energy: 0.6, tempo: 85, danceability: 0.7},
    'Pessimistic': {energy: 0.3, tempo: 65, danceability: 0.2},
    'Morose': {energy: 0.25, tempo: 60, danceability: 0.1},
    'Discouraged': {energy: 0.35, tempo: 65, danceability: 0.2},
    'Sad': {energy: 0.3, tempo: 60, danceability: 0.1},
    'Bored': {energy: 0.3, tempo: 65, danceability: 0.2},
    'Calm': {energy: 0.2, tempo: 60, danceability: 0.3},
    'Secure': {energy: 0.5, tempo: 70, danceability: 0.6},
    'Satisfied': {energy: 0.55, tempo: 75, danceability: 0.6},
    'Grateful': {energy: 0.5, tempo: 70, danceability: 0.6},
    'Touched': {energy: 0.4, tempo: 65, danceability: 0.5},
    'Alienated': {energy: 0.3, tempo: 60, danceability: 0.2},
    'Miserable': {energy: 0.2, tempo: 55, danceability: 0.1},
    'Lonely': {energy: 0.25, tempo: 60, danceability: 0.1},
    'Disheartened': {energy: 0.3, tempo: 65, danceability: 0.1},
}

// Array to hold selected moods
let selectedMoods = [];

// Function to generate mood selection circles
function generateMoodCircles() {
    const moodGrid = document.querySelector('.mood-grid');

    moods.forEach(mood => {
        const moodCircle = document.createElement('div');
        moodCircle.className = `mood-circle mood-${mood.toLowerCase()}`;
        moodCircle.textContent = mood;

        // Event listener for mood selection
        moodCircle.addEventListener('click', () => selectMood(mood, moodCircle));

        moodGrid.appendChild(moodCircle);
    });
}

// Function to select/deselect a mood
function selectMood(mood, moodCircle) {
    if (selectedMoods.includes(mood)) {
        // Mood is already selected, remove it
        selectedMoods = selectedMoods.filter(selectedMood => selectedMood !== mood);
        moodCircle.classList.remove('selected'); // Remove selected class
    } else {
        // Mood is not selected, add it
        selectedMoods.push(mood);
        moodCircle.classList.add('selected'); // Add selected class
    }
}

// Function to aggregate audio feature preferences based on selected moods
function getAggregatedAudioFeatures() {
    let featureTotals = { energy: 0, tempo: 0, danceability: 0 };
    let count = 0;

    selectedMoods.forEach(mood => {
        const features = moodToAudioFeatures[mood];
        if (features) {
            featureTotals.energy += features.energy;
            featureTotals.tempo += features.tempo;
            featureTotals.danceability += features.danceability;
            count++;
        }
    });

    // Average out features if any moods were selected
    return count > 0
        ? {
            energy: featureTotals.energy / count,
            tempo: featureTotals.tempo / count,
            danceability: featureTotals.danceability / count
        }
        : null;
}

// Event listener for confirm button
document.getElementById('confirm-button').addEventListener('click', () => {
    // Save selected moods in localStorage
    localStorage.setItem('selectedMoods', JSON.stringify(selectedMoods));

    // Get the aggregated audio features
    const audioPreferences = getAggregatedAudioFeatures();
    if (audioPreferences) {
        localStorage.setItem('audioPreferences', JSON.stringify(audioPreferences));
    }

    // Redirect to the artist selection page
    window.location.href = 'artists.html';
});

// Run function on page load
window.onload = function() {
    if (document.querySelector('.mood-grid')) {
        generateMoodCircles();
    }
};
