/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('functions.common');
 * mod.thing == 'a thing'; // true
 */
module.exports = {

	distance: function(a,b) {return Math.sqrt(Math.pow(a.x - b.x,2) + Math.pow(a.y - b.y,2))},
	sortbuildOrder: function(array){
		var reference_array = [STRUCTURE_EXTENSION,STRUCTURE_TOWER,STRUCTURE_CONTAINER,STRUCTURE_WALL,STRUCTURE_ROAD]
		array.sort(function(a, b) {
  			return reference_array.indexOf(a.structureType) - reference_array.indexOf(b.structureType);
		});
		return array;
	},
	sortEnergyStorage: function(array){
		var reference_array = [STRUCTURE_SPAWN, STRUCTURE_EXTENSION,STRUCTURE_CONTAINER, STRUCTURE_TOWER]
		array.sort(function(a, b) {
  			return reference_array.indexOf(a.structureType) - reference_array.indexOf(b.structureType);
		});
		return array;
	},
	createMap: function(room){
		var map = [];
		for(let y = 0; y < 50; y++){
			var tempArr = [];
			for (let x = 0; x < 50; x++) {
				var objects = room.lookForAt(LOOK_TERRAIN,x,y);
				tempArr.push(objects[0]);
			};
			map[y] = tempArr;
		}
	},
	buildablePosInArea: function(room, top, left, bottom, right){
		var listOfPossiblePos = [];
		var listOfObstaclePos = [];
		var stuffInArea = room.lookAtArea(top,left,bottom,right,true);
		for (i = 0; i < stuffInArea.length; i++) {
			if(stuffInArea[i].type == "terrain" && stuffInArea[i].terrain == "wall" || stuffInArea[i].terrain == "swamp"){
				listOfObstaclePos.push(stuffInArea[i]);
			}
			else if(stuffInArea[i].type == "structure" && stuffInArea[i].structure.structureType != STRUCTURE_ROAD){
				listOfObstaclePos.push(stuffInArea[i]);
			}
		}
		for(let y=top; y<=bottom; y++){
			for(let x=left; x<=right; x++){
				for(let z = 0; z<listOfObstaclePos.length; z++){
					let IsAvailable = true;
					if(listOfObstaclePos[z].x == x && listOfObstaclePos[z].y == y ){
						IsAvailable = false;
					}
					if(IsAvailable){
						listOfPossiblePos.push(new RoomPosition(x, y, room.name));
					}
				}
			}
		}
		return listOfPossiblePos;
	}


};