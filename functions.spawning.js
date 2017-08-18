/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('functions.spawning');
 * mod.thing == 'a thing'; // true
 */
 var commonFun = require('functions.common');
  var sourceFun = require('functions.sources');
module.exports = {
	spawnHarvester: function(spawn){
		var name = spawn.createCreep(this.decideParts("harvester", spawn), this.decideName("harvester"), {role: 'harvester', workSource: undefined});
		creep = Game.creeps[name];
		creep.memory.workSource = this.whereToGetEnergy(spawn);
		sourceFun.incrementWorkersOnCreeps(creep);
	},
	spawnTransporter: function(spawn){
		spawn.createCreep(this.decideParts("transporter", spawn), this.decideName("transporter"), {role: 'transporter'});
	},
	spawnUpgrader:function(spawn){
		spawn.createCreep(this.decideParts("upgrader", spawn), this.decideName("upgrader"), {role: 'upgrader', energySource: this.whereToGetEnergyUpgrader(spawn)});
	},
	spawnBuilder:function(spawn){
		spawn.createCreep(this.decideParts("builder", spawn), this.decideName("builder"), {role: 'builder'});
	},
	decideName: function(type){
		return type + this.getRandomInt(0,1000);
	},
	decideParts: function(type, spawn){
		var extensions = spawn.room.find(FIND_MY_STRUCTURES, {
    		filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION && structure.isActive)
		}});
		if(type == "harvester"){
			if(extensions.length < 2){
			return [WORK,WORK,CARRY,MOVE];
			}
			else if(extensions.length < 4 && extensions.length >= 2){
				return [WORK,WORK,CARRY,CARRY, MOVE];
			}
			else if(extensions.length < 6 && extensions.length >= 4){
				return [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length < 8 && extensions.length >= 6){
				return [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length < 10 && extensions.length >= 8){
				return [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			}
			else{
				return [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			}
		}
		if(type == "upgrader"){
			
			if(extensions.length < 2){
				return [WORK,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length < 4 && extensions.length >= 2){
				return [WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length < 6 && extensions.length >= 4){
				return [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length < 8 && extensions.length >= 6){
				return [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length < 10 && extensions.length >= 8){
				return [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			}
			else{
				return [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			}
		}
		if(type == "builder"){
			if(extensions.length < 2){
				return [WORK,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length < 4 && extensions.length >= 2){
				return [WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length < 6 && extensions.length >= 4){
				return [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
			}
			else{
				return [WORK,WORK,CARRY,CARRY,CARRY,MOVE];
			}
		}
		if(type == "transporter"){
			if(extensions.length < 2){
				return [CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length < 4 && extensions.length >= 2){
				return [CARRY,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length < 6 && extensions.length >= 4){
				return [CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			}
			else{
				return [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			}
		}
	},
	getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	costForCreep: function(type, spawn){
		var arr = this.decideParts(type,spawn);
		var cost = 0;
		for(var i = 0; i<arr.length; i++){
			cost += BODYPART_COST[arr[i]];
		}
		return cost;
	},
	whereToGetEnergyUpgrader: function(spawn){

            var distanceControllerSpawn = commonFun.distance(spawn.room.controller.pos, spawn.pos)
            var sources = spawn.room.find(FIND_SOURCES);
            var use = spawn;
            var BestDistance = distanceControllerSpawn;
            for(let i = 0; i<sources.length; i++){
            	var tempDis = commonFun.distance(spawn.room.controller.pos, sources[i].pos);
                if(BestDistance > tempDis){
                    use = sources[i];
                    BestDistance = tempDis;
                }
            }
            
            return use;
	},
	whereToGetEnergy: function(spawn){

            var sources = spawn.room.find(FIND_SOURCES);
            var use = undefined;
            var leastWorkers = 10000000;
            for(let i = 0; i<sources.length; i++){
            	var templeast = sources[i].memory.workers;
                if(leastWorkers >= templeast){
                    use = sources[i];
                    leastWorkers = templeast;
                }
            }
            console.log("use this: " + use);
            return use;
	}
};