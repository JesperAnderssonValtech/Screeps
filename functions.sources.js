var sourceFunc = {
	decrementWorkersOnCreeps: function(creep){
		var source = Game.getObjectById(creep.memory.workSource.id);
		source.memory.workers--;
	},
	incrementWorkersOnCreeps: function(creep){
		var source = Game.getObjectById(creep.memory.workSource.id);
		source.memory.workers++;
	},
	workersAllowedforSource: function(source){

	},
	blocksAroundSource: function(source){
		var sourcePos = source.pos;
		var tempTerain = [
			Game.map.getTerrainAt(new RoomPosition(sourcePos.x+1,sourcePos.y, source.room.name)),
			Game.map.getTerrainAt(new RoomPosition(sourcePos.x-1,sourcePos.y, source.room.name)),
			Game.map.getTerrainAt(new RoomPosition(sourcePos.x,sourcePos.y+1, source.room.name)),
			Game.map.getTerrainAt(new RoomPosition(sourcePos.x,sourcePos.y-1, source.room.name)),
			Game.map.getTerrainAt(new RoomPosition(sourcePos.x+1,sourcePos.y+1, source.room.name)),
			Game.map.getTerrainAt(new RoomPosition(sourcePos.x-1,sourcePos.y-1, source.room.name)),
			Game.map.getTerrainAt(new RoomPosition(sourcePos.x-1,sourcePos.y+1, source.room.name)),
			Game.map.getTerrainAt(new RoomPosition(sourcePos.x+1,sourcePos.y-1, source.room.name))
		]
		return tempTerain;
	},
	freeblocksAroundSource: function(source){
		var counter = 0;
		var terrain = this.blocksAroundSource(source)
		for(var i = 0; i<terrain.length; i++){
			if(terrain[i] == 'plain'){
				counter++;
			}
		}
		return counter;
	},
	maxNumberOfWorkersForSource: function(source){

		var freeBlocks = this.freeblocksAroundSource(source);
		var score = parseInt(freeBlocks)
		return score;
	}
}

module.exports = sourceFunc;