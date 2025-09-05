import React, { useState } from "react";

function Details() {
  const tabs = [
    { title: "选项卡一", content: "内容一" },
    { title: "选项卡二", content: "内容二" },
    { title: "选项卡三", content: "内容三" },
  ];
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
      <div className="bg-gray-100 h-screen flex items-star border-2">
        <div className="flex w-full px-8 gap-8 h-3/4 mt-8">
          <div className="bg-white rounded-xl shadow-md w-[75%] flex items-center justify-center ">
            1
          </div>
          <div className="bg-white rounded-xl shadow-md w-[25%] flex items-center justify-center ">
            2
          </div>
        </div>
        {/* 横向选项卡放在最底下 */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t">
          <div className="flex justify-center">
            {tabs.map((tab, idx) => (
              <button
                key={tab.title}
                className={`px-6 py-2 focus:outline-none ${
                  active === idx
                    ? "border-b-2 border-blue-500 text-blue-600 font-bold"
                    : "text-gray-500"
                }`}
                onClick={() => setActive(idx)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="text-center py-4">{tabs[active].content}</div>
        </div>
      </div>
    </div>
  );
}

export default Details;