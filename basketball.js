var bb = {};
		bb.draw = draw;
		bb.player = player;
		bb.action = action;
		bb.game = game;


//Define home team
bb.home = {
	pg: {}
}

bb.home.pg = bb.player.list[0];
bb.home.pg.pos = {x:40,y:25}
bb.home.pg.side = 'home';

bb.homeHoop = {x:5,y:25}
bb.awayHoop = {x:5,y:25}



bb.ball = {
	pos: {x:25,y:25},
	inHand: false,
	status: 'loose',
	ownBy: null
}

//Define home team
bb.away = {
	pg: {}
}

bb.away.pg = bb.player.list[1];
bb.away.pg.pos = {x:40,y:45};
bb.away.pg.side = 'away';


//Rendering Script
$(document).ready(function(){
	var c = document.getElementById('court');
	var ctx = c.getContext('2d');
	bb.draw.rationalize(8.2);
	//bb.draw.render(c,ctx,bb.home,bb.ball.pos);


	var homepgAI = setInterval(function(){
		bb.game.ai(bb.home.pg,bb.homeHoop);
		bb.game.ai(bb.away.pg,bb.awayHoop);
	},30);

	var ballAI = setInterval(function(){
		bb.game.ball();
	},30);

	var rendering = setInterval(function(){
		bb.draw.render(c,ctx,bb.ball.pos);
	},30);
})