/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Statistics');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
	run: function(){
		for(var roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
    		var room = Game.rooms[roomName];
			if(!room.memory.ticksSinceStart){
				room.memory.ticksSinceStart = 0;
			}
			if(!room.memory.energyIncome){
				room.memory.energyIncome = 0;
			}
			room.memory.ticksSinceStart += 1;
			room.memory.ticksSinceStart = room.memory.ticksSinceStart % 2000;
			if(room.ticksSinceStart == 0){
				room.energyIncome = 0;
			}
			if(room.memory.ticksSinceStart % 10 == 0){
				var temp = room.memory.ticksSinceStart/60;
				console.log("Income / 60 ticks: " + room.memory.energyIncome/temp);
			}
		}
	}
};