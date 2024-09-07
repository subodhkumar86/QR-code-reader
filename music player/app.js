// DOM elements
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const coverImg = document.getElementById('cover-img');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volume-control');

// Track list
const tracks = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "song1.mp3",
        cover: "cover1.jpg"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "song2.mp3",
        cover: "cover2.jpg"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        src: "song3.mp3",
        cover: "cover3.jpg"
    }
];

let trackIndex = 0;

// Load track details
function loadTrack(track) {
    title.textContent = track.title;
    artist.textContent = track.artist;
    audio.src = track.src;
    coverImg.src = track.cover;
}

// Load initial track
loadTrack(tracks[trackIndex]);

// Play/Pause functionality
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    } else {
        audio.pause();
        playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
    }
}

// Update progress bar and time
function updateProgress() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;

    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60);
    if (seconds < 10) seconds = `0${seconds}`;
    currentTimeEl.textContent = `${minutes}:${seconds}`;

    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
}

// Next/Previous track controls
function nextTrack() {
    trackIndex = (trackIndex + 1) % tracks.length;
    loadTrack(tracks[trackIndex]);
    audio.play();
    playPauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(tracks[trackIndex]);
    audio.play();
    playPauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}

// Set volume control
volumeControl.addEventListener('input', function() {
    audio.volume = volumeControl.value / 100;
});

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateProgress);
