import { NavLink } from "react-router-dom";
import { getName } from "../../services/ServicesExport";

export default function BoxCredits({ directors, writers, producers, mediaType }: any){
    return(
        mediaType !== 'person' && (writers?.length || producers?.length || directors?.length) ?
        <div className="boxCredits text-gray-300">
            {
                directors?.length &&
                <>
                    <h1 className="color-app mb-2">Directed by</h1>
                    {
                        directors.map((item: any, index: number) => (
                            <div className="crew-item text-sm grid grid-cols-4 gap-5 mb-1"  key={'dir-'+item.known_for_department+item.id+index}>
                                <NavLink className="text-blue-500" to={'/person/'+item.id}>{ getName(item) }</NavLink>
                                <p className="justify-self-end">...</p>
                                <p>{ item.job }</p>
                            </div>
                        ))
                    }
                </>
                
            }
            {
                writers?.length &&
                <>
                    <h1 className="color-app mb-2 mt-4">Writers</h1>
                    {
                        writers.map((item: any, index: number) => (
                            <div className="crew-item text-sm grid grid-cols-4 gap-5 mb-1"  key={'wri-'+item.known_for_department+item.id+index}>
                                <NavLink className="text-blue-500" to={'/person/'+item.id}>{ getName(item) }</NavLink>
                                <p className="justify-self-end">...</p>
                                <p>{ item.job }</p>
                            </div>
                        ))
                    }
                </>  
            }
            {
                producers?.length &&
                <>
                    <h1 className="color-app my-2 mt-4">Producers</h1>
                    {
                        producers.map((item: any, index: number) => (
                            <div className="crew-item text-sm grid grid-cols-4 gap-5 mb-1"  key={'prod-'+item.known_for_department+item.id+index}>
                                <NavLink className="text-blue-500" to={'/person/'+item.id}>{ getName(item) }</NavLink>
                                <p className="justify-self-end">...</p>
                                <p>{ item.job }</p>
                            </div>
                        ))
                    }
                </>  
            }
        </div> :<></>
    );
} 