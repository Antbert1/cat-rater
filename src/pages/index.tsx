import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import Header from '../components/Header';
import Loading from '../components/Loading';
import { setCatList } from '../redux/indexActions';
import { retrieveCats } from '../util';
const preUrl = 'https://api.thecatapi.com';

function RootPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(false);
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

    }

    function vote(cat: any, vote: boolean) {

    }

    function showCats() {
        return catList.map((cat: any, index: number) => {
            return (
                <div key={index} className="catContainer" >
                    <div className="innerContainer">
                        <img src={cat.url} alt="cat" />
                        <div className="extraInfo">
                            {cat.favourite ?
                                <i className="fas fa-heart heart" onClick={() => favourite(cat, false)}></i>
                                :
                                <i className="far fa-heart heart" onClick={() => favourite(cat, true)}></i>
                            }
                            <div className="votes">
                                <i className="fas fa-arrow-up voteArrow voteArrowU" onClick={() => vote(cat, true)}></i>
                                <i className="fas fa-arrow-down voteArrow voteArrowD" onClick={() => vote(cat, false)}></i>
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
            <div className="container">
                {loading && <Loading />}
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

