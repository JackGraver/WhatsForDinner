import Link from "next/link";

export default function NavBar() {
    return (
        <div className="group flex flex-col bg-gray-800 text-white h-screen w-4 fixed left-0 top-0 shadow-lg transition-all duration-300 ease-in-out hover:w-24">
            <nav className="flex flex-col mt-4">
                <Link
                    href="/"
                    className="flex items-center px-4 py-3 hover:bg-gray-700 transition-all duration-700 group-hover:duration-50 ease-in-out"
                >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:duration-50 ease-in-out">
                        Home
                    </span>
                </Link>
                <Link
                    href="/new"
                    className="flex items-center px-4 py-3 hover:bg-gray-700 transition-all duration-700 group-hover:duration-50 ease-in-out"
                >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:duration-50 ease-in-out">
                        New
                    </span>
                </Link>
                <Link
                    href="/modify"
                    className="flex items-center px-4 py-3 hover:bg-gray-700 transition-all duration-700 group-hover:duration-50 ease-in-out"
                >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:duration-50 ease-in-out">
                        Modify
                    </span>
                </Link>
            </nav>
        </div>

    );
}