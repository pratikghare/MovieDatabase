import Recents from "./Recents";

export default function Footer(){
    return (
        <footer className="footer cursor-default">
            <Recents />

            <div className="flex justify-center items-center mt-5">
                <button className="bg-app text-xs px-3 py-1 rounded-sm">Sign in for more access</button>
            </div>

            <div className="flex justify-center w-full items-center text-white mt-3 text-xs">
                &copy; Copyrights. Pratik Ghare - 2024
            </div>
        </footer>
    );
}