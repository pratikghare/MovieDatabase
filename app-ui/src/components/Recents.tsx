import { useNavigate } from "react-router-dom";
import { Recent, clearRecents, parseString } from "../services/ServicesExport";
import { useEffect, useState } from "react";

// const default_arr: Array<Recent> = [];
export default function Recents(){
    const [recents, setRecents]= useState(parseString(localStorage.getItem('recents')));
    const navigate = useNavigate();

    
    return (
        recents && recents.length ?
        <div className="recent-container w-full">
            <div className="heading mb-2 flex justify-between items-center">
                <h1 className="text-white text-xl">Recently Viewed</h1>
                <button onClick={() => clearRecents(setRecents)} className="color-app text-xs hover:underline">Clear All</button>
            </div>
            <div className="recents text-white">
            {
                    recents.map((recent: Recent) => (
                        <div className="recent" key={`recent-${recent.mediaType}-${recent.id}`}>
                            <div onClick={() => navigate(`/${recent.mediaType}/${recent.id}`)} className="recent-image" style={{ background: `url('${recent.imageUrl}') center/cover` }}></div>
                            <p onClick={() => navigate(`/${recent.mediaType}/${recent.id}`)} className="hover:underline">{ recent.name } { recent.year }</p>
                            {/* <p className="text-xs">{ recent.subText }</p> */}
                        </div>
                    ))
                }
            </div>
        </div>
        : <></>
    );
}