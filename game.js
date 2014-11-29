var game = {};



game.ai = function(player,hoop){
	var side;
	var otherHoop;
	if(hoop.x === 5){
		otherHoop = {x:5,y:25}
	} else {
		otherHoop = {x:5,y:25}
	}

	if(bb.ball.status === 'loose' || bb.ball.status === 'rebound'){
		side = 'neutral';
		player.directive = 'getBall';
	} else if(bb.ball.status === 'shoot') {
		side = 'neutral';
		player.directive = 'boxOut';
	} else if(bb.ball.status === player.side) {
		side = 'offense';
	} else {
		side = 'defense';
		player.directive = 'defense';
	}

	if(side==='offense'){
		if (player.directive === 'getOpen'){
			bb.action.getOpen(player,true,'shoot',hoop);
		} else if(player.directive === 'shoot'){
			bb.action.shoot(player,hoop);
		}
	} else if(side==='neutral'){
		if(player.directive === 'getBall' || player.directive === 'getRebound'){
			bb.action.getBall(player,'getOpen');
		}
	} else if (side === 'defense'){
		if(player.directive === 'defense'){
			bb.action.defend(player,bb.ball.ownBy,otherHoop);
		}
	}
}

game.ball = function(){
	if(bb.ball.status === 'shoot' || bb.ball.status === 'rebound'){
		bb.action.ball.shoot();
	}
}