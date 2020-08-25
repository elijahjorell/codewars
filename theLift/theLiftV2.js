// https://www.codewars.com/kata/58905bfa1decb981da00009e

const queues = [
    [], // G
    [], // 1
    [1,1], // 2
    [], // 3
    [], // 4
    [], // 5
    [], // 6
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
    constructor(targetFloor, liftCallButton) {
        this.targetFloor = targetFloor;
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
    getFloorsWithSameDirectionButtonPressed(floors) {
        return floors.reduce((arr, floor, idx) => {
            if (floor.liftCallButtons.includes(this.direction)) {
                arr.push(idx);
            };
            return arr;
        }, []);
    }
    load(floor) {
        floor.persons = floor.persons.reduce((newFloorPersons, floorPerson) => {
            if (floorPerson.liftCallButton === this.direction && this.persons.length <= this.maxCapacity) {
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
            if (person.targetFloor !== this.floor) {
                newPersons.push(person);
            }
            return newPersons;
        }, []);
    }
    updateQueuedFloors(floors) {
        const targetFloorsOfPersonsInLift = [... new Set(this.persons.map((person) => person.targetFloor))];
        var floorsButtonPressedSameDirection = this.getFloorsWithSameDirectionButtonPressed(floors);
    
        if (!floorsButtonPressedSameDirection.length) {
            this.direction = this.direction === 'up' ? 'down' : 'up';
            floorsButtonPressedSameDirection = this.getFloorsWithSameDirectionButtonPressed(floors);

        }

        this.queuedFloors = [... new Set(floorsButtonPressedSameDirection.concat(targetFloorsOfPersonsInLift))];

        if (this.direction === 'up') {
            this.queuedFloors = this.queuedFloors.sort((a, b) => a - b);
        } else {
            this.queuedFloors = this.queuedFloors.sort((a, b) => b - a);
        }
    }
}

class Floor {
    constructor(level, queue) {
        this.level = level;
        this.persons = queue.map((targetFloor) => {
            return new Person(targetFloor, targetFloor > level ? 'up' : 'down');
        });
        this.liftCallButtons = undefined;
        this.updateLiftCallButtons();
    }
    updateLiftCallButtons() {
        this.liftCallButtons = [... new Set(this.persons.map((person) => person.liftCallButton))];
    }
}

theLift(queues, maxCapacity);