const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(10,10)

var score = 0;

const matrix = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0],
];

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function playerDrop (){
	player.pos.y = player.pos.y + 1;
	if (collide(arena, player) == true) {
		player.pos.y--;
		merge(arena,player);
		player.pos.y = -1;
	}
	dropCounter = 0;
};

function createMatrix(w, h) {
	const matrix = [];
	while (h != 0) {
		matrix.push(new Array(w).fill(0));
		h = h-1;
	}
	return matrix;
}

function addScore(type){
	if (type == 'land'){
		score = score + 10;
		document.querySelector('h2').innerHTML = "Score: " + score;
		console.log(score);
	}

	else if (type == "clear"){
		score = score + 100;
		document.querySelector('h2').innerHTML = "Score: " + score;
		console.log(score);
	}
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    lastTime = time;

    draw();
    requestAnimationFrame(update);
}

function drawMatrix(matrix, offset) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value != 0) {
				context.fillStyle = 'rgb(40, 167, 69)';
				context.fillRect(x + offset.x,
								 y + offset.y,
								  1, 1);
			}
		});
	});
};

function playerMove(offset) {
    player.pos.x += offset;
    if (collide(arena, player)) {
        player.pos.x -= offset;
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
        matrix.forEach(row => row.reverse());
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

const arena = createMatrix(30, 15);

const player = {
	pos: {x:5 , y:-1},
	matrix: matrix,
}

document.addEventListener('keydown', event => {
	if (event.keyCode == 37) {
		playerMove(-1)	
	}
	else if (event.keyCode == 39) {
		playerMove(1)
	}
	else if (event.keyCode == 40) {
		playerDrop();
	}
	else if (event.keyCode == 38) {
		rotate(player.matrix,1)
	}
});

console.log(canvas.height, canvas.width)

update();