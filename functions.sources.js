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
		var sourcePos = source.pos
		var spawns = source.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN)
                    }
            });
		var spawnPos = spawns[0].pos;
		var distance = Math.sqrt(Math.pow(sourcePos.x - spawnPos.x,2) + Math.pow(sourcePos.y - spawnPos.y,2))
		var score = parseInt(freeBlocks-1) + parseInt(distance/4);
		return score;
	}
}

module.exports = sourceFunc;