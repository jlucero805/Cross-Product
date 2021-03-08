/* Constants */
const history = new Map();

/* functions */

const parseString = string => {
    let temp = '';
    for (const char of string) {
        if (char != "<" && char != ">" && char != " ") {
            temp += char;
        }
    }
    return temp.split(',');
}

const parsedStringToNum = array => {
    let temp = [];
    for (const num of array) {
        let tempString = '';
        if (num[0] == '-') {
            for (const char of num) {
                if (char != '-') {
                    tempString += char;
                }
            }
            temp.push(-1 * Number(tempString));
        } else {
            temp.push(Number(num));
        }
    }
    return temp;
}

const crossProduct = (a, b) => {
    return [(a[1] * b[2] - a[2] * b[1]), (-(a[0] * b[2] - a[2] * b[0])), (a[0] * b[1] - a[1] * b[0])];
}

const vectorToString = array => {
    return `<${array[0]}, ${array[1]}, ${array[2]}>`;
}

const fixString = string => {
    let res = '';
    for (const char of string) {
        if (char != ' ') {
            res += char;
        }
    }
    return res;
}

const computeButton = () => {
    let var1 = parsedStringToNum(parseString(a.value));
    let var2 = parsedStringToNum(parseString(b.value));

    let cross = crossProduct(var1, var2);
    let vector = vectorToString(cross);
    outputDisplay.innerHTML = vector;

    /* create history */
    if (!history.has(vector)) {
        history.set(vector, true);
        var newDiv = document.createElement('div');
        newDiv.innerHTML = `${fixString(a.value)} X ${fixString(b.value)} = ${vector}`;
        historyContainer.appendChild(newDiv);
    }

    comp.blur();
}

/* DOM */
const a = document.getElementById('a');
const b = document.getElementById('b');
const comp = document.getElementById('compute');
const outputDisplay = document.getElementById('outDisplay');
const historyContainer = document.getElementById('historyContainer');
const instructions = document.getElementById('instructions');

comp.addEventListener('click', () => {
    computeButton();
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        computeButton();
    }
})

instructions.addEventListener('click', () => {
    alert('Enter a value between less than and greater than signs, and separate with a comma. Example: <3, -2, 3>');

    instructions.blur();
})





/* tests */
console.log(parseString('<-4, 2, 6>'));

console.log(parsedStringToNum(parseString('<-4, -2342,- 6>')));

console.log(vectorToString(crossProduct(parsedStringToNum(parseString('<1,6,0>')), parsedStringToNum(parseString('<-2,5,0>')))))