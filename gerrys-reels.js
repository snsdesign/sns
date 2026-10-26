/* Only the reel selected by the visitor should play audio. */
(() => {
    const reels = [...document.querySelectorAll('.gerrys-reels-grid video')];
    reels.forEach(reel => {
        reel.addEventListener('play', () => {
            reels.forEach(other => { if (other !== reel) other.pause(); });
        });
    });
})();
