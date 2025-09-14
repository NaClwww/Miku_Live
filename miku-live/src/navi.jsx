import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIcon from '@mui/icons-material/Menu';

function Navi(){
    return(
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button">
                    <MenuIcon className="w-6 h-6" />
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <li>
                        <Link to="/" className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            <HomeIcon className="w-5 h-5 flex-shrink-0 text-primary" />
                            <span className="font-medium">首页</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/lives" className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            <EventAvailableIcon className="w-5 h-5 flex-shrink-0 text-secondary" />
                            <span className="font-medium">演唱会信息</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/music" className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            <LibraryMusicIcon className="w-5 h-5 flex-shrink-0 text-accent" />
                            <span className="font-medium">音乐卡片</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => { window.location.href = "https://github.com/NaClwww/Miku_Live" }} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            <InfoOutlinedIcon className="w-5 h-5 flex-shrink-0 text-info" />
                            <span className="font-medium">关于项目</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navi;