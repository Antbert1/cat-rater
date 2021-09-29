export const TEMP = 'TEMP';

export function setTemp(temp) {
    return {
        type: TEMP,
        temp,
    };
}