export const formatNumber = (num: number, minDecimals = 4) => {
    let digits = num.toString();
    const zerosToAdd = minDecimals - digits.length;

    for (let i = 0; i < zerosToAdd; i++) {
        digits = "0" + digits;
    }

    return digits;
};