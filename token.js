// Get the access token from the URL hash
const accessToken = window.location.hash.split('&')[0].split('=')[1];

// Store the access token in local storage if it exists
if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
} else {
    // Retrieve the access token from local storage
    const storedToken = localStorage.getItem('accessToken');

    // If no token is found in local storage, redirect to the login page
    if (!storedToken) {
        window.location.href = 'index.html';
    }
}

// Get the token from local storage
const token = localStorage.getItem('accessToken');

async function fetchUserProfile() {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': 'Bearer ' + token }
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