import miku from './show.jpg';
import Music from './MusicId.txt';
import Navi from './../navi.jsx'

function Gift() {
  return (
      <div 
        className="fixed inset-0 bg-center bg-no-repeat flex items-center justify-center overflow-hidden bg-black"
        style={{
          backgroundImage: `url(${miku})`,
          backgroundSize: 'auto 100vh',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute top-0 left-0 right-0 z-30">
          <Navi />
        </div>
        {/* 按钮容器 */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
          <button 
            className="bg-white backdrop-blur-sm text-gray-800 px-5 py-2.5 rounded-lg font-medium
                      transition-all duration-300 hover:bg-white-90 hover:-translate-y-1 hover:shadow-lg
                      focus:outline-none focus:ring-2 focus:ring-white-50"
            onClick={Jump}
          >
            随机音乐
          </button>
          {/* <button 
            className="bg-white backdrop-blur-sm text-gray-800 px-5 py-2.5 rounded-lg font-medium
                      transition-all duration-300 hover:bg-white-90 hover:-translate-y-1 hover:shadow-lg
                      focus:outline-none focus:ring-2 focus:ring-white-50"
            onClick={() => { window.location.href = "https://github.com/NaClwww/Miku_Music_Card" }}
          >
            关于项目
          </button> */}
        </div>
      </div>
  );
}

async function Jump() {
  const response = await fetch(Music);
  const text = await response.text();
  const lines = text.split('\n');
  const id = lines[Math.floor(Math.random() * lines.length)];
  const weburl = `https://y.music.163.com/m/song?id=${id}`;
  return window.location.href = weburl;
}

export default Gift;