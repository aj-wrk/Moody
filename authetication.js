// Spotify Application Credentials
const client_id = '5ce6c394f74f4c7bb2bcffef6bff236a';
const redirect_uri = 'https://aj-wrk.github.io/Moody/steps.html'; // Set to match your environment

// Redirects to Spotify's authorization URL
document.getElementById('login-btn').onclick = function() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=user-read-private%20user-read-email%20playlist-modify-public`;
    window.location.href = authUrl;
};