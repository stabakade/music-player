const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music List
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chil Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Electric Chil Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric Chil Machine',
        artist: 'Jacinto Design',
    },
];

// check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

}

// current song
let songIndex = 1;

// prev song
function prevSong() {
    songIndex--;
    loadSong(songs[songIndex]);
    playSong();
}

// next song
function nextSong() {
    songIndex++;
    loadSong(songs[songIndex]);
    playSong();
}

// on load select first song
loadSong(songs[songIndex]);

// event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);