"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import people1 from "./ast/people1.jpg"
import people2 from "./ast/people2.jpg"
import people3 from "./ast/people3.jpg"
import people4 from "./ast/people4.jpg"

const testimonials = [
  { id: 1, user: people3, name: "Oprah Winfrey", passion: "Media and Empowerment", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" },
  { id: 2, user: people1, name: "Elon Musk", passion: " CEO of SpaceX and Tesla", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" },
  { id: 4, user: people2, name: "Serena Williams", passion: " Tennis and Advocacy", text: "adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" },
  { id: 5, user: people3, name: "Oprah Winfrey", passion: "Media and Empowerment", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" },
  { id: 6, user: people4, name: "Steve Jobs", passion: "co-founder of Apple", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" },
  { id: 27, user: people2, name: "Serena Williams", passion: " Tennis and Advocacy", text: "adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" },
  { id: 8, user: people1, name: "Elon Musk", passion: " CEO of SpaceX and Tesla", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" },
  { id: 9, user: people2, name: "Serena Williams", passion: " Tennis and Advocacy", text: "adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" },
];
function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [])


  return (
    <div className="relative overflow-hidden w-[95%] mx-auto my-8">
      <h1 className='text-3xl font-bold my-4'>
        Testimonial</h1>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${(currentIndex * 50)}%)` }}
      >
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="flex-shrink-0 w-[48%] p-5 bg-gray-100 m-2 rounded-lg shadow-lg">
            <div className='relative h-28 w-28 mx-auto border-[5px] border-blue-600 rounded-full'>
              <Image src={testimonial.user} className='rounded-full' fill alt='user' />
            </div>
            <p>{testimonial.text}</p>
            <div className='flex justify-between my-5'>
              <h1>{testimonial.name}</h1>
              <h1>{testimonial.passion}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial