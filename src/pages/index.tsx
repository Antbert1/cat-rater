import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { setCatList } from '../redux/indexActions';
import { favouriteCat, retrieveCats, voteCat } from '../util';
const preUrl = 'https://api.thecatapi.com';

function RootPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(false);
    const [faveError, setFaveError] = useState(false);
    const [voteError, setVoteError] = useState(false);
    const catList = useSelector((state: RootStateOrAny) => state.dataReducer.catList);
    useEffect(() => {
        getCats();
    }, []);

    function getCats() {
        const requestOptions = {
            method: 'GET',
            headers: { 'x-api-key': '45d49036-1938-44e2-b443-af805aeb55fb' }
        };

        retrieveCats(preUrl, requestOptions).then(function (result) {
            setLoading(false);
            if (result === "Error") {
                setErrorMsg(true);
            } else {
                if (result) {
                    dispatch(setCatList(result));
                }
            }
        });
    }

    function favourite(cat: any, favourite: boolean) {
        var bodyToSend = {
            "image_id": cat.id,
            "sub_id": cat.sub_id
        }
        //Choose request options and url based on if it's a favourite or unfavourite
        let requestOptions = {};
        if (favourite) {
            requestOptions = {
                method: 'POST',
                headers: { 'content-type': 'application/json', 'x-api-key': '45d49036-1938-44e2-b443-af805aeb55fb' },
                body: JSON.stringify(bodyToSend)
            };
        } else {
            requestOptions = {
                method: 'DELETE',
                headers: { 'x-api-key': '45d49036-1938-44e2-b443-af805aeb55fb' }
            };
        }

        let url = (favourite ? preUrl + "/v1/favourites" : preUrl + "/v1/favourites/" + cat.favouriteID);

        favouriteCat(url, requestOptions).then(function (result) {
            if (result) {
                let newCats = [...catList];
                for (var i = 0; i < catList.length; i++) {
                    if (catList[i].id === cat.id) {
                        newCats[i].favourite = favourite;
                    }
                }
                dispatch(setCatList(newCats));
            } else {
                setFaveError(true);
            }

        })


    }

    function vote(cat: any, vote: number) {
        var bodyToSend = {
            "image_id": cat.id,
            "sub_id": cat.sub_id,
            "value": vote
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'x-api-key': '45d49036-1938-44e2-b443-af805aeb55fb' },
            body: JSON.stringify(bodyToSend)
        };

        voteCat(preUrl, requestOptions).then(function (result) {
            if (result) {
                let newCats = [...catList];
                for (var i = 0; i < catList.length; i++) {
                    if (catList[i].id === cat.id) {
                        newCats[i].votes = vote;
                    }
                }
                dispatch(setCatList(newCats));
            } else {
                setVoteError(true);
            }
        });
    }

    function showCats() {
        return catList.map((cat: any, index: number) => {
            return (
                <div key={index} className="catContainer" >
                    <div className="innerContainer">
                        <img src={cat.url} alt="cat" />
                        <div className="extraInfo">
                            {cat.favourite ?
                                <FontAwesomeIcon icon={faHeart} onClick={() => favourite(cat, false)} />
                                :
                                <FontAwesomeIcon icon={farHeart} onClick={() => favourite(cat, true)} />
                            }
                            <div className="votes">
                                <FontAwesomeIcon icon={faArrowUp} onClick={() => vote(cat, 1)} />
                                <FontAwesomeIcon icon={faArrowDown} onClick={() => vote(cat, 0)} />
                                <div className="totalVotes">
                                    {cat.votes}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

    }

    return (
        <div>
            <Header root />
            {loading && <Loading />}
            <div className="container">
                {errorMsg &&
                    <div className="catRetrievalError">
                        There has been a problem retrieving your cats. Please check your internet connection and try again
                    </div>
                }
                {catList.length === 0 && !loading ?
                    <div className="catRetrievalError">
                        No cats yet. Click up Upload Cat to get started.
                    </div>
                    :
                    <div className="catRows">
                        {showCats()}
                    </div>
                }
            </div>

        </div>
    )
}

export default RootPage;

