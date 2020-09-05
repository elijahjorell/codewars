// https://www.codewars.com/kata/58905bfa1decb981da00009e

const queues = [
    [], // G
    [], // 1
    [4, 4, 4, 4], // 2
    [], // 3
    [2, 2, 2, 2], // 4
    [], // 5
    [], // 6
];
const maxCapacity = 2; // answer is [0, 1, 2, 3, 4, 5, 0]


function theLift(queues, maxCapacity) {
    const floors = queues.map((queue, level) => new Floor(level, queue));
    const lift = new Lift(floors, maxCapacity);
    var i = 0;

    while (true) {
        console.log('-------- ITERATION ' + (i + 1) + ' --------');
        lift.logFloor();
        lift.unload();
        lift.load(floors[lift.level]);
        floors[lift.level].updateLiftCallButtons();
        lift.updateQueuedLevels(floors);
        
        console.log(lift);
        console.log(floors);
        
        if (!lift.queuedLevels.length) break;
        
        lift.moveToNextFloor();

        i++;
    }

    lift.returnToBase();

    return lift.log;
}

class Person {
    constructor(targetLevel, liftCallButton) {
        this.targetLevel = targetLevel;
        this.liftCallButton = liftCallButton;
    }
}

class Floor {
    constructor(level, queue) {
        this.level = level;
        this.persons = queue.map((targetLevel) => {
            return new Person(targetLevel, targetLevel > level ? 'up' : 'down');
        });
        this.liftCallButtons = undefined;
        this.updateLiftCallButtons();
    }
    updateLiftCallButtons() {
        this.liftCallButtons = [... new Set(this.persons.map((person) => person.liftCallButton))];
    }
}

class Lift {
    constructor(floors, maxCapacity) {
        this.direction = 'up';
        this.floorsRelativeInfo = undefined;
        this.level = 0;
        this.log = [];
        this.maxCapacity = maxCapacity;
        this.persons = [];
        this.queuedLevels = [];
        this.updateFloorsRelativeInfo(floors, []);
    }
    changeDirection() {
        this.direction = this.getOppositeDirection();
    }
    getOppositeDirection() {
        return this.direction === 'up' ? 'down' : 'up';
    }
    load(floor) {
        floor.persons = floor.persons.reduce((newFloorPersons, floorPerson) => {
            if (floorPerson.liftCallButton === this.direction && this.persons.length < this.maxCapacity) {
                this.persons.push(floorPerson);
            } else {
                newFloorPersons.push(floorPerson);
            }
            return newFloorPersons;
        }, []);

        if (this.direction === 'up' && 
            !this.floorsRelativeInfo.aboveLift.up.length && 
            !this.floorsRelativeInfo.aboveLift.down.length &&
            !this.floorsRelativeInfo.aboveLift.dropOff.length) {
                this.changeDirection();
        }
        if (this.direction === 'down' && 
            !this.floorsRelativeInfo.belowLift.up.length &&
            !this.floorsRelativeInfo.belowLift.down.length &&
            !this.floorsRelativeInfo.belowLift.dropOff.length) {
                this.changeDirection();
        }
    }
    logFloor() {
        this.log.push(this.level);
    }
    moveToNextFloor() {
        this.level = this.queuedLevels.shift();
    }
    returnToBase() {
        if (this.level !== 0) {
            this.level = 0;
            this.logFloor();
        }
    }
    unload() {
        this.persons = this.persons.reduce((newPersons, person) => {
            if (person.targetLevel !== this.level) {
                newPersons.push(person);
            }
            return newPersons;
        }, []);
    }
    updateFloorsRelativeInfo(floors, dropOffLevels) {
        this.floorsRelativeInfo = floors.concat(dropOffLevels).reduce((infoObj, val) => {
            if (val.level) {
                if (val.level > this.level) {
                    if (val.liftCallButtons.includes('up')) {
                        infoObj.aboveLift.up.push(val.level);
                    } else if (val.liftCallButtons.includes('down')) {
                        infoObj.aboveLift.down.push(val.level);
                    } 
                } else if (val.level < this.level) {
                    if (val.liftCallButtons.includes('up')) {
                        infoObj.belowLift.up.push(val.level);
                    } else if (val.liftCallButtons.includes('down')) {
                        infoObj.belowLift.down.push(val.level);
                    }
                }
            } else {
                if (val > this.level) {
                    infoObj.aboveLift.dropOff.push(val);
                } else if (val < this.level) {
                    infoObj.belowLift.dropOff.push(val);
                }
            }
            return infoObj;
        }, { aboveLift: { up: [], down: [], dropOff: [] }, belowLift: { up: [], down: [], dropOff: [] } });
    }
    updateQueuedLevels(floors) {
        const dropOffLevels = this.persons.map((person) => person.targetLevel);
        const floorsWithButtonPressed = floors.filter((floor) => floor.liftCallButtons.length)

        this.updateFloorsRelativeInfo(floorsWithButtonPressed, dropOffLevels);
        console.log(this.floorsRelativeInfo)

        if (this.direction === 'up') {
            if (this.floorsRelativeInfo.aboveLift.up.length || this.floorsRelativeInfo.aboveLift.dropOff.length) {
                this.queuedLevels = this.floorsRelativeInfo.aboveLift.up.concat(this.floorsRelativeInfo.aboveLift.dropOff).sort((a, b) => a - b);
            } else {
                this.queuedLevels = this.floorsRelativeInfo.aboveLift.down.sort((a, b) => b - a);
            }
        } else if (this.direction === 'down') {
            if (this.floorsRelativeInfo.belowLift.down.length || this.floorsRelativeInfo.belowLift.dropOff.length) {
                this.queuedLevels = this.floorsRelativeInfo.belowLift.down.concat(this.floorsRelativeInfo.belowLift.dropOff).sort((a, b) => b - a);
            } else {
                this.queuedLevels = this.floorsRelativeInfo.belowLift.up.sort((a, b) => a - b);
            }
        }
    }
}

theLift(queues, maxCapacity);