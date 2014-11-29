var draw = {};

draw.ratio = 0

//basic dimensions data
draw.data = {
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

//Scale dimension data to ratio
draw.rationalize = function(ratio){
	draw.ratio = ratio;
	_.each(draw.data,function(val,key){
		draw.data[key] = val*ratio;
	})
}

//Render Court
draw.drawCourt = function(c,ctx){
	ctx.strokeStyle = 'white';

	//Court
	ctx.translate((c.width-draw.data.width)/2,(c.height-draw.data.height)/2);
	ctx.strokeRect(0,0,draw.data.width,draw.data.height);

	//Painted Area
	ctx.strokeRect(0,(draw.data.height-draw.data.paintHeight)/2,draw.data.paintWidth,draw.data.paintHeight);
	ctx.strokeRect((draw.data.width-draw.data.paintWidth),(draw.data.height-draw.data.paintHeight)/2,draw.data.paintWidth,draw.data.paintHeight);
	
	ctx.strokeRect(0,(draw.data.height-draw.data.markingHeight)/2,draw.data.paintWidth,draw.data.markingHeight);
	ctx.strokeRect((draw.data.width-draw.data.paintWidth),(draw.data.height-draw.data.markingHeight)/2,draw.data.paintWidth,draw.data.markingHeight);
	
	//Mid-data Line
	ctx.moveTo(draw.data.width/2,0);
	ctx.lineTo(draw.data.width/2,draw.data.height);
	ctx.stroke();	

	//Board and Hoop
	ctx.beginPath();
	ctx.translate(draw.data.boardSpace,(draw.data.height-draw.data.boardLength)/2);
	ctx.moveTo(0,0);
	ctx.lineTo(0,draw.data.boardLength);
	ctx.strokeStyle = 'rgb(255, 77, 0)';
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(draw.data.hoopRadius,draw.data.boardLength/2,draw.data.hoopRadius,0,2*Math.PI);
	ctx.stroke();

	ctx.translate(draw.data.width-draw.data.boardSpace*2,0);
	ctx.moveTo(0,0);
	ctx.lineTo(0,draw.data.boardLength);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(-draw.data.hoopRadius,draw.data.boardLength/2,draw.data.hoopRadius,0,2*Math.PI);
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = 'white';
	ctx.translate(-(draw.data.width-draw.data.boardSpace*2),0);
	ctx.translate(-draw.data.boardSpace,-(draw.data.height-draw.data.boardLength)/2);


	//Three Point Line
	ctx.moveTo(0,(draw.data.height-draw.data.threeHeight)/2);
	ctx.lineTo(draw.data.threeWidth,(draw.data.height-draw.data.threeHeight)/2);
	ctx.stroke();	
	ctx.beginPath();
	ctx.arc((draw.data.boardSpace+draw.data.hoopRadius),draw.data.height/2,draw.data.threeRadius,-1.18,-1.62*Math.PI);
	ctx.stroke();
	

	ctx.moveTo(0,((draw.data.height-draw.data.threeHeight)/2+draw.data.threeHeight));
	ctx.lineTo(draw.data.threeWidth,((draw.data.height-draw.data.threeHeight)/2+draw.data.threeHeight));
	ctx.stroke();

	ctx.moveTo((draw.data.width-draw.data.threeWidth),(draw.data.height-draw.data.threeHeight)/2);
	ctx.lineTo(draw.data.width,(draw.data.height-draw.data.threeHeight)/2);
	ctx.stroke();	

	ctx.moveTo((draw.data.width-draw.data.threeWidth),((draw.data.height-draw.data.threeHeight)/2+draw.data.threeHeight));
	ctx.lineTo(draw.data.width,((draw.data.height-draw.data.threeHeight)/2+draw.data.threeHeight));
	ctx.stroke();
	ctx.beginPath();
	ctx.arc((draw.data.width-draw.data.boardSpace-draw.data.hoopRadius),draw.data.height/2,draw.data.threeRadius,1.96,1.381*Math.PI);
	ctx.stroke();

	//Penalty Area
	ctx.beginPath();
	ctx.arc((draw.data.boardSpace+draw.data.hoopRadius),draw.data.height/2,draw.data.penaltyRadius,-Math.PI/2,-1.5*Math.PI);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(draw.data.width-(draw.data.boardSpace+draw.data.hoopRadius),draw.data.height/2,draw.data.penaltyRadius,Math.PI/2,1.5*Math.PI);
	ctx.stroke();


	//Mid-data Circle
	ctx.beginPath();
	ctx.arc(draw.data.width/2,draw.data.height/2,draw.data.innerRadius,0,2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(draw.data.width/2,draw.data.height/2,draw.data.outerRadius,0,2*Math.PI);
	ctx.stroke();

	//Free-Throw Circle
	ctx.beginPath();
	ctx.arc(draw.data.paintWidth,draw.data.height/2,draw.data.outerRadius,-Math.PI/2,-1.5*Math.PI);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc((draw.data.width-draw.data.paintWidth),draw.data.height/2,draw.data.outerRadius,Math.PI/2,1.5*Math.PI);
	ctx.stroke();

	ctx.setLineDash([5]);

	ctx.beginPath();
	ctx.arc(draw.data.paintWidth,draw.data.height/2,draw.data.outerRadius,Math.PI/2,1.5*Math.PI);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc((draw.data.width-draw.data.paintWidth),draw.data.height/2,draw.data.outerRadius,-Math.PI/2,-1.5*Math.PI);
	ctx.stroke();
	ctx.setLineDash([0]);
	ctx.translate(-(c.width-draw.data.width)/2,-(c.height-draw.data.height)/2);
}

//Render ball
draw.drawBall = function(canvas,context,x,y){
	context.translate((canvas.width-draw.data.width)/2,(canvas.height-draw.data.height)/2);
	context.fillStyle = 'rgb(184, 82, 48)'
	
	context.beginPath();
	context.arc(x*draw.ratio,y*draw.ratio,draw.data.ballRadius,0,2*Math.PI)
	context.fill();
	context.translate(-(canvas.width-draw.data.width)/2,-(canvas.height-draw.data.height)/2);
}

//render player
draw.drawPlayer = function(canvas,context,player,color){
	context.translate((canvas.width-draw.data.width)/2,(canvas.height-draw.data.height)/2);
	context.fillStyle = color;

	context.beginPath();
	context.lineWidth=0;
	context.arc(player.pos.x*draw.ratio,player.pos.y*draw.ratio,1*draw.ratio,0,2*Math.PI);
	context.fill();

	if(player.hasBall){
		context.beginPath();
		context.fillStyle = 'rgb(184, 82, 48)'
		context.arc(player.pos.x*draw.ratio-0.5*draw.ratio,player.pos.y*draw.ratio-0.5*draw.ratio,draw.data.ballRadius,0,2*Math.PI);
		context.fill();
	}

	context.translate(-(canvas.width-draw.data.width)/2,-(canvas.height-draw.data.height)/2);
}

draw.render = function(c,ctx,ballPos){
	ctx.clearRect(0,0,c.width,c.height);
	draw.drawCourt(c,ctx);
	_.each(bb.home,function(player){
		draw.drawPlayer(c,ctx,player,'blue');
	})

	_.each(bb.away,function(player){
		draw.drawPlayer(c,ctx,player,'red');
	})

	if(!bb.ball.inHand){
		draw.drawBall(c,ctx,ballPos.x,ballPos.y);
	}
}

