import { NavLink } from "react-router-dom";
import { getName, getPhotoUrl, getSubText, getYear } from "../../services/ServicesExport";

export function SearchResultsItem({ mediaType, item }: any){
    const subText: string = getSubText(item);

    return (
        <div className="search-item py-1 flex cursor-default">
            <div className={ mediaType === 'person' ? 'rounded-full' : 'image' }
                style={{
                    background: `url('${getPhotoUrl(item)}') center/cover`,
                    height: mediaType === 'person' ? '40px' : '60px',
                    width: mediaType === 'person' ? '40px' : '40px'
                }}
            >
            </div>
            <div className="ml-4 flex flex-col">
                <span className="text-white hover:underline cursor-pointer mb-1">
                    <NavLink to={`/${mediaType}/${item.id}`}>{ getName(item) } { getYear(item, true)  }</NavLink>
                </span>
                {
                    item?.character && item.character.length &&
                    <p className="color-app text-xs" style={{ marginTop: '-3px' }}>as { item?.character }</p>
                }
                <p className="text-gray-500 text-xs">{ subText }</p>
            </div>
        </div>
    );
}