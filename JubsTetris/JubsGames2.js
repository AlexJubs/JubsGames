const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(10,10)

var dropCounter = 0;
var dropInterval = 5000;
var lastTime = 0;
var keepGoingDown = true;

function draw() {
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);

	drawMatrix(player.matrix , player.pos);
};

function update(time = 0) {
	const deltaTime = time - lastTime;

	dropCounter = time + dropCounter;
	if (dropCounter > dropInterval){
		console.log(player.pos.x , player.pos.y)
	};


	draw();
	requestAnimationFrame(update); 
};

function drawMatrix(matrix, offset) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value != 0) {
				context.fillStyle = 'purple';
				context.fillRect(x + offset.x,
								 y + offset.y,
								  1, 1);
			}
		});
	});
};

const matrix = [
	[1, 1, 1],
	[1, 0, 1],
	[1, 1, 1],
];

const player = {
	pos: {x:2 , y:0},
	matrix: matrix,
}

document.addEventListener('keydown', event => {
	if (event.keyCode == 37) {
		player.pos.x = player.pos.x - 1;
	}
	else if (event.keyCode == 39) {
		player.pos.x = player.pos.x + 1;
	}
	else if (event.keyCode == 40) {
		player.pos.y = player.pos.y + 1;
	}
	else if (event.keyCode == 38) {
		player.pos.y = player.pos.y - 1;
	}
});

console.log(canvas.height, canvas.width)

update();