import react from 'react';
import { useLocation } from 'react-router';

function Copyright({hidden=false}) {
    const location = useLocation();
 if (hidden) return null



    return (
        <>
            <h1 className="text-gray-300 font-open-sans text-center text-sm">Talons in Twilight Website v0.1.4<br></br>
            Copyright © 2026 Loredadmedia. All rights reserved.</h1>
        </>
    );
}   

export default Copyright;   