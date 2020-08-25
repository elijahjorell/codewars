// https://www.codewars.com/kata/58905bfa1decb981da00009e

const queues = [
    [],     // G
    [3],    // 1
    [4],    // 2
    [],     // 3
    [5],    // 4
    [],     // 5
    [],     // 6
];
const capacity = 5; // answer is [0, 1, 2, 3, 4, 5, 0]

function theLift(queues, capacity) {
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
            liftCallButtons: getUniqueFloorLiftCallButtons(persons)
        }
    });

    if (floors[lift.floor].persons.length > 0) {
    
    }



    // loop
        // if floor not empty: allow people going same direction in (if capacity is not max)
        // get next floor in queudFloors (if no more going in same direction, scan floors to see lowest person going up or highest person going down)
        // move to next floor

    console.log(floors);

    return lift.log;
}

function getUniqueFloorLiftCallButtons(persons) {
    return [... new Set(persons.map((person) => person.liftCallButton))];
}

class Person {
    constructor(targetFloor, liftCallButton) {
        this.targetFloor = targetFloor;
        this.liftCallButton = liftCallButton;
    }
}

theLift(queues, capacity);