let accessToken = window.location.hash ? window.location.hash.split('&')[0].split('=')[1] : null;

// Check for token in localStorage if it wasn't found in the URL
if (!accessToken) {
    accessToken = localStorage.getItem('accessToken');
} else {
    // Store the access token in localStorage for future use if it came from the URL
    localStorage.setItem('accessToken', accessToken);
}

// Redirect to login if access token is still not available
if (!accessToken) {
    window.location.href = 'index.html';
}

// Function to fetch user profile data from Spotify
async function fetchUserProfile() {
    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (response.ok) {
            const data = await response.json();

            // Update the UI with user's profile data
            document.getElementById('user-name').textContent = data.display_name || 'User';
            document.getElementById('user-photo').src = data.images?.[0]?.url || 'default-photo-url.jpg';
        } else if (response.status === 401) {
            // If token is invalid, clear it from storage and redirect to login
            localStorage.removeItem('accessToken');
            window.location.href = 'index.html';
        } else {
            console.error('Failed to fetch user profile:', response.status);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

// Fetch user profile information if access token is available
fetchUserProfile();

