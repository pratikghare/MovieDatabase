import { getName, getPhotoUrl, getSubText, getYear } from "../../services/ServicesExport";

export default function SearchOptionItem({ item }: any){
    const subText: string = getSubText(item);

    return (
        <div style={{ height: '90px', width: '100%', gridTemplateColumns: '65px 1fr' }} className="grid gap-3">
            <div style={{ background: `url('${getPhotoUrl(item)}') center/cover` }}></div>

            <div>
                <p>{ getName(item) } </p>
                {
                    item['media_type'] !== 'person' ?
                    <><sub> { getYear(item) } </sub> <br/></> : <></>
                }
                <sub>{ subText }</sub>
            </div>
        </div>
    );
}