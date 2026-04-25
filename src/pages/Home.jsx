import React from 'react'
import HomeSection from '../Components/home/HomeSection'
import FeaturedRestaurant from '../Components/home/FeaturedRestaurant'
import MenuItems from '../Components/home/MenuItem'
import CtaSection from '../Components/home/CtaSection'

const Home = () => {
  return (
    <>
    <HomeSection/>
    <FeaturedRestaurant/>
    <CtaSection/>
    <MenuItems/>
    </>
  )
}

export default Home