const ao = document.getElementById("my-audio");
const rangeDuration = document.getElementById("duration");
const volume = document.getElementById("volume");
const audioProgress = document.getElementById("audio-progress");
const playBtn = document.getElementById("play-btn");
const toggleBtn = document.getElementById("toggle-btn")
const muteButton = document.getElementById("mute-btn");
const playBtnIcon = document.getElementById("icon");
const toggleIcon = document.getElementById("toggle-icon");
const muteIcon = document.getElementById("mute-icon");

ao.load();

/**
 * Event Listener that formats the span text to match the total duration of the audio file
*/
ao.addEventListener("loadedmetadata", () => {
    // Setting range max attribute
    rangeDuration.max = ao.duration;

    document.getElementById("audio-end").textContent = formatTime(ao.duration);
});

/**
 * Event Listener that updates the range input and audio progress span with the timeupdate event
 * for the audio file.
*/
ao.addEventListener("timeupdate", (e) => {
    rangeDuration.value = e.target.currentTime;

    audioProgress.textContent = formatTime(e.target.currentTime);
});

/** 
 * Event Listener that adds the play icon and remove the pause icon once the audio has ended.
*/
ao.addEventListener("ended", () => {
    playBtnIcon.classList.remove("bi-pause-fill");
    playBtnIcon.classList.add("bi-play-fill");
});

/**
 * Event Listener for duration range input, that adds seeking functionality.
*/
rangeDuration.addEventListener("input", (e) => {
    ao.currentTime = e.target.value;
});

/**
 * Event Listener for volume range input, that adds volume functionality.
*/
volume.addEventListener("input", (e) => {
    ao.volume = e.target.value;
});

/**
 * Function that plays and pauses the audio file. It also switches the icon depending on the playing state.
*/
function playPause() {
    if (ao.paused) {
        ao.play();

        playBtn.title = "Pause";
        swapIcon(playBtnIcon, "bi-play-fill", "bi-pause-fill");
    } else {
        ao.pause();

        playBtn.title = "Play";
        swapIcon(playBtnIcon, "bi-pause-fill", "bi-play-fill");
    }
}

/**
 * Function that toggles the looping of the audio file.
*/
function toggleLoop() {
    if (ao.loop) {
        ao.loop = false;

        toggleBtn.title = "Loop";
        swapIcon(toggleIcon, "bi-slash-circle", "bi-arrow-repeat");
    } else {
        ao.loop = true;
        toggleBtn.title = "Unloop";
        swapIcon(toggleIcon, "bi-arrow-repeat", "bi-slash-circle");
    }
}

/**
 * Function that toggles between mute and unmute for the audio file.
*/
function mute() {
    if (!ao.muted) {
        ao.muted = true;
        muteButton.title = "Unmute";
        swapIcon(muteIcon, "bi-volume-up-fill", "bi-volume-mute-fill");
    } else {
        ao.muted = false;
        muteButton.title = "Mute";
        swapIcon(muteIcon, "bi-volume-mute-fill", "bi-volume-up-fill");
    }
}

/**
 * 
 * @param {HTMLElement} iconElement - html element holding the icon
 * @param {String} oldIcon - old icon that will be removed
 * @param {String} newIcon - new icon that will be added
 */
function swapIcon(iconElement, oldIcon, newIcon) {
    if (!iconElement.classList.contains(newIcon)) {
        iconElement.classList.remove(oldIcon);
        iconElement.classList.add(newIcon);
    }
}

/**
 * 
 * @param {Number} seconds - time duration in seconds
 * @returns {String} formatted string to represent time in MM:SS 
 */
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}