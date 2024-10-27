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
