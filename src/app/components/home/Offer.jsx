import React from 'react'
import Layout from '../Layout'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { RiGuideLine } from "react-icons/ri";
import { ImCheckboxUnchecked } from "react-icons/im";

const cards = [
    { _id: 1, title: "Calculate Weather", text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", icon: <TiWeatherPartlySunny /> },
    { _id: 2, title: "Best Tour Guide", text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", icon: <RiGuideLine /> },
    { _id: 3, title: "Customization", text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", icon: <ImCheckboxUnchecked /> }
]

function Offer() {
    return (
        <Layout>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div>
                    <h1 className='font-normal text-xl italic'>what we serve</h1>
                    <h1 className='text-3xl font-medium my-1'>We are offer our best service</h1>
                </div>
                {cards.map(card => {
                    return <div key={card._id} className='bg-white p-4 rounded-md border-b-2 border-orange-200 border-r-2'>
                        <span className='bg-orange-500 inline-block p-2 rounded-full text-white'>{card.icon}</span>
                        <h1 className='text-xl font-medium '>{card.title}</h1>
                        <p className='text-gray-600'>{card.text}</p>
                    </div>
                })}
            </div>
        </Layout>
    )
}

export default Offer