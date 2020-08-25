// https://www.codewars.com/kata/58905bfa1decb981da00009e

const queues = [
    [],     // G
    [3, 3, 3, 3, 3],    // 1
    [4],    // 2
    [],     // 3
    [5],    // 4
    [],     // 5
    [],     // 6
];
const maxLiftCapacity = 5; // answer is [0, 1, 2, 3, 4, 5, 0]

function theLift(queues, maxLiftCapacity) {
    const lift = {
        direction: 'up',
        floor: 0,
        log: [],
        persons: [],
        queuedFloors: []
    };
    const floors = queues.map((queue, floor) => {
        const persons = queue.map(function(targetFloor) {
            return new Person(targetFloor, targetFloor > this.floor ? 'up' : 'down');
        }, {floor: floor});
        return {
            persons: persons,
            liftCallButtons: getUniqueValuesOfAttributeFromPersons(persons, 'liftCallButton')
        }
    });

    for (var i = 0; i < 5; i++) {
        // log floor
        lift.log.push(lift.floor);
        
        // let people out/keep only people with a target floor different to current floor in lift
        lift.persons = lift.persons.reduce((arr, person) => {
            if (person.targetFloor !== lift.floor) {
                arr.push(person);
            }
            return arr;
        }, []);

        // pick up persons from current floor that are going in the same direction as
        if (floors[lift.floor].persons.length > 0) {
            floors[lift.floor].persons = floors[lift.floor].persons.reduce((arr, person) => {
                if (person.liftCallButton === lift.direction && lift.persons.length <= maxLiftCapacity) {
                    lift.persons.push(person);
                } else {
                    arr.push(person);
                }
                return arr;
            }, []);
        }

        // update floor lift call buttons
        floors[lift.floor].liftCallButtons = getUniqueValuesOfAttributeFromPersons(floors[lift.floor].persons, 'liftCallButton');
        
        // get queue of floors to go to
        lift.queuedFloors = getQueuedFloors(floors, lift);
        
        console.log('-------- ITERATION ' + (i + 1) + ' --------');
        console.log(lift);
        console.log(floors);

        // move to next floor in queuedFloor
        lift.floor = lift.queuedFloors.shift();
    }

    return lift.log;
}
class Person {
    constructor(targetFloor, liftCallButton) {
        this.targetFloor = targetFloor;
        this.liftCallButton = liftCallButton;
    }
}

function getUniqueValuesOfAttributeFromPersons(persons, attribute) {
    return [... new Set(persons.map((person) => person[attribute]))];
}

function getFloorsWithButtonPressedSameDirection(floors, lift) {

}

function getQueuedFloors(floors, lift) {
    const floorsButtonPressedSameDirection = floors.reduce((arr, floor, idx) => {
        if (floor.liftCallButtons.includes(lift.direction)) {
            arr.push(idx);
        };
        return arr;
    }, []);
    const targetFloorsPersonsInLift = getUniqueValuesOfAttributeFromPersons(lift.persons, 'targetFloor');

    return [... new Set(floorsButtonPressedSameDirection.concat(targetFloorsPersonsInLift))].sort((a, b) => a - b);
}



theLift(queues, maxLiftCapacity);