
export function retrieveCats(preUrl, requestOptions) {
    return fetch(`${preUrl}/v1/images?limit=100`, requestOptions)
        .then(response => response.json())
        .then((responseJson) => {
            if (responseJson.length === undefined) {
                //An error has occured

            } else {
                let unique = removeDuplicates(responseJson, "sub_id");
                return getFavourites(preUrl, requestOptions, unique);
            }
        })
        .catch((error) => {
            console.log(error);
            return ("Error");
        });
}

function getFavourites(preUrl, requestOptions, unique) {
    return fetch(`${preUrl}/v1/favourites?limit=100`, requestOptions)
        .then(response => response.json())
        .then((responseJson) => {
            if (responseJson.length === undefined) {
                //An error has occured
            } else {
                return getVotes(preUrl, requestOptions, responseJson, unique);
            }
        })
        .catch((error) => {
            console.log(error);
            return ("Error");
        });
}

function getVotes(preUrl, requestOptions, favourites, unique) {
    return fetch(`${preUrl}/v1/votes?limit=100`, requestOptions)
        .then(response => response.json())
        .then((responseJson) => {
            if (responseJson.length === undefined) {
                //An error has occured
            } else {
                return addFavouritesAndVotes(unique, favourites, responseJson);
            }
        })
        .catch((error) => {
            console.log(error);
            return ("Error");
        });
}

function removeDuplicates(catArr, prop) {
    return catArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

function addFavouritesAndVotes(cats, favourites, votes) {
    // Check full unique cat list against favourites and votes to set up initial page
    cats.map((cat) => {
        cat.favourite = false;
        cat.votes = 0;
        cat.favouriteID = -1;
        for (var i = 0; i < favourites.length; i++) {
            if (favourites[i].image_id === cat.id) {
                cat.favourite = true;
                cat.favouriteID = favourites[i].id;
            }
        }
        for (var j = 0; j < votes.length; j++) {
            if (votes[j].image_id === cat.id) {
                cat.votes = votes[j].value;
            }
        }
        return cat;
    });
    return cats;
}

export function favouriteCat(url, requestOptions) {
    return (
        fetch(url, requestOptions)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.message === 'SUCCESS') {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((error) => {
                console.log(error);
                return (false);
            })
    );
}

export function voteCat(preUrl, requestOptions) {
    return (
        fetch(`${preUrl}/v1/votes`, requestOptions)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.message === 'SUCCESS') {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((error) => {
                console.log(error);
                return (false);
            })
    );
}

