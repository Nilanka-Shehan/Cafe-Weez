import React from 'react'
import Banner from './Banner'
import BlogBar from './BlogBar'
import PopularMenu from './PopularMenu'
import ReviewBar from './ReviewBar'
import Service from './Service'
import TableBooking from './TableBooking'

const Home = () => {
  return (
    <div>
      <Banner/>
      <PopularMenu/>
      <Service/>
      <TableBooking/>
      <ReviewBar/>
      <BlogBar/>
    </div>
  )
}

export default Home