import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat } from '@fortawesome/free-solid-svg-icons'



function Header() {
    return (
        <section className="header">
            <div className="container">
                <div className="row">
                    <h1> <FontAwesomeIcon icon={faCat} /> All Cats are Beautiful</h1>
                </div>
            </div>

        </section>
    )
}

export default Header;
