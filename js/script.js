var me = true;
var over = false;


var chessBoard = [];
for (var i = 0; i < 15; i++){
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++){
		chessBoard[i][j] = 0;
	}
}

//赢法数组
var wins = [];
for (var i = 0; i < 15; i++){
	wins[i] = [];
	for (var j = 0; j < 15; j++){
		wins[i][j] = [];
	}
}
//赢法数量
var count = 0;
//赢法棋谱，穷举
//横线赢法
for (var i = 0; i < 15; i++){
	for (var j = 0; j < 11; j++){
		for (var k = 0; k < 5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//竖线赢法
for (var i = 0; i < 11; i++){
	for (var j = 0; j < 15; j++){
		for (var k = 0; k < 5; k++){
			wins[i+k][j][count] = true;
		}
		count++;
	}
}
//斜线赢法
for (var i = 0; i < 11; i++){
	for (var j = 0; j < 11; j++){
		for (var k = 0; k < 5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反斜线赢法
for (var i = 0; i < 11; i++){
	for (var j = 0; j < 11; j++){
		for (var k = 0; k < 5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}


var myWin = [];
var computerWin = [];

for (var i = 0; i < count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#676767";

var logo = new Image();
logo.src="images/moon.png";
logo.onload=function(){
	context.drawImage(logo,0,0,450,450);
	drawChessBoard();

}

var drawChessBoard = function(){
for (var i=0; i<15; i++)
{
	context.moveTo(15 + i*30, 15);
	context.lineTo(15 + i*30, 435);
	context.stroke();
	context.moveTo(15, 15 + i*30);
	context.lineTo(435, 15 + i*30);
	context.stroke();
	context.stroke();
}
}

var oneStep = function(i,j,me){
	context.beginPath();
	context.arc(15 + i*30 , 15 + j*30, 13, 0, 2 * Math.PI);
	context.closePath();
	var gradient=context.createRadialGradient(15 + i*30 +2, 15 + j*30 - 2, 13, 15 + i*30 +2,15 + j*30 -2, 0);
	if(me){
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	}else{
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	context.fillStyle=gradient;
	context.fill();
}

chess.onclick = function (e){ 
	var x = e.offsetX;
	var y = e.offsetY;
	i = Math.floor(x / 30);
	j = Math.floor(y / 30);
	if (chessBoard[i][j] == 0){
	oneStep(i,j,me);
	if(me){ 
		chessBoard[i][j] = 1;
	}else { 
		chessBoard[i][j] = 2;
	}
	me = !me;

    }
}
