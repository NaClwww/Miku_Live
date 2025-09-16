import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import LinkIcon from '@mui/icons-material/Link';
import { useTranslation } from 'react-i18next';

function Navi(){

    const { t,i18n } = useTranslation("navi"); // 获取 i18n 实例


    const closeDrawer = () => {
        const checkbox = document.getElementById('my-drawer');
        if (checkbox) {
            checkbox.checked = false;
        }
    };

    function genSubscribeLink() {
        const baseUrl = window.location.origin;
        let icsUrl = '';
        icsUrl = `${baseUrl}/ics/all-miku-lives.ics`;
        // 生成 webcal:// 链接用于日历订阅
        const webcalUrl = icsUrl.replace(/^https?:\/\//, 'webcal://');
        return { httpUrl: icsUrl, webcalUrl };
    }

    async function copyToClipboard(text) {
        try {
        // 首先尝试使用现代 Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
        } catch (err) {
        console.warn('Clipboard API 失败，尝试降级方案:', err);
        }
        // 降级方案：使用传统方法
        try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        // ... 设置样式避免闪烁
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            return true;
        }
        } catch (err) {
        alert("复制到剪贴板失败")
        }
        return false;
    }

    const handleGenerateLink = async () => {
        const { webcalUrl, httpUrl } = genSubscribeLink();

        // 尝试复制到剪贴板
        const copied = await copyToClipboard(httpUrl);
        if (copied) {
        alert("已成功复制到剪贴板！")
        } else {
        alert(httpUrl);
        }
    };

    return(
        <div className="drawer" style={{zIndex:50}}>
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
                        <Link to="/" onClick={closeDrawer} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            <HomeIcon className="w-5 h-5 flex-shrink-0 text-primary" />
                            <span className="font-medium">{t("First Page")}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/lives" onClick={closeDrawer} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            <EventAvailableIcon className="w-5 h-5 flex-shrink-0 text-secondary" />
                            <span className="font-medium">{t("Event Details")}</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleGenerateLink} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            <LinkIcon className="w-5 h-5 flex-shrink-0 text-accent" />
                            <span className="font-medium">{t("Generate Subscription Link")}</span>
                        </button>
                    </li>
                    <li>
                        <Link to="/music" onClick={closeDrawer} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            <LibraryMusicIcon className="w-5 h-5 flex-shrink-0 text-accent" />
                            <span className="font-medium">{t("Music Card")}</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => { closeDrawer(); window.location.href = "https://github.com/NaClwww/Miku_Live" }} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            <InfoOutlinedIcon className="w-5 h-5 flex-shrink-0 text-info" />
                            <span className="font-medium">{t("About")}</span>
                        </Link>
                    </li>
                     <li className="mt-auto"> {/* 使用 mt-auto 将其推到底部 */}
                        <div className="flex items-center gap-3 py-3 px-4 rounded-lg">
                            <span className="font-medium">{t("Language")}</span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => i18n.changeLanguage('zh')} 
                                    className="btn btn-sm btn-outline"
                                >
                                    中文
                                </button>
                                <button 
                                    onClick={() => i18n.changeLanguage('en')} 
                                    className="btn btn-sm btn-outline"
                                >
                                    English
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}






export default Navi;