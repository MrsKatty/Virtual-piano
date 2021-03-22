function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
    if (!audio) return; //stop the function from running all together
    audio.currentTime = 0;
    audio.play();
    key.classList.add("piano-key-active");
}

function playClick(event) {
    const audio = document.querySelector(`audio[data-key="${event.target.dataset.key}"]`);
    const key = document.querySelector(`.piano-key[data-key="${event.target.dataset.key}"]`);
    if (!audio) return; //stop the function from running all together
    audio.currentTime = 0;
    audio.play();
    event.target.classList.add("piano-key-active");
}

function removeTransition(e) {
    if (e.propertyName !== "transform") return; // skip it if it's not a transform 
    this.classList.remove("piano-key-active");
}

const keys = document.querySelectorAll(".piano-key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);
keys.forEach(key => key.addEventListener('click', (e) => {
    playClick(e)
}))

const PIANO = document.querySelector(".piano");

const startSound = (event) => {
    event.target.classList.add("piano-key-active");
}

const stopSound = (event) => {
    event.target.classList.remove("piano-key-active");
    console.log('stop')
}

const startCorrespondOver = (event) => {
    if (event.target.classList.contains("piano-key")) {
        event.target.classList.add("piano-key-active");
        keys.forEach((elem) => {
            elem.addEventListener("mouseover", playClick)
            elem.addEventListener("mouseout", stopSound)
        });
    }
   
}

const stopCorrespondOver = () => {
    keys.forEach((elem) => {
        elem.classList.remove("piano-key-active")
        elem.removeEventListener("mouseover", playClick)
        elem.removeEventListener("mouseout", stopSound)
    })
}

PIANO.addEventListener("mousedown", startCorrespondOver, false);
PIANO.addEventListener("mouseup", stopCorrespondOver)

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

const fullScreenBtn = document.querySelector('.fullscreen')
fullScreenBtn.addEventListener('click', toggleFullScreen)

const btnLatters = document.querySelector(".btn-letters");
const btnNotes = document.querySelector(".btn-notes");

btnLatters.addEventListener('click', () => {
    btnNotes.classList.remove("btn-active");
    btnLatters.classList.add("btn-active")
    keys.forEach(key => key.classList.add('piano-key-letter'))
})
btnNotes.addEventListener('click', () => {
    keys.forEach(key => key.classList.remove('piano-key-letter'))
    btnNotes.classList.add("btn-active");
    btnLatters.classList.remove("btn-active");
})