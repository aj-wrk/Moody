// Get the access token from the URL if present
let accessToken = window.location.hash.split('&')[0].split('=')[1];

// If there is no access token in the URL, try retrieving it from localStorage
if (!accessToken) {
    accessToken = localStorage.getItem('spotifyAccessToken');
} else {
    // If there is a token, store it in localStorage for future use
    localStorage.setItem('spotifyAccessToken', accessToken);
}

// Redirect to login if access token is still not available
if (!accessToken) {
    window.location.href = 'index.html';
}

// Fetch user profile with stored token
async function fetchUserProfile() {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const data = await response.json();

    // Update user name and profile photo if available
    document.getElementById('user-name').textContent = data.display_name;
    if (data.images && data.images.length > 0) {
        document.getElementById('user-photo').src = data.images[0].url;
    } else {
        document.getElementById('user-photo').src = 'default-photo-url.jpg';
    }
}

fetchUserProfile();
