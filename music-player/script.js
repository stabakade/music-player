const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
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

// Update progress bar and time
function updateProgressBar(e) {
    if(isPlaying) {
        // console.log(e);  
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);

        // update progress bar
        const progressPercent = (currentTime / duration ) * 100;
        progress.style.width = `${progressPercent}%`;

        // calculate duration display 
        const durationMinutes = Math.floor(duration / 60);
        // console.log(durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // console.log(durationSeconds);
        // durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        // delay switching duration element to avoid Nan
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        }

        // calculate duration display 
        const currentMinutes = Math.floor(currentTime / 60);
        // console.log(currentMinutes);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        // console.log(durationSeconds);
        // durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        // delay switching duration element to avoid Nan
        if (currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

        }

    }
}


function setProgressBar(e) {
    const width = this.clientWidth;
    const clickCX = e.offsetX;

    const { duration } = music;
    music.currentTime = (clickCX / width) * duration;
     
} 

// event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);