/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('functions.spawning');
 * mod.thing == 'a thing'; // true
 */
module.exports = {
	spawnHarvester: function(spawn){
		spawn.createCreep(this.decideParts("harvester", spawn), this.decideName("harvester"), {role: 'harvester', workSource: undefined});
	},
	spawnUpgrader:function(spawn){
		spawn.createCreep(this.decideParts("upgrader", spawn), this.decideName("upgrader"), {role: 'upgrader'});
	},
	spawnBuilder:function(spawn){
		spawn.createCreep(this.decideParts("builder", spawn), this.decideName("builder"), {role: 'builder'});
	},
	decideName: function(type){
		return type + this.getRandomInt(0,1000);
	},
	decideParts: function(type, spawn){
		var extensions = spawn.room.find(FIND_MY_STRUCTURES, {
    		filter: { structureType: STRUCTURE_EXTENSION }
		});
		if(type == "harvester"){
			if(extensions.length == 0){
			return [WORK,WORK,CARRY,MOVE];
			}
			else if(extensions.length == 1){
				return [WORK,WORK,CARRY,MOVE,MOVE];
			}
			else if(extensions.length == 2){
				return [WORK,WORK,WORK,CARRY,MOVE];
			}
			else{
				return [WORK,WORK,WORK,CARRY,MOVE];
			}
		}
		if(type == "upgrader"){
			
			if(extensions.length == 0){
				return [WORK,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length == 1){
				return [WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
			}
			else if(extensions.length == 2){
				return [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
			}
			else{
				return [WORK,WORK,CARRY,CARRY,CARRY,MOVE];
			}
		}
		if(type == "builder"){
			return [WORK,CARRY,CARRY,MOVE];
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
	}
};