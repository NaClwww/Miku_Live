import { Link } from "react-router-dom";

function Navi(){
    return(
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                {/* <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div> */}
                {/* <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a>Item 1</a></li>
                    <li>
                    <a>Parent</a>
                    <ul class="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                    </li>
                    <li><a>Item 3</a></li>
                </ul> */}
                </div>
                <a className="text-xl">Live Show</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><Link to="/">First Page</Link></li>
                {/* <li>
                    <details>
                    <summary>Parent</summary>
                    <ul class="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                    </details>
                </li> */}
                <li>
                    <Link to="/details">Details</Link>
                </li>
                <li>
                    <Link to="/flowButton">Float Button</Link>
                </li>
                </ul>
            </div>
            <div className="navbar-end">
                {/* <a className="btn">Button</a> */}
            </div>
        </div>
    )
}
export default Navi;