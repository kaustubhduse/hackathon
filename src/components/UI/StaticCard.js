import React from 'react'

function StaticCard(props) {
  return (
    <div className='static-card lg:w-[80%] text-left bg-[rgba(248,249,253,1)] rounded-xl space-y-4 justify-center p-6'>
       <img src={props.img} alt={props.alt} className="" />
       <h1 className='font-bold text-2xl'>{props.title}</h1>
       <p className='text-[rgba(100,96,125,1)]'>{props.description}</p>
    </div>
  )
}

export default StaticCard