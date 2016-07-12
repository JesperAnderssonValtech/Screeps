var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnFun = require('functions.spawning');
var statistics = require('Statistics');
var sourceFun = require('functions.sources');

module.exports.loop = function () {

statistics.run();

for(var i in Memory.creeps) {
    if(!Game.creeps[i]) {
        delete Memory.creeps[i];
    }
}

Source.prototype.memory = undefined;

for(var roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
    var room = Game.rooms[roomName];
    if(!room.memory.MaxHarvesters){
        room.memory.MaxHarvesters = 0;
    }
    if(!room.memory.sources){//If this room has no sources memory yet
        room.memory.sources = {}; //Add it
        var sources = room.find(FIND_SOURCES);//Find all sources in the current room
        for(var i in sources){
            var source = sources[i];
            source.memory = room.memory.sources[source.id] = {}; //Create a new empty memory object for this source
            //Now you can do anything you want to do with this source
            //for example you could add a worker counter:
            source.memory.workers = 0;
            console.log("max number of workesrs: " + sourceFun.maxNumberOfWorkersForSource(source))
            source.memory.MaxWorkers = sourceFun.maxNumberOfWorkersForSource(source);
            room.memory.MaxHarvesters += sourceFun.maxNumberOfWorkersForSource(source); 
        }
    }else{ //The memory already exists so lets add a shortcut to the sources its memory
        var sources = room.find(FIND_SOURCES);//Find all sources in the current room
        for(var i in sources){
            var source = sources[i];
            source.memory = room.memory.sources[source.id]; //Set the shortcut
        }
    }
    if(!room.memory.totalWorkers){
        room.memory.totalWorkers = _.filter(Game.creeps);
    }
    else{
        room.memory.totalWorkers = _.filter(Game.creeps);
    }
}


var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
var allWorkers = _.filter(Game.creeps);

for(var spawnName in Game.spawns){
    var spawn = Game.spawns[spawnName];
    var totalEnergyForRoom = 0;
    var extensions = spawn.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION);
                    }
            });
    for(i=0; i<extensions.length; i++){
        totalEnergyForRoom += extensions[i].energy;
    }

    console.log("extensions: " + extensions.length + "energy in extensions: " + totalEnergyForRoom + " totalEnergy: " + parseInt(spawn.energy + totalEnergyForRoom))    
        if(harvesters.length < room.memory.MaxHarvesters && parseInt(spawn.energy + totalEnergyForRoom) >= spawnFun.costForCreep("harvester", spawn)){
            //Game.spawns.TutTut.createCreep([WORK, WORK, CARRY, MOVE], "harvester-"+ new Date(), {role: 'harvester', workSource: undefined});
            spawnFun.spawnHarvester(spawn)
            console.log("spawn harvester in: " + spawn);
            
        }
        else if(upgraders.length < 3 && parseInt(spawn.energy + totalEnergyForRoom) >= spawnFun.costForCreep("upgrader", spawn)){
            //spawn.createCreep([WORK, CARRY, CARRY, MOVE], "upgrader-"+ new Date(), {role: 'upgrader'});
            spawnFun.spawnUpgrader(spawn);
            console.log("spawn upgrader in: " + spawn);
        }
        else if(builders.length < 2 && parseInt(spawn.energy + totalEnergyForRoom) >= spawnFun.costForCreep("builder", spawn)){
            //spawn.createCreep([WORK, CARRY, CARRY, MOVE], "builder-"+ new Date(), {role: 'builder'});
            spawnFun.spawnBuilder(spawn);
            console.log("spawn builder in: " + spawn);
        }
}

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}