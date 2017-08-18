/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.tower');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
	run: function(tower){
		var HealTargets = tower.room.find(FIND_STRUCTURES,  {
    		filter: (structure) => {
                return (structure.hits < structure.hitsMax)
		}});
		console.log("antal som behöver repareras: " + HealTargets.length)
		var Enemies = tower.room.find(FIND_HOSTILE_CREEPS);
		if(HealTargets.length > 0){
				console.log(tower.repair(HealTargets[0]));
			
		}
	}
};