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
const maxCapacity = 4; // answer is [0, 1, 2, 3, 4, 5, 0]


function theLift(queues, maxCapacity) {
    const lift = new Lift(maxCapacity);
    const floors = queues.map((queue, level) => new Floor(level, queue));
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

class Lift {
    constructor(maxCapacity) {
        this.direction = 'up';
        this.level = 0;
        this.log = [];
        this.maxCapacity = maxCapacity;
        this.persons = [];
        this.queuedLevels = [];
    }
    changeDirection() {
        this.direction = this.getOppositeDirection();
    }
    getInfoOfFloorsRelativeToLift(floors) {
        return floors
            .reduce((floorsWithButtonPressed, floor) => {
                if (floor.liftCallButtons.includes('up')) {
                    if (floor.level > this.level) {
                        floorsWithButtonPressed.up.enRoute.push(floor.level);
                    } else if (floor.level < this.level) {
                        floorsWithButtonPressed.up.notEnRoute.push(floor.level);
                    }
                }
                if (floor.liftCallButtons.includes('down')) {
                    if (floor.level > this.level) {
                        floorsWithButtonPressed.down.notEnRoute.push(floor.level);
                    } else if (floor.level < this.level) {
                        floorsWithButtonPressed.down.enRoute.push(floor.level);
                    }
                }
                return floorsWithButtonPressed;
            }, { up: { enRoute: [], notEnRoute: [] }, down: { enRoute: [], notEnRoute: [] } });
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
    updateQueuedLevels(floors) {
        const targetFloorsOfLoadedPersons = this.persons.map((person) => floors[person.targetLevel]);
        const floorsWithButtonPressed = this.getInfoOfFloorsRelativeToLift(floors.filter((floor) => floor.liftCallButtons.length));
            
        // console.log(this.getInfoOfFloorsRelativeToLift(targetFloorsOfLoadedPersons));
        // console.log(floorsWithButtonPressed);
        
        if (floorsWithButtonPressed[this.direction].enRoute.length) {
            this.queuedLevels = floorsWithButtonPressed[this.direction].enRoute
            console.log('Case 1');
        } else if (floorsWithButtonPressed[this.getOppositeDirection()].notEnRoute.length) {
            this.queuedLevels = floorsWithButtonPressed[this.getOppositeDirection()].notEnRoute
            this.changeDirection();
            console.log('Case 2');
        } else if (floorsWithButtonPressed[this.getOppositeDirection()].enRoute.length) {
            this.queuedLevels = floorsWithButtonPressed[this.getOppositeDirection()].enRoute;
            this.changeDirection();
            console.log('Case 3');
        } else if (floorsWithButtonPressed[this.direction].notEnRoute.length) {
            this.queuedLevels = floorsWithButtonPressed[this.direction].notEnRoute;
            console.log('Case 4');
        }

        // this.queuedLevels = this.queuedLevels
        //     .sort((a, b) => directionOfLoadedPersons === 'up' ? a - b : b - a)
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