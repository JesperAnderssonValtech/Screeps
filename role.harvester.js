var sourceFun = require("functions.sources");
var baseCreep = require('role.creep');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        ///if close to death return source to pool
        if(creep.ticksToLive <= 10){
           if(creep.memory.workSource){
                sourceFun.decrementWorkersOnCreeps(creep);
                creep.memory.workSource = undefined;
            } 
        }


	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.memory.workSource == undefined){
                for(var i = 0; i < sources.length; i++){
                    var MaxWorkersAtNode = sourceFun.maxNumberOfWorkersForSource(sources[i]);
                    if(sources[i].memory.workers < MaxWorkersAtNode){
                        creep.memory.workSource = sources[i];
                        
                        sourceFun.incrementWorkersOnCreeps(creep);
                        break;
                    }
                }
            }
            else{

                if(creep.harvest(Game.getObjectById(creep.memory.workSource.id)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.workSource.id));
                    }
                }
            }
        else {

            //when done mining return source to pool
            if(creep.memory.workSource){
                sourceFun.decrementWorkersOnCreeps(creep);
                creep.memory.workSource = undefined;
            }

            baseCreep.locateAndDeliverEnergy(creep);
        }
	}
};

module.exports = roleHarvester;