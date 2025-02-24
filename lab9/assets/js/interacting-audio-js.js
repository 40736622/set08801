let ao = document.getElementById("my_audio");
let rangeDuration = document.getElementById("duration");
let audioProgress = document.getElementById("audio-progress");
let playBtn = document.getElementById("playBtn");
let muteButton = document.getElementById("mute-btn");

ao.load();

/**
 * Event Listener that formats the span text to match the total duration of the audio file
*/
ao.addEventListener("loadedmetadata", () => {
    rangeDuration.max = ao.duration;
    // Format duration as MM:SS
    let minutes = Math.floor(ao.duration / 60);
    let seconds = Math.floor(ao.duration % 60).toString().padStart(2, '0');

    document.getElementById("audio-end").innerHTML = `${minutes}:${seconds}`;
});

/**
 * Event Listener that updates the range input and audio progress span with the timeupdate event
 * for the audio file.
*/
ao.addEventListener("timeupdate", (e) => {
    let minutes = Math.floor(e.target.currentTime / 60);
    let seconds = Math.floor(e.target.currentTime % 60).toString().padStart(2, '0');

    rangeDuration.value = e.target.currentTime;

    audioProgress.innerHTML = `${minutes}:${seconds}`;
});

/**
 * Event Listener for range input, that adds seeking functionality.
*/
rangeDuration.addEventListener("change", (e) => {
    ao.currentTime = e.target.value;
});

/**
 * Function that plays and pauses the audio file. It also switches the icon depending on the playing state.
*/
function playPause() {
    let playBtnIcon = document.getElementById("icon");
    if (ao.paused) {
        ao.play();

        playBtn.title = "Pause";
        playBtnIcon.classList.remove("bi-play-fill");
        playBtnIcon.classList.add("bi-pause-fill");
    } else {
        ao.pause();

        playBtn.title = "Play";
        playBtnIcon.classList.remove("bi-pause-fill");
        playBtnIcon.classList.add("bi-play-fill");
    }
}

/**
 * Function that toggles the looping of the audio file.
*/
function toggle_loop() {
    if (ao.loop) {
        ao.loop = false;
    } else {
        ao.loop = true;
    }

    ao.load();
}

/**
 * Function that toggles between mute and unmute for the audio file.
*/
function mute() {
    let muteIcon = document.getElementById("mute-icon");
    if (!ao.muted) {
        ao.muted = true;
        muteButton.title = "Unmute";
        muteIcon.classList.remove("bi-volume-mute-fill");
        muteIcon.classList.add("bi-volume-up-fill");
    } else {
        ao.muted = false;
        muteButton.title = "Mute";
        muteIcon.classList.remove("bi-volume-up-fill");
        muteIcon.classList.add("bi-volume-mute-fill");
    }
}