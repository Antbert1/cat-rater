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

    function showCats() {
        return catList.map((cat: Object, index: number) => {
            return (
                <div key={index}>test</div>
            );
        });

    }

    return (
        <div>
            <Header root />
            {loading ?
                <Loading />
                :
                <div>
                    {showCats()}
                </div>
            }
        </div>
    )
}

export default RootPage;

