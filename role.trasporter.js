/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.trasporter');
 * mod.thing == 'a thing'; // true
 */
var roleBase = require('role.creep');
module.exports = {
	run: function(creep){
		

         if(creep.memory.transport && creep.carry.energy == 0) {
            creep.memory.transport = false;
	    }
	    if(!creep.memory.transport && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.transport = true;    
	    }
	    var towers = creep.room.find(FIND_STRUCTURES,  {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER && structure.energy + creep.carry.energy < structure.energyCapacity) 
            }
        });
        var spawn = Game.spawns[creep.room.memory.spawnName];
        if(spawn.energy < spawn.energyCapacity){
        	if(creep.memory.transport){
	    		if(creep.transfer(spawn,RESOURCE_ENERGY, creep.carry.energy == ERR_NOT_IN_RANGE)){
	    			creep.moveTo(spawn);
	    		}
	    	}
	    	else{
	    		roleBase.locateAndCollectEnergy(creep);
	    	}
        }
       	
	    if(towers.length < 0){
	    	if(creep.memory.transport){
	    		if(creep.transfer(tower[0],RESOURCE_ENERGY, creep.carry.energy == ERR_NOT_IN_RANGE)){
	    			creep.moveTo(tower);
	    		}
	    	}
	    	else{
	    		roleBase.locateAndCollectEnergy(creep);
	    	}
        }

	}
};