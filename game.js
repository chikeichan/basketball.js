var game = {};



game.ai = function(player){
	if(bb.possession === 'loose' || bb.possession[0] === 'rebound'){
		bb.action.getBall(player);
	} else if (bb.possession === 'inHand'){
		bb.action.getOpen(player,true);
	} else if(bb.possession === 'inPosition'){
		bb.possession = ['shoot',player,bb.homeHoop];
	}
}

game.ball = function(){
	if(bb.possession[0] === 'shoot' || bb.possession[0] === 'rebound'){
		bb.action.shoot(bb.possession[1],bb.possession[2]);
	}
}