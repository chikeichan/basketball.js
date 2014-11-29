var action = {};

//Basic movements
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

	if(dX < dXdt && dX > -dXdt){
		player.pos.x = tX;
	}

	if(dY < dYdt && dY > -dYdt){
		player.pos.y = tY;
	}

	if(player.hasBall){
		bb.ball.pos = {
			x: player.pos.x,
			y: player.pos.y
		}
	}

	if(Math.abs(dX) < 1 && Math.abs(dY) < 1){
		return true;
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


//Basic Command
action.getBall = function(player,directive){
	var t = bb.ball.pos;
	if(bb.action.movePlayer(player,t.x,t.y) && (bb.ball.status ==='loose'||bb.ball.status ==='rebound') ){
		player.directive = directive;
		bb.ball.inHand = true;
		player.hasBall = true;
		bb.ball.status = player.side;
		bb.ball.ownBy = player;
		bb.action.shootResult = false;
		bb.action.shootTarget = false;
		bb.action.boxOutTarget[player.id] = false;
	}
}

action.getOpenTarget = false;
action.getOpen = function(player,withBall,directive,hoop){
	if(!action.getOpenTarget) {
		action.getOpenTarget = action.getRandom('open',hoop);
	}
	if(withBall){
		var t = action.getOpenTarget;
		if(bb.action.movePlayer(player,t.x,t.y)){
			player.directive = directive;
			action.getOpenTarget = false;
		}
	}
}


action.shootResult = false;
action.shootTarget = false;
action.shootPlayer = false;
action.shoot = function(player,hoop){
	player.hasBall = false;
	bb.ball.inHand = false;
	if(!action.shootResult && action.shootResult !== 'rebound'){
		action.shootTarget = action.getShootingResult(player,hoop);
		action.shootPlayer = player;
	}
	setTimeout(function(){
		bb.ball.status = 'shoot';
	},150)
}

//Defense
action.defend = function(player,match,hoop){
	var dX = hoop.x - match.pos.x;
	var dY = hoop.y - match.pos.y;
	var dC = Math.sqrt(dX*dX+dY*dY);
	var dXdt = Math.abs(dX*(2.5/dC));
	var dYdt = Math.abs(dY*(2.5/dC));

	var t = {
		x: match.pos.x - dXdt,
		y: match.pos.y - dYdt
	}

	if (dX > 0){
		t.x = match.pos.x + dXdt;
	}

	if (dY > 0){
		t.y = match.pos.y + dYdt;
	}

	action.movePlayer(player,t.x,t.y);
}

action.boxOutTarget = {};
action.boxOut = function(player){
	if(!action.boxOutTarget[player.id]){
		action.boxOutTarget[player.id] = action.getRandom('boxOut',action.shootTarget);
	}

	action.movePlayer(player,action.boxOutTarget[player.id].x,action.boxOutTarget[player.id].y);
}


//Ball Motion
action.ball = {};
action.ball.shoot = function(){
	if(action.shootResult === 'scored') {
		if(action.moveBall(action.shootTarget.x,action.shootTarget.y,action.shootPlayer.shootSpeed)){
			bb.ball.status = 'loose';
			action.shootResult = false;
			action.shootTarget = false;
			action.shootPlayer = false;
		}
	} else if(action.shootResult === 'missed') {
		if(action.moveBall(action.shootTarget.x,action.shootTarget.y,action.shootPlayer.shootSpeed)){
			bb.ball.status = 'rebound';
			action.shootResult = 'rebound';
			action.shootTarget = action.getRandom('rebound',action.shootTarget);
		}
	} else if(action.shootResult === 'rebound') {
		if(action.moveBall(action.shootTarget.x,action.shootTarget.y,action.shootPlayer.shootSpeed*0.7)){
			bb.ball.status = 'loose';
			action.shootResult = false;
			action.shootTarget = false;
			action.shootPlayer = false;
		}
	}
}




//Random Digit Generator
action.getRandom = function(mode,hoop){
	var tX;
	var tY = Math.floor((Math.random()*50));

	if(hoop.x === 5){
		tX = Math.floor((Math.random()*25)+5);
	} else {
		tX = Math.floor(89-(Math.random()*25));
	}

	if(mode === 'missed'){
		tX = Math.floor((Math.random()*2)+hoop.x);
		tY = Math.floor((Math.random()*2)+24);
	} else if(mode === 'rebound'){
		tX = Math.abs(Math.floor(hoop.x-(Math.random()*18)));
		tY = Math.floor((Math.random()*16)+17);
	} else if(mode === 'boxOut'){
		tX = Math.floor((Math.random()*8)+5);
		tY = Math.floor((Math.random()*8)+25);
	}

	return {x: tX, y: tY};
}

action.radar = function(player,hoop,radius,list,quad){
	var num = [];
	_.each(list,function(opp){
		var dX = opp.pos.x - player.pos.x;
		var dY = opp.pos.y - bb.ball.pos.y;
		var dC = Math.sqrt(dX*dX+dY*dY);
		var quadrant;
		if(dX>0 && dY>0){
			quadrant = 'LR';
		} else if(dX>0 && dY <0){
			quadrant = 'UR';
		} else if(dX<0 && dY<0){
			quadrant = 'UL';
		} else if(dX<0 && dY>0){
			quadrant = 'LL';
		}
		if(quad === quadrant){
			num.push(dC);
		}
	})
	return num;
}

action.getShootingResult = function(player,hoop){
	var dX = hoop.x - bb.ball.pos.x;
	var dY = hoop.y - bb.ball.pos.y;
	var dC = Math.sqrt(dX*dX+dY*dY);
	var list;
	var quadrant;
	console.log(dC)

	if(player.side === 'home'){
		list = bb.away;
	} else {
		list = bb.home;
	}
	if(dX>0 && dY>0){
		quadrant = 'LR';
	} else if(dX>0 && dY <0){
		quadrant = 'UR';
	} else if(dX<0 && dY<0){
		quadrant = 'UL';
	} else if(dX<0 && dY>0){
		quadrant = 'LL';
	}

	var percent = player.closePercent;

	if(dC > 9) {
		percent = player.midPercent;
	} else if (dC > 15) {
		percent = player.longPercent;
	}

	var guards = action.radar(player,hoop,7,list,quadrant);
	for(var i=0;i<guards.length;i++){
		percent = percent*0.9;
		if(guards[i]<=3){percent = percent*0.9;}
		if(guards[i]<=4){percent = percent*0.9;}
		if(guards[i]<=5){percent = percent*0.9;}
		if(guards[i]<=6){percent = percent*0.9;}
	}

	console.log(percent);

	var result = Math.floor((Math.random()*100)+1);
	if(result>percent){
		action.shootResult = 'missed';
		return action.getRandom('missed',hoop);
	} else {
		action.shootResult = 'scored';
		return hoop;
	}
}

