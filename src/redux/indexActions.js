export const CATLIST = 'CATLIST';

export function setCatList(catList) {
    return {
        type: CATLIST,
        catList,
    };
}