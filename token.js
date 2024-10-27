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

// Fetch user profile
async function fetchUserProfile() {
    try {
        const data = await fetchFromAPI('me');
        document.getElementById('user-name').textContent = data.display_name;
        // Check if there are images and set the profile photo
        if (data.images && data.images.length > 0) {
            document.getElementById('user-photo').src = data.images[0].url;
        } else {
            document.getElementById('user-photo').src = 'default-photo-url.jpg';
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

fetchUserProfile();