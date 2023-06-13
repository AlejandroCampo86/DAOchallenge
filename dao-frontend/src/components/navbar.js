import React from 'react';
import DAOLOGO from '../../src/assets/dao-logo.jpg';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-brand" href="#">DAO CHALLENGE</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className="nav-item dropdown">


                        </li>
                        <li className="nav-item">

                        </li>
                    </ul>
                    <div className="dao-logo-container-small">
                        <img src={DAOLOGO} alt="DAO Logo" className="dao-logo-small" />
                    </div>
                </div>
            </div>
        </nav>
    )
}
