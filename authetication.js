// Spotify Application Credentials
const client_id = '3846657102cf486bbfbe1fd5af8a1bb6';
const redirect_uri = 'https://aj-wrk.github.io/test_spotify/steps'; // Set to match your environment

// Redirects to Spotify's authorization URL
document.getElementById('login-btn').onclick = function() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=user-read-private%20user-read-email%20playlist-modify-public`;
    window.location.href = authUrl;
};