export const formatNumber = (num: number, minDecimals = 4) => {
    let digits = num.toString();
    const zerosToAdd = minDecimals - digits.length;

    for (let i = 0; i < zerosToAdd; i++) {
        digits = "0" + digits;
    }

    return digits;
};

export const getFamily = (fullNumber: number) => {
    let num = fullNumber % 100
    let unidad = num % 10
    let decena = Math.floor(num / 10)
    return unidad < decena ? (unidad * 10 + decena) : num
}

export const getIndexOfMaxValue = (arr: number[]) => {
    let best = 0
    let max = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
            best = i
        }
    }

    return best
}