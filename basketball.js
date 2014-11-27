var bb = {};

bb.ratio = 8.2;

bb.court = {
	width: 94,
	height: 50,
	innerRadius: 2,
	outerRadius: 6,
	paintWidth: 19,
	paintHeight: 16,
	markingHeight: 12,
	threeWidth: 14,
	threeHeight: 44,
	threeRadius: 23.75,
	hoopRadius: 1,
	boardSpace: 4,
	boardLength: 6,
	penaltyWidth: 1.25,
	penaltyRadius: 4,
	ballRadius: 0.75
}

bb.matchRatio = function(){
	_.each(bb.court,function(val,key){
		bb.court[key] = val*bb.ratio;
	})
}



bb.drawCourt = function(c,ctx){
	ctx.strokeStyle = 'white';

	//Court
	ctx.translate((c.width-bb.court.width)/2,(c.height-bb.court.height)/2);
	ctx.strokeRect(0,0,bb.court.width,bb.court.height);

	//Painted Area
	ctx.strokeRect(0,(bb.court.height-bb.court.paintHeight)/2,bb.court.paintWidth,bb.court.paintHeight);
	ctx.strokeRect((bb.court.width-bb.court.paintWidth),(bb.court.height-bb.court.paintHeight)/2,bb.court.paintWidth,bb.court.paintHeight);
	
	ctx.strokeRect(0,(bb.court.height-bb.court.markingHeight)/2,bb.court.paintWidth,bb.court.markingHeight);
	ctx.strokeRect((bb.court.width-bb.court.paintWidth),(bb.court.height-bb.court.markingHeight)/2,bb.court.paintWidth,bb.court.markingHeight);
	
	//Mid-court Line
	ctx.moveTo(bb.court.width/2,0);
	ctx.lineTo(bb.court.width/2,bb.court.height);
	ctx.stroke();	

	//Board and Hoop
	ctx.beginPath();
	ctx.translate(bb.court.boardSpace,(bb.court.height-bb.court.boardLength)/2);
	ctx.moveTo(0,0);
	ctx.lineTo(0,bb.court.boardLength);
	ctx.strokeStyle = 'rgb(255, 77, 0)';
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(bb.court.hoopRadius,bb.court.boardLength/2,bb.court.hoopRadius,0,2*Math.PI);
	ctx.stroke();

	ctx.translate(bb.court.width-bb.court.boardSpace*2,0);
	ctx.moveTo(0,0);
	ctx.lineTo(0,bb.court.boardLength);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(-bb.court.hoopRadius,bb.court.boardLength/2,bb.court.hoopRadius,0,2*Math.PI);
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = 'white';
	ctx.translate(-(bb.court.width-bb.court.boardSpace*2),0);
	ctx.translate(-bb.court.boardSpace,-(bb.court.height-bb.court.boardLength)/2);


	//Three Point Line
	ctx.moveTo(0,(bb.court.height-bb.court.threeHeight)/2);
	ctx.lineTo(bb.court.threeWidth,(bb.court.height-bb.court.threeHeight)/2);
	ctx.stroke();	
	ctx.beginPath();
	ctx.arc((bb.court.boardSpace+bb.court.hoopRadius),bb.court.height/2,bb.court.threeRadius,-1.18,-1.62*Math.PI);
	ctx.stroke();
	

	ctx.moveTo(0,((bb.court.height-bb.court.threeHeight)/2+bb.court.threeHeight));
	ctx.lineTo(bb.court.threeWidth,((bb.court.height-bb.court.threeHeight)/2+bb.court.threeHeight));
	ctx.stroke();

	ctx.moveTo((bb.court.width-bb.court.threeWidth),(bb.court.height-bb.court.threeHeight)/2);
	ctx.lineTo(bb.court.width,(bb.court.height-bb.court.threeHeight)/2);
	ctx.stroke();	

	ctx.moveTo((bb.court.width-bb.court.threeWidth),((bb.court.height-bb.court.threeHeight)/2+bb.court.threeHeight));
	ctx.lineTo(bb.court.width,((bb.court.height-bb.court.threeHeight)/2+bb.court.threeHeight));
	ctx.stroke();
	ctx.beginPath();
	ctx.arc((bb.court.width-bb.court.boardSpace-bb.court.hoopRadius),bb.court.height/2,bb.court.threeRadius,1.96,1.381*Math.PI);
	ctx.stroke();

	//Penalty Area
	ctx.beginPath();
	ctx.arc((bb.court.boardSpace+bb.court.hoopRadius),bb.court.height/2,bb.court.penaltyRadius,-Math.PI/2,-1.5*Math.PI);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(bb.court.width-(bb.court.boardSpace+bb.court.hoopRadius),bb.court.height/2,bb.court.penaltyRadius,Math.PI/2,1.5*Math.PI);
	ctx.stroke();


	//Mid-Court Circle
	ctx.beginPath();
	ctx.arc(bb.court.width/2,bb.court.height/2,bb.court.innerRadius,0,2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(bb.court.width/2,bb.court.height/2,bb.court.outerRadius,0,2*Math.PI);
	ctx.stroke();

	//Free-Throw Circle
	ctx.beginPath();
	ctx.arc(bb.court.paintWidth,bb.court.height/2,bb.court.outerRadius,-Math.PI/2,-1.5*Math.PI);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc((bb.court.width-bb.court.paintWidth),bb.court.height/2,bb.court.outerRadius,Math.PI/2,1.5*Math.PI);
	ctx.stroke();

	ctx.setLineDash([5]);

	ctx.beginPath();
	ctx.arc(bb.court.paintWidth,bb.court.height/2,bb.court.outerRadius,Math.PI/2,1.5*Math.PI);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc((bb.court.width-bb.court.paintWidth),bb.court.height/2,bb.court.outerRadius,-Math.PI/2,-1.5*Math.PI);
	ctx.stroke();
	ctx.setLineDash([0]);
	ctx.translate(-(c.width-bb.court.width)/2,-(c.height-bb.court.height)/2);
}

//Speed is feet per 30 milliseconds
bb.player = {
	name: 'Jacky',
	speed: 0.75,
	shootingSpeed: 0.6
}

bb.drawBall = function(canvas,context,x,y){
	context.translate((canvas.width-bb.court.width)/2,(canvas.height-bb.court.height)/2);
	context.fillStyle = 'rgb(184, 82, 48)'
	context.beginPath();
	context.arc(x*bb.ratio,y*bb.ratio,bb.court.ballRadius,0,2*Math.PI)
	context.fill();
	context.translate(-(canvas.width-bb.court.width)/2,-(canvas.height-bb.court.height)/2);
}

bb.drawPlayer = function(canvas,context,x,y){
	context.translate((canvas.width-bb.court.width)/2,(canvas.height-bb.court.height)/2);
	context.fillStyle = 'blue'
	context.beginPath();
	context.arc(x*bb.ratio,y*bb.ratio,1*bb.ratio,0,2*Math.PI);
	context.fill();

	if(bb.possession === 'player' || bb.possession === 'inPos'){
		context.beginPath();
		context.fillStyle = 'rgb(184, 82, 48)'
		context.arc(x*bb.ratio-0.5*bb.ratio,y*bb.ratio-0.5*bb.ratio,bb.court.ballRadius,0,2*Math.PI);
		context.fill();
	}

	context.translate(-(canvas.width-bb.court.width)/2,-(canvas.height-bb.court.height)/2);
}

bb.playerPos = {
	x: 44,
	y: 25
}

bb.ballPos = {
	x: 19,
	y: 25
}

bb.hoopPos = {
	x: 5,
	y: 25
}

bb.possession = 'loose';

bb.getRandom = function(){
	var tX = Math.floor((Math.random()*25)+4);
	var tY = Math.floor((Math.random()*50));

	return {x: tX, y: tY};
}


bb.movePlayer = function(tX,tY){
	var dX = tX - bb.playerPos.x;
	var dY = tY - bb.playerPos.y;
	var dC = Math.sqrt(dX*dX+dY*dY);

	var dXdt = Math.abs(dX*(bb.player.speed/dC));
	var dYdt = Math.abs(dY*(bb.player.speed/dC));

	if(dX < 0){
		bb.playerPos.x = bb.playerPos.x - dXdt;
	} else if (dX > 0){
		bb.playerPos.x = bb.playerPos.x + dXdt;
	}

	if(dY < 0){
		bb.playerPos.y = bb.playerPos.y - dYdt;
	} else if (dY > 0){
		bb.playerPos.y = bb.playerPos.y + dYdt;
	}

	if(dX < bb.player.speed && dX > -bb.player.speed){
		bb.playerPos.x = tX;
	}

	if(dY < bb.player.speed && dY > -bb.player.speed){
		bb.playerPos.y = tY;
	}

	

	if(dX === 0 && dY === 0){
		bb.ballPos = {
			x: bb.playerPos.x,
			y: bb.playerPos.y
		}
		return true;
	}

}

bb.moveBall = function(x,y){
	var dX = x - bb.ballPos.x;
	var dY = y - bb.ballPos.y;
	var dC = Math.sqrt(dX*dX+dY*dY);

	var dXdt = Math.abs(dX*(bb.player.shootingSpeed/dC));
	var dYdt = Math.abs(dY*(bb.player.shootingSpeed/dC));

	console.log(dXdt, dYdt)

	if(dX < 0){
		bb.ballPos.x = bb.ballPos.x - dXdt;
	} else if (dX > 0){
		bb.ballPos.x = bb.ballPos.x + dXdt;
	}

	if(dY < 0){
		bb.ballPos.y = bb.ballPos.y - dYdt;
	} else if (dY > 0){
		bb.ballPos.y = bb.ballPos.y + dYdt;
	}

	if(dX < bb.player.shootingSpeed && dX > -bb.player.shootingSpeed){
		bb.ballPos.x = bb.hoopPos.x;
	}

	if(dY < bb.player.shootingSpeed  && dY > -bb.player.shootingSpeed){
		bb.ballPos.y = bb.hoopPos.y;
	}

	if(dX === 0 && dY === 0){
		return true;
	}
}

bb.render = function(c,ctx){
	ctx.clearRect(0,0,c.width,c.height);
	bb.drawCourt(c,ctx);
	if(bb.possession!=='player'){
		bb.drawBall(c,ctx,bb.ballPos.x,bb.ballPos.y);
	}
	bb.drawPlayer(c,ctx,bb.playerPos.x,bb.playerPos.y);
}




//Rendering Script
$(document).ready(function(){
	bb.matchRatio();
	var c = document.getElementById('court');
	var ctx = c.getContext('2d');
	var tar;

	var rendering = setInterval(function(){
		if(bb.possession === 'loose'){
			var t = bb.ballPos;
			if(bb.movePlayer(t.x,t.y)){
				bb.possession = 'player';
				tar = bb.getRandom();
			}
		} else if (bb.possession === 'player'){
			if(bb.movePlayer(tar.x,tar.y)){
				bb.possession = 'ready';
			}
		} else if (bb.possession = 'ready') {
			var t = bb.hoopPos;
			if(bb.moveBall(t.x,t.y)){
				bb.possession = 'loose';
			}
		}
		
		bb.render(c,ctx);
	},30)


})