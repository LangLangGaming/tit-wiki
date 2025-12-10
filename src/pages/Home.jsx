import React from "react";
import '../assets/css/Home.css';
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
        <div className="home-page">
                    <div className="title">
                        <h1>Two Minutes to Midnight</h1>
                        <p>Talons in Twilight is a Scenario where a German Republic led Democratic Faction attempts to resist the crypto-fascist USA and their aims to become the dominant nation of the world, while both simultaneously seek to keep the communists of East Asia contained.</p>
                        <div>
                            <Link className="wiki-button" to="/wiki"> 
                                <Icon icon="ci:globe" width="30" height="30 " />
                                Read the Wiki
                            </Link>
                        </div>
                    </div>
                    <h1 className="copyright">Copyright © 2025 Talons in Twilight. All rights reserved.</h1>
            </div>
        </>
    )
}

export default Home;