function curr_date_time() {
    var d = new Date(),
        seconds = d.getSeconds().toString().length == 1 ? '0' + d.getSeconds() : d.getSeconds(),
        minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[d.getDay()] + '-' + months[d.getMonth()] + '-' + d.getDate() + '-' + d.getFullYear() + '-' + hours + '-' + minutes + '-' + seconds;
}

function generatePermutations(arr, length) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('Input array must be a non-empty array.');
    }

    if (length <= 0 || length > arr.length) {
        throw new Error('Length should be a positive integer less than or equal to the array length.');
    }

    const result = [];
    permuteHelper([], arr, length, result);
    return result;
}

function permuteHelper(current, remaining, length, result) {
    if (current.length === length) {
        result.push([...current]);
    } else {
        for (let i = 0; i < remaining.length; i++) {
            const next = remaining.splice(i, 1)[0];
            current.push(next);
            permuteHelper(current, remaining, length, result);
            current.pop();
            remaining.splice(i, 0, next);
        }
    }
}

// Example usage:
// const inputArray = ['A', 'B', 'C', 'D', 'E', 'F'];
// const length = 2;
// const permutations = generatePermutations(inputArray, length);

// console.log(permutations.length)
// console.log(permutations);

function generateCombinationsWithDuplicates(arr, length) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('Input array must be a non-empty array.');
    }

    if (length <= 0) {
        throw new Error('Length should be a positive integer.');
    }

    const result = [];
    combineHelper([], arr, length, result);
    return result;
}

function combineHelper(current, arr, length, result) {
    if (current.length === length) {
        result.push([...current]);
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        current.push(arr[i]);
        combineHelper(current, arr, length, result);
        current.pop();
    }
}

// Example usage:
// const inputArray = ['A', 'B', 'C', 'D'];
// const length = 4;
// const combinations = generateCombinationsWithDuplicates(inputArray, length);

// console.log(combinations.length);
// console.log(combinations);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    curr_date_time,
    generatePermutations,
    generateCombinationsWithDuplicates,
    sleep
};
