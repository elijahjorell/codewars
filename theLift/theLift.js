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
    const log = [];
    const lift = {
        floor: 0,
        persons: [],
        direction: 'none',
    };
    const floors = queues.map((queue, floor) => {
        const persons = queue.map(function(targetFloor) {
            return new Person(targetFloor, targetFloor > this.floor ? 'up' : 'down');
        }, {floor: floor});
        return {
            persons: persons,
            liftCallButtons: getUniqueFloorLiftCallButtons(persons)
        }
    })        

    console.log(floors);

    return log;
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