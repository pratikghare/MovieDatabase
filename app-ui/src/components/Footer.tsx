import { APP_IMAGE_PATH } from "../environment/environment";
import Image from "./common/Image";

export function Footer() {
    return (
        <footer className="h-[120px] w-full flex justify-between items-end p-5 gap-5 bg-black">
            <p className="text-xs self-end font-bold cursor-default">Copyrights &copy; Pratik Ghare</p>
            <div >
                <Image className="rounded-none flex " url={APP_IMAGE_PATH + "tmdb.svg"} height={50} width={70}>
                    <a className="w-full h-full" href="https://www.themoviedb.org/" target="_blank" ></a>
                </Image>
                <p className="text-xxs mt-1 text-center text-teal-500">POWERED BY</p>
            </div>
        </footer>
    );
}