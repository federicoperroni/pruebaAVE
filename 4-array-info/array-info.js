function analyzeArray(arr) {
    const totalElements = arr.length;
    const evenNumbers = arr.filter(num => num % 2 === 0);
    const oddNumbers = arr.filter(num => num % 2 !== 0);
    const numbersGreaterThan1000 = arr.filter(num => num > 1000);

    const percentageEvenNumbers = (evenNumbers.length / totalElements) * 100;
    const percentageOddNumbers = (oddNumbers.length / totalElements) * 100;
    const percentageNumbersGreaterThan1000 = (numbersGreaterThan1000.length / totalElements) * 100;

    const maxNumber = Math.max(...arr);
    const minNumber = Math.min(...arr);
    const sumOfNumbers = arr.reduce((acc, num) => acc + num, 0);
    const averageNumber = sumOfNumbers / totalElements;

    const percentageMinNumber = (minNumber / maxNumber) * 100;
    const percentageAverageNumber = (averageNumber / maxNumber) * 100;

    return {
        totalElements,
        percentageEvenNumbers,
        percentageOddNumbers,
        percentageNumbersGreaterThan1000,
        maxNumber,
        minNumber,
        percentageMinNumber,
        percentageAverageNumber,
    };
}

// Ejemplo
const numbersArray = [2845, 2911, 2681, 1885, 2163, 229, 1132, 1031, 480, 1973, 702, 2333,];
console.log('data: ', numbersArray)
const analysisResult = analyzeArray(numbersArray);
console.log(analysisResult);
