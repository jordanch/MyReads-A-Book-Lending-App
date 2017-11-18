export function isNullOrUndefined(value) {
    if (value === undefined) {
        return true;
    } else if (value === null) {
        return true;
    } else {
        return false;
    }
}