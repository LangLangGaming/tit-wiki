import React from "react";
import '../assets/css/Dev-diaries.css';
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Copyright from "../assets/components/Copyright";

function DevDiaries() {
    return (
        <>
            <div className="title">
                <h1>Not Available</h1>
                <p>As of the current release, this page is still a work in progress and and thus will not be released. In the meantime, you can browse our Wiki page or join our Discord to interact with our developers and receive updates on the mod or site. </p>
                <div>
                    <Link className="wiki-button" to="/wiki">
                        <Icon icon="ci:globe" width="30" height="30 " />
                        Return to Wiki
                    </Link>
                    <a href="https://discord.gg/8976SawrW5" target="_blank" className="wiki-button">
                        <Icon icon="streamline-logos:discord-logo-2-solid" width="30" height="30" />Join Discord</a>
                </div>
            </div>
        </>
    )
}

export default DevDiaries;