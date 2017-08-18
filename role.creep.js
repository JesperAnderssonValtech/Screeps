/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.creep');
 * mod.thing == 'a thing'; // true
 */
var commonFun = require('functions.common')
module.exports = {
	locateAndCollectEnergy: function(creep){
		var allWorkers = _.filter(Game.creeps);
		var containers = creep.room.find(FIND_STRUCTURES, {
	                    filter: (structure) => {
	                        return (structure.structureType == STRUCTURE_CONTAINER)
	                    }
	            });
		//om det inte finns en container och det alla workers som skall finnas gör det.
		if(allWorkers.length  >= creep.room.memory.MaxHarvesters + 12 && containers.length == 0){
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
    	//om det finns en container gå alltid dit!
    	else if(containers.length > 0 ){
            for(var i = 0; i<containers.length; i++){
                var allWorkers = _.filter(Game.creeps);
                if(creep.withdraw(containers[i], RESOURCE_ENERGY ,creep.carryCapacity-creep.carry.energy) == ERR_NOT_IN_RANGE){
                	creep.moveTo(containers[i]);
                }
            }
    	}
	},
	locateAndDeliverEnergy: function(creep){
		var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy+creep.carry.energy < structure.storeCapacity) || ((structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER)&&
                            structure.energy < structure.energyCapacity);
                    }
            });
            commonFun.sortEnergyStorage(targets);
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
	},
	harvest: function(creep){	
		if(creep.harvest(Game.getObjectById(creep.memory.energySource.id)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.energySource.id));
        }
   	}


};