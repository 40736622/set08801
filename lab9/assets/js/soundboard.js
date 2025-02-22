function playSound(filename) {
    let audio = new Audio('./assets/audio/' + filename);
    audio.play().catch(e => console.error('Playback error:', e));
}