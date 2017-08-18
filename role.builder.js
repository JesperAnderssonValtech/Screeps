var baseCreep = require('role.creep');
var commonFun = require('functions.common');
var roleUpgrader = require('role.upgrader');

  function getEnergyStored(creep){
        var energyStations = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
        });
        var energyTotal = 0;
        if(energyStations.length > 0){
            for(i=0;i<energyStations.length; i++){
                energyTotal += energyStations[i].store.energy;
            }
        }
        return creep.room.energyAvailable + energyTotal;
    }
    

     function getEnergyCapacity(creep){
        var energyStations = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
                });
        var capTotal = 0;
        for(i=0;i<energyStations.length; i++){
            capTotal += energyStations[i].storeCapacity;
        }
        return creep.room.energyCapacityAvailable + capTotal;
    }


var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
            
        var totalEnergy = getEnergyStored(creep);
        var totalCapacity = getEnergyCapacity(creep);
        
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length > 0){
            if(totalEnergy/totalCapacity > 0.7 || totalEnergy > 700){
                targets = commonFun.sortbuildOrder(targets)
                if(creep.build(targets[0]) == ERR_NOT_ENOUGH_RESOURCES) {
                       baseCreep.locateAndCollectEnergy(creep);

                        
                }
                else if(creep.build(targets[0]) == ERR_NOT_IN_RANGE){

                    creep.moveTo(targets[0]);
                }
                else if(creep.build(targets[0]) == ERR_INVALID_TARGET)
                {
                    //creep.moveTo(creep.pos.x+1,creep.pos.y, creep.room);
                }
            }
            else{
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                creep.build(targets[0])
            }
        }
        else{
            roleUpgrader.run(creep);
        }
        
        
    }

}; 


module.exports = roleBuilder;