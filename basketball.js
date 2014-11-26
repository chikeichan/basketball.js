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
	penaltyRadius: 4
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
}



















//Rendering Script
$(document).ready(function(){
	bb.matchRatio();
	var c = document.getElementById('court');
	var ctx = c.getContext('2d');
	bb.drawCourt(c,ctx);

	ctx.fillStyle = 'rgb(184, 82, 48)'
	ctx.beginPath();
	ctx.arc(bb.court.width/2,bb.court.height/2,0.75*8.2,0,2*Math.PI)
	ctx.fill();

})