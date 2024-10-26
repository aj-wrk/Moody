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
    document.getElementById('user-email').textContent = data.email;
}

fetchUserProfile();