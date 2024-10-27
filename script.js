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