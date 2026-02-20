import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Copyright from "../assets/components/Copyright";


function Home() {
    return (
        <div className="flex items-center justify-center h-full text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
            <div className="relative z-10 flex flex-col items-center text-center w-[min(900px,95%)]">
                <h1 className="font-open-sans font-bold text-[clamp(2rem,5vw,4rem)] leading-tight mb-2">Two Minutes to Midnight</h1>
                <p className="font-open-sans text-[clamp(1rem,2.5vw,1.67rem)] font-medium leading-relaxed mb-8">
                    Talons in Twilight is a Hearts of Iron IV Mod where a German Republic led Democratic Faction attempts to resist the crypto-fascist USA and their aims to become the dominant nation of the world, while both simultaneously seek to keep the communists of East Asia contained
                </p>
                <div className="flex gap-5 flex-wrap justify-center">
                    <Link className="inline-flex items-center justify-center gap-2 bg-blue-600 text-gray-900 font-bold px-6 py-3 rounded-2xl hover:bg-blue-700" to="/wiki">
                        <Icon icon="ci:globe" width="30" height="30" />
                        Read the Wiki
                    </Link>
                    <a href="https://discord.gg/8976SawrW5" target="_blank" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-gray-900 font-bold px-6 py-3 rounded-2xl hover:bg-blue-700">
                        <Icon icon="streamline-logos:discord-logo-2-solid" width="30" height="30" />
                        Join Discord
                    </a>
                </div>
            </div>
            <footer className="fixed bottom-0 left-0 right-0 w-full flex flex-col items-center justify-center p-4">
                <Copyright />
            </footer>
        </div>
    );
}

export default Home;