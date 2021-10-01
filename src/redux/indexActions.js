export const CATLIST = 'CATLIST';
export const LOADING = 'LOADING';

export function setCatList(catList) {
    return {
        type: CATLIST,
        catList,
    };
}

export function setLoading(loading) {
    return {
        type: LOADING,
        loading,
    };
}