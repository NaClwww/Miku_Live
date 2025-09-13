import { Link } from "react-router-dom";

function Navi(){
    return(
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">

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
                    <Link to="/lives">Lives</Link>
                </li>
                </ul>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    )
}
export default Navi;