const canvas = document.getElementById('plocha');
const menu = document.getElementById('menu');
const context = canvas.getContext('2d');
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    context.stroke();
    context.beginPath();
});


const draw = (e) => {
    if (!isPainting) {
        return;
    }

    context.lineWidth = lineWidth;
    context.lineCap = 'round';

    context.lineTo(e.clientX - canvasOffsetX, e.clientY);
    context.stroke();
}

canvas.addEventListener('mousemove', draw);

function ulozKresbu() {

    let imageData = canvas.toDataURL();
    localStorage.setItem("img", imageData);
}

function nactiKresbu() {

    let imageData = localStorage.getItem("img");
    let img = new Image();
    img.src = imageData;
    context.drawImage(img, 0, 0);
}

menu.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        context.strokeStyle = e.target.value;
    }
    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});


menu.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
});

menu.addEventListener('click', e => {
    if (e.target.id === 'save') {
        ulozKresbu();
    }
});

menu.addEventListener('click', e => {
    if (e.target.id === 'load') {
        nactiKresbu();
    }
});

menu.addEventListener('click', e => {
    if (e.target.id === 'reset') {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ulozKresbu();
    }
});

document.addEventListener("keydown", e => {
    if (e.key === "r") {
        location.reload();
    }
});

