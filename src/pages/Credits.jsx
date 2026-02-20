import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Credits() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
            <div className="flex flex-col items-center text-center w-[min(900px,90%)]">
                <h1 className="font-open-sans font-bold text-[clamp(2rem,5vw,4rem)] leading-tight mb-2">Not Available</h1>
                <p className="font-open-sans text-[clamp(1rem,2.5vw,1.67rem)] font-medium leading-relaxed mb-8">
                    As of the current release, this page is still a work in progress and and thus will not be released. In the meantime, you can browse our Wiki page or join our Discord to interact with our developers and receive updates on the mod or site.
                </p>
                <div className="flex gap-5 flex-wrap justify-center">
                    <Link className="inline-flex items-center justify-center gap-2 bg-blue-600 text-gray-900 font-bold px-6 py-3 rounded-2xl hover:bg-blue-700" to="/wiki">
                        <Icon icon="ci:globe" width="30" height="30" />
                        Return to Wiki
                    </Link>
                    <a href="https://discord.gg/8976SawrW5" target="_blank" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-gray-900 font-bold px-6 py-3 rounded-2xl hover:bg-blue-700">
                        <Icon icon="streamline-logos:discord-logo-2-solid" width="30" height="30" />
                        Join Discord
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Credits