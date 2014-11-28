var player = {};

//Speed is feet per 30 milliseconds
player.list = [];

player.newPlayer = function(name,dob,height,weight){
	return {
		id: player.nextNumber(),
		name: name,
		dob: dob,
		height: height,
		weight: weight,
		initSpeed: 0.45,
		fullSpeed: 0.75,
		shootSpeed: 0.6,
		passSpeed: 0.95,
		closePercent: 75,
		midPercent: 50,
		longPercent: 35,
		pos: {x:0,y:0},
		hasBall: false,
		directive: 'getBall'
	}
}

player.nextNumber = function(){
	var id = this.list.length;
	return id;
}

var temp = new player.newPlayer('Jacky','02/25/1986',72, 180);
player.list.push(temp);