const canvas = document.getElementById('plocha');
const menu = document.getElementById('menu');
const tmp = canvas.getContext('2d');
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;


menu.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        tmp.clearRect(0, 0, canvas.width, canvas.height);
    }
});

menu.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        tmp.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }

});

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    tmp.stroke();
    tmp.beginPath();
});


const draw = (e) => {
    if (!isPainting) {
        return;
    }

    tmp.lineWidth = lineWidth;
    tmp.lineCap = 'round';

    tmp.lineTo(e.clientX - canvasOffsetX, e.clientY);
    tmp.stroke();
}


canvas.addEventListener('mousemove', draw);








