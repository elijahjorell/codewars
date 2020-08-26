// https://www.codewars.com/kata/58905bfa1decb981da00009e

const queues = [
    [3], // G
    [2], // 1
    [0], // 2
    [2], // 3
    [], // 4
    [], // 5
    [5], // 6
];
const maxCapacity = 5; // answer is [0, 1, 2, 3, 4, 5, 0]

function theLift(queues, maxCapacity) {
    const lift = new Lift(maxCapacity);
    const floors = queues.map((queue, level) => new Floor(level, queue));
    var i = 0;

    while (true) {
        lift.logFloor();
        lift.unload();
        lift.load(floors[lift.floor]);
        floors[lift.floor].updateLiftCallButtons();
        lift.updateQueuedFloors(floors);
        
        console.log('-------- ITERATION ' + (i + 1) + ' --------');
        console.log(lift);
        console.log(floors);
        
        if (!lift.queuedFloors.length) break;
        
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

class Lift {
    constructor(maxCapacity) {
        this.direction = 'up';
        this.floor = 0;
        this.log = [];
        this.maxCapacity = maxCapacity;
        this.persons = [];
        this.queuedFloors = [];
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
    }
    logFloor() {
        this.log.push(this.floor);
    }
    moveToNextFloor() {
        this.floor = this.queuedFloors.shift();
    }
    returnToBase() {
        if (this.floor !== 0) {
            this.floor = 0;
            this.logFloor();
        }
    }
    unload() {
        this.persons = this.persons.reduce((newPersons, person) => {
            if (person.targetLevel !== this.floor) {
                newPersons.push(person);
            }
            return newPersons;
        }, []);
    }
    updateQueuedFloors(floors) {
        const targetFloorsOfLoadedPersons = [... new Set(this.persons.map((person) => floors[person.targetLevel]))];
        const floorsWithButtonPressed = floors.filter((floor) => floor.liftCallButtons.length);
        const potentialQueuedFloors = [... new Set([].concat(targetFloorsOfLoadedPersons, floorsWithButtonPressed))]
            .reduce((potentialQueuedFloors, floor) => {
                if (floor !== this.floor) {
                    if (floor.liftCallButtons.includes('up')) {
                        if (floor.level > this.floor) {
                            potentialQueuedFloors.up.enRoute.push(floor.level);
                        } else if (floor.level < this.floor) {
                            potentialQueuedFloors.up.notEnRoute.push(floor.level);
                        }
                    } else if (floor.liftCallButtons.includes('down')) {
                        if (floor.level > this.floor) {
                            potentialQueuedFloors.down.notEnRoute.unshift(floor.level);
                        } else if (floor.level < this.floor) {
                            potentialQueuedFloors.down.enRoute.unshift(floor.level);
                        }
                    } else {
                        if (floor.level > this.floor) {
                            potentialQueuedFloors.up.enRoute.push(floor.level);
                        } else if (floor.level < this.floor) {
                            potentialQueuedFloors.down.enRoute.unshift(floor.level);
                        }
                    }
                }
                return potentialQueuedFloors;
            }, { up: { enRoute: [], notEnRoute: [] }, down: { enRoute: [], notEnRoute: [] } });

        console.log(potentialQueuedFloors)
        
        if (potentialQueuedFloors[this.direction].enRoute.length || potentialQueuedFloors[this.getOppositeDirection()].notEnRoute.length) {
            this.queuedFloors = potentialQueuedFloors[this.direction].enRoute
                .concat(potentialQueuedFloors[this.getOppositeDirection()].notEnRoute);
            if (potentialQueuedFloors[this.getOppositeDirection()].notEnRoute.length === 1) {
                this.changeDirection();
            }                   
        }

        this.queuedFloors = this.queuedFloors.sort((a, b) => {
            return this.direction === 'up' ? a - b : b - a;
        });
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

theLift(queues, maxCapacity);