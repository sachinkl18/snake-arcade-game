// =========================
// CONTROLS MODULE
// =========================

document.addEventListener("keydown", (e) => {

    switch (e.key) {

        case "ArrowUp":
        case "w":
        case "W":
            if (direction !== "DOWN") nextDirection = "UP";
            break;

        case "ArrowDown":
        case "s":
        case "S":
            if (direction !== "UP") nextDirection = "DOWN";
            break;

        case "ArrowLeft":
        case "a":
        case "A":
            if (direction !== "RIGHT") nextDirection = "LEFT";
            break;

        case "ArrowRight":
        case "d":
        case "D":
            if (direction !== "LEFT") nextDirection = "RIGHT";
            break;

        case "p":
        case "P":
            gamePaused = !gamePaused;
            break;

        case "r":
        case "R":
            initGame();
            break;
    }
});

// =========================
// TOUCH SWIPE SUPPORT
// =========================

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

canvas.addEventListener("touchend", (e) => {

    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && direction !== "LEFT") nextDirection = "RIGHT";
        if (dx < 0 && direction !== "RIGHT") nextDirection = "LEFT";
    } else {
        if (dy > 0 && direction !== "UP") nextDirection = "DOWN";
        if (dy < 0 && direction !== "DOWN") nextDirection = "UP";
    }

}, { passive: true });
