import React from 'react'
import Navi from '../navi'

function Index() {

  return (
      <div className='bg-gray-100 min-h-screen'>
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center h-full max-w-md">
            <h1 className="text-5xl font-bold text-gray-800">Hello there</h1>
            <p className="py-6 text-gray-800">向下滚动查看更多内容</p>
          </div>
        </div>
      </div>
  )
}

export default Index