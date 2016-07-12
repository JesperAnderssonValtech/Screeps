/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.creep');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
	locateAndCollectEnergy: function(creep){
		var allWorkers = _.filter(Game.creeps);
		if(allWorkers.length  >= creep.room.memory.MaxHarvesters + 7){
			var targets = creep.room.find(FIND_STRUCTURES, {
	                    filter: (structure) => {
	                        return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_SPAWN)
	                    }
	            });
	            targets.sort(function(a, b) {
	                            return parseFloat(a.name) - parseFloat(b.name);
	            });
	        if(targets.length > 0){
	            for(var i = 0; i<targets.length; i++){
	                var allWorkers = _.filter(Game.creeps);
	                    if(creep.withdraw(targets[i], RESOURCE_ENERGY ,creep.carryCapacity-creep.carry.energy) == ERR_NOT_IN_RANGE){
	                    	creep.moveTo(targets[i]);
	                    }
	            }
	            
	        }
    	}
	},
	locateAndDeliverEnergy: function(creep){
		var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy+creep.carry.energy < structure.storeCapacity) || ((structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION )&&
                            structure.energy < structure.energyCapacity);
                    }
            });
            targets.sort(function(a, b) {
                            return parseFloat(a.name) + parseFloat(b.name);
            });

            if(targets.length > 0) {
                for(var i = 0; i<targets.length; i++){
                   
                    if(creep.transfer(targets[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[i]);
                    }

                    else{
                    creep.room.memory.energyIncome += creep.carryCapacity;
                    } 
                }
                
            }
	}
};