import { NavLink } from "react-router-dom";
import { getName, getPhotoUrl, getYear } from "../../services/ServicesExport";

export function MoreDetailsHead({ details, mediaType, text }: any){
    return (
        <div className="flex mb-6">
            <div
                className="rounded-sm"
                style={{
                    height: '100px',
                    width: '67px',
                    marginRight: '1em',
                    background: `url('${getPhotoUrl(details)}') center/cover`,
                }}
            >
            </div>
            <div className="heading text-gray-200 cursor-default">
                <h1>
                    <NavLink className="font-bold hover:underline" to={'/'+mediaType+'/'+details?.id}>
                        { getName(details) } { getYear(details, true) }
                    </NavLink>
                </h1>
                <p className="text-xl">{ text }</p>
            </div>
        </div>
    );
}