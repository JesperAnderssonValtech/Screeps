var commonFun = require('functions.common');
var baseCreep = require('role.creep');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {  
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;    
	    }


	    if(creep.memory.upgrading) {

            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            if(creep.memory.energySource){
                if(creep.memory.energySource.structureType == STRUCTURE_SPAWN){
                    baseCreep.locateAndCollectEnergy(creep);
                }
                else{
                    baseCreep.harvest(creep);
                }
            }
            else{
                baseCreep.locateAndCollectEnergy(creep);
            }
            

        }
	}
};

module.exports = roleUpgrader;