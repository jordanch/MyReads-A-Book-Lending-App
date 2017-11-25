/**
 *
 * @param {object} shelfGroups {shelfId: [bookId, ...], }
 * @return {object} { bookId: shelfIf, }
 */

export function buildBookIdShelfMap(shelfGroups) {

    return Object.keys(shelfGroups).reduce((acc, shelfCategory) => {
        const shelf = shelfCategory;
        const bookIds = shelfGroups[shelf];
        bookIds.forEach(bookId => acc[bookId] = shelf);

        return acc;
    }, {});
};