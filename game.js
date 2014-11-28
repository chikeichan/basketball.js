var game = {};



game.ai = function(player,hoop){
	if(bb.ball.status === 'loose' || bb.ball.status === 'rebound'){
		player.directive = 'getBall';
	}

	if(player.directive === 'getBall' || player.directive === 'getRebound'){
		bb.action.getBall(player,'getOpen');
	} else if (player.directive === 'getOpen'){
		bb.action.getOpen(player,true,'shoot');
	} else if(player.directive === 'shoot'){
		bb.action.shoot(player,hoop);
		player.directive = 'wait';
	}
}

game.ball = function(){
	if(bb.ball.status === 'shoot' || bb.ball.status === 'rebound'){
		bb.action.ball.shoot();
	}
}