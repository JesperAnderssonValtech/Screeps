var sourceFun = require("functions.sources");
var baseCreep = require('role.creep');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        ///if close to death return source to pool
        if(creep.ticksToLive <= 5){
           if(creep.memory.workSource != undefined){
                sourceFun.decrementWorkersOnCreeps(creep);
                creep.memory.workSource = undefined;
                creep.say("Good bye!")
                creep.suicide();
                return;
            } 
        }
        if(creep.memory.delivering && creep.carry.energy == 0) {
            creep.memory.delivering = false;
        }
        if(!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.delivering = true;
        }



	    if(!creep.memory.delivering) {
            if(creep.harvest(Game.getObjectById(creep.memory.workSource.id)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.workSource.id));
                }
            }
        else {
            baseCreep.locateAndDeliverEnergy(creep);
        }
	}
};

module.exports = roleHarvester;