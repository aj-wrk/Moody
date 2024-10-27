// Get the access token from localStorage
const accessToken = localStorage.getItem('accessToken');
const selectedArtists = JSON.parse(localStorage.getItem('selectedArtists')) || [];
const selectedMoods = JSON.parse(localStorage.getItem('selectedMoods')) || []; // Updated to use 'selectedMoods'
const audioPreferences = JSON.parse(localStorage.getItem('audioPreferences')) || {}; // Updated to use 'audioPreferences'

// Check if the access token is present
if (!accessToken) {
    alert("No access token found. Please authenticate first.");
    window.location.href = "index.html"; // Redirect if no token
}

// Function to fetch tracks based on moods and selected artists
async function fetchTracksBasedOnMoodsAndArtists() {
    const tracks = [];

    for (const artist of selectedArtists) {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const artistId = data.artists.items[0]?.id;

            if (artistId) {
                // Fetch related tracks based on artist ID
                const trackResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (trackResponse.ok) {
                    const trackData = await trackResponse.json();
                    // Filter tracks based on audio feature preferences
                    const filteredTracks = trackData.tracks.filter(track => {
                        // Check track features against aggregated audio preferences
                        const { energy, tempo, danceability } = audioPreferences;

                        return (
                            track.energy >= energy - 0.1 && track.energy <= energy + 0.1 &&
                            track.tempo >= tempo - 5 && track.tempo <= tempo + 5 &&
                            track.danceability >= danceability - 0.1 && track.danceability <= danceability + 0.1
                        );
                    });
                    tracks.push(...filteredTracks);
                }
            }
        }
    }
    return tracks;
}

// Function to create the Spotify playlist
async function createSpotifyPlaylist(tracks) {
    const playlistName = `Custom Playlist - Moods: ${selectedMoods.join(', ')}`;
    const url = 'https://api.spotify.com/v1/me/playlists';

    const playlistData = {
        name: playlistName,
        description: 'A playlist created based on your selected moods and artists.',
        public: true
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlistData)
    });

    if (!response.ok) {
        throw new Error('Failed to create playlist');
    }

    const createdPlaylist = await response.json();
    const trackURIs = tracks.map(track => `spotify:track:${track.id}`);

    // Add tracks to the newly created playlist
    const addTracksUrl = `https://api.spotify.com/v1/playlists/${createdPlaylist.id}/tracks`;
    await fetch(addTracksUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: trackURIs })
    });

    return createdPlaylist.id; // Return the playlist ID for later use
}

// Event listener for the create playlist button
document.getElementById('create-playlist-btn').addEventListener('click', async () => {
    document.getElementById('playlist-message').textContent = 'Creating your playlist...';

    try {
        const tracks = await fetchTracksBasedOnMoodsAndArtists();
        if (tracks.length === 0) {
            document.getElementById('playlist-message').textContent = 'No suitable tracks found for the selected moods and artists.';
            return;
        }

        const playlistId = await createSpotifyPlaylist(tracks);
        localStorage.setItem('playlistId', playlistId); // Store the playlist ID for later access
        document.getElementById('playlist-message').textContent = 'Playlist created successfully!';

        // Optionally redirect to another page or show the playlist
        setTimeout(() => {
            window.location.href = 'playlist.html';
        }, 2000);
    } catch (error) {
        document.getElementById('playlist-message').textContent = 'Error creating playlist: ' + error.message;
    }
});
