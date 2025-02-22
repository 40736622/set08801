let context = new (window.AudioContext || window.webkitAudioContext)();
let gain = context.createGain();
gain.connect(context.destination);
gain.gain.setValueAtTime(0, context.currentTime);

let oscillator, wave, freq;
let isPlaying = false;

let icon = document.getElementById("icon");

document.getElementById("mute").addEventListener("click", (e) => {
    if (!isPlaying) {
        oscillator = context.createOscillator();
        oscillator.connect(gain);

        wave = document.querySelector("input[name='wave']:checked").value;
        oscillator.type = wave;

        freq = document.getElementById("frequency").value;
        oscillator.frequency.setValueAtTime(freq, context.currentTime);

        oscillator.start();
        gain.gain.setValueAtTime(1, context.currentTime); // Unmute
        isPlaying = true;

        // change icon to pause
        icon.classList.remove("bi-play-fill");
        icon.classList.add("bi-pause-fill");
    } else {
        gain.gain.setValueAtTime(0, context.currentTime); // Mute
        oscillator.stop();
        isPlaying = false;

        // change icon to play
        icon.classList.remove("bi-pause-fill");
        icon.classList.add("bi-play-fill");
    }
});

document.getElementById("freq-value").innerHTML = document.getElementById("frequency").value;

// Update frequency dynamically
document.getElementById("frequency").addEventListener("input", (e) => {
    document.getElementById("freq-value").innerHTML = e.target.value;
    if (isPlaying) {
        oscillator.frequency.setValueAtTime(e.target.value, context.currentTime);
    }
});

// Update wave type dynamically
document.querySelectorAll("input[name='wave']").forEach((waveOption) => {
    waveOption.addEventListener("change", (e) => {
        if (isPlaying) {
            oscillator.type = e.target.value;
        }
    });
});