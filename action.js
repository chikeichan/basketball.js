var action = {};

action.getBall = function(player){
	var t = bb.ball.pos;
	if(bb.action.movePlayer(player,t.x,t.y)){
		bb.possession = 'inHand';
		bb.ball.inHand = true;
		bb.action.shootResult = false;
		bb.action.shootTarget = false;
	}
}

action.getOpenTarget = false;
action.getOpen = function(player,withBall){
	if(!action.getOpenTarget) {
		action.getOpenTarget = action.getRandom();
	}
	if(withBall){
		var t = action.getOpenTarget;
		if(bb.action.movePlayer(player,t.x,t.y)){
			bb.possession = 'inPosition';
			action.getOpenTarget = false;
		}
	}
}

action.getRandom = function(mode){
	var tX = Math.floor((Math.random()*25)+4);
	var tY = Math.floor((Math.random()*50));

	if(mode === 'missed'){
		tX = Math.floor((Math.random()*2)+5);
		tY = Math.floor((Math.random()*2)+24);
	} else if(mode === 'rebound'){
		tX = Math.floor((Math.random()*18)+5);
		tY = Math.floor((Math.random()*16)+17);
	}

	return {x: tX, y: tY};
}

action.shootResult = false;
action.shootTarget = false;
action.shoot = function(player,hoop){
	player.hasBall = false;
	bb.ball.inHand = false;
	if(!action.shootResult && action.shootResult !== 'rebound'){
		action.shootTarget = action.getShootingResult(player,hoop);
	}

	if(action.shootResult === 'scored') {
		if(action.moveBall(action.shootTarget.x,action.shootTarget.y,player.shootSpeed)){
			bb.possession = 'loose';
			action.shootResult = false;
			action.shootTarget = false;
		}
	} else if(action.shootResult === 'missed') {
		if(action.moveBall(action.shootTarget.x,action.shootTarget.y,player.shootSpeed)){
			bb.possession = ['rebound',player,hoop];
			action.shootResult = 'rebound';
			action.shootTarget = action.getRandom('rebound');
		}
	} else if(action.shootResult === 'rebound') {
		if(action.moveBall(action.shootTarget.x,action.shootTarget.y,player.shootSpeed*0.7)){
			bb.possession = 'loose';
			action.shootResult = false;
			action.shootTarget = false;
		}
	}
}

action.getShootingResult = function(player,hoop){
	var dX = hoop.x - bb.ball.pos.x;
	var dY = hoop.y - bb.ball.pos.y;
	var dC = Math.sqrt(dX*dX+dY*dY);
	console.log(dC)

	var percent = player.closePercent;

	if(dC > 9) {
		percent = player.midPercent;
	} else if (dC > 15) {
		percent = player.longPercent;
	}

	var result = Math.floor((Math.random()*100)+1);
	if(result>percent){
		action.shootResult = 'missed';
		return action.getRandom('missed',hoop);
	} else {
		action.shootResult = 'scored';
		return hoop;
	}
}


action.movePlayer = function(player,tX,tY){
	var dX = tX - player.pos.x;
	var dY = tY - player.pos.y;
	var dC = Math.sqrt(dX*dX+dY*dY);

	var dXdt = Math.abs(dX*(player.fullSpeed/dC));
	var dYdt = Math.abs(dY*(player.fullSpeed/dC));

	if(dX < 0){
		player.pos.x = player.pos.x - dXdt;
	} else if (dX > 0){
		player.pos.x = player.pos.x + dXdt;
	}

	if(dY < 0){
		player.pos.y = player.pos.y - dYdt;
	} else if (dY > 0){
		player.pos.y = player.pos.y + dYdt;
	}

	if(dX < player.speed && dX > -player.speed){
		playerPos.x = tX;
	}

	if(dY < player.speed && dY > -player.speed){
		playerPos.y = tY;
	}

	

	if(Math.abs(dX) < 1 && Math.abs(dY) < 1){
		bb.ball.pos = {
			x: player.pos.x,
			y: player.pos.y
		}
		player.hasBall = true;
		return true;
	}

	if(player.hasBall){
		bb.ball.pos = {
			x: player.pos.x,
			y: player.pos.y
		}
	}

}

action.moveBall = function(x,y,speed){
	var dX = x - bb.ball.pos.x;
	var dY = y - bb.ball.pos.y;
	var dC = Math.sqrt(dX*dX+dY*dY);

	var dXdt = Math.abs(dX*(speed/dC));
	var dYdt = Math.abs(dY*(speed/dC));

	if(dX < 0){
		bb.ball.pos.x = bb.ball.pos.x - dXdt;
	} else if (dX > 0){
		bb.ball.pos.x = bb.ball.pos.x + dXdt;
	}

	if(dY < 0){
		bb.ball.pos.y = bb.ball.pos.y - dYdt;
	} else if (dY > 0){
		bb.ball.pos.y = bb.ball.pos.y + dYdt;
	}

	if(dX < dXdt && dX > -dXdt){
		bb.ball.pos.x = x;
	}

	if(dY < dYdt  && dY > -dYdt){
		bb.ball.pos.y = y;
	}

	if(dX === 0 && dY === 0){
		return true;
	}
}