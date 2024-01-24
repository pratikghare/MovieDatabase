import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { getName, getPhotoUrl } from "../../services/ServicesExport";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export default function Credits({ heading, allCredits, mediaType, allText, details }: any){
    const navigate = useNavigate();
    const cast = allCredits.cast.slice(0, 15);

    return (
        <div className="credits cursor-default">
            <h1 className="text-white text-xl flex border-l-4 pl-3 border-app">
                { heading }
                <ChevronRightIcon className="h-8 w-8 color-app" style={{ marginTop: '-1px' }} />
            </h1>

            <div className="light-bottom-border flex mt-5 overflow-x-auto text-center">
                {
                    cast && cast.length ?
                    cast?.map((item: any, index: number) => (
                        <div  key={'cast-item-'+index} className="mr-8 pb-5">
                            <div className={ mediaType !== 'person' ? "rounded-full" : "rounded-sm"}
                                style={{
                                    background: `url('${getPhotoUrl(item)}') center/cover`,
                                    height: mediaType !== 'person' ? '150px': '200px',
                                    width: mediaType !== 'person' ? '150px': '150px'
                                }}
                            >
                            </div>
                            <p className="text-white mt-2 cursor-pointer hover:underline"
                                onClick={() => navigate(`/${item.media_type ? item.media_type : 'person'}/${item.id}`)}
                            >{ getName(item) }</p>
                            <p className="text-gray-400 text-xs">{item?.character}</p>
                        </div>
                    )) :
                    <></>
                }
            </div>

            {
                allText && allText?.length ?
                <NavLink to={`/${mediaType}/credits/${details.id}`} state={{ details, allCredits }} className="text-gray-200 hover:bg-black hover:bg-opacity-10 w-full p-2 pl-5 flex justify-between items-center light-bottom-border">
                    <h1>{ allText }</h1>
                    <ChevronRightIcon className="h-6 w-6" />
                </NavLink>
                : <></>
            }
        </div>
    );
}