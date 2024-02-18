import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-3'>
        <div className="logo">
            <span className='font-bold text-xl text-white mx-9' >TaskManager</span>
        </div>
        <ul className="flex gap-10 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>my todos</li>

        </ul>
    </nav>
  )
}

export default Navbar