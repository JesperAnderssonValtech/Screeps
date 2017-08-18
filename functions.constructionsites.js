/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('functions.constructionsites');
 * mod.thing == 'a thing'; // true
 */

var commonFun = require('functions.common');
module.exports = {
	
	createRoads: function(room){
		var spawn = Game.spawns[room.memory.spawnName];
		var sources = room.find(FIND_SOURCES).concat(room.find(FIND_STRUCTURES, {
    		filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTROLLER)
			}}));
		if(room.memory.ticksSinceStart % 60 == 0){
			for(let i = 0; i<sources.length; i++){
				var pathArr = spawn.pos.findPathTo(sources[i])
				for(let y = 0; y < pathArr.length; y++)
				{
					var tempPos = new RoomPosition(pathArr[y].x,pathArr[y].y, room.name);
					var stuff = tempPos.look();
					var tempBool = true;
					for(let j = 0; j < stuff.length; j++){
						if(stuff.type ==  LOOK_STRUCTURES || stuff.type == LOOK_CONSTRUCTION_SITES){
							tempBool = false;
						}
					}
					if(tempBool){
						room.createConstructionSite(tempPos, STRUCTURE_ROAD);
					}

						
					}
				}
			}
	},
	setupNewBase: function(room){
		this.createRoads(room);
	},
	generateMap: function(room){
		let mapSize = 50;
	},
	placeExtensions: function(room){
		var spawn = Game.spawns[room.memory.spawnName];
		var spawnPos = spawn.pos;
		topPos = spawnPos.y-1;
		leftPos = spawnPos.x-1;
		bottomPos = spawnPos.y+1;
		rightPos = spawnPos.x+1;
		var buildablePos = commonFun.buildablePosInArea(room,topPos, leftPos, bottomPos, rightPos);
		for (var i = 0; i < buildablePos.length; i++) {
			//buildablePos[i].createConstructionSite(STRUCTURE_EXTENSION);
		};
	},
	placeTower: function(room){

	},
	run: function(room){
		if(room.controller.level = 2){
			placeExtensions(room);
		}
		if(room.controller.level = 3){
		placeTower(room);
		}
	}






};