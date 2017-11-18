export function isNullOrUndefined(value) {
    if (value === undefined) {
        return true;
    } else if (value === null) {
        return true;
    } else {
        return false;
    }
}

export function safe(fn, fallBackType) {
    try {
        return fn()
    } catch (e) {
        if (e instanceof TypeError || e instanceof ReferenceError) {
            return fallBackType;
        } else {
            throw(e);
        }
    }
}

export function isEmptyReferenceType(refType) {
    if (refType instanceof Object) {
        if (Object.keys(refType).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}