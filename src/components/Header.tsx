import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faUpload } from '@fortawesome/free-solid-svg-icons';

function Header(props: any) {
    return (
        <section className="header">
            <div className="container">
                <div className="row headerRow">
                    <div className="col-md-6">
                        <h1> <FontAwesomeIcon icon={faCat} /> All Cats are Beautiful</h1>
                    </div>
                    <div className="col-md-6 uploadSection">
                        {props.root &&
                            <Link to="/upload">
                                <div className="uploadCatIcon">
                                    <FontAwesomeIcon icon={faUpload} />
                                    <div className="uploadText">Upload New Cat</div>
                                </div>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header;
