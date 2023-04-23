import React from 'react'
import Slider from "react-slick";
import { productListe } from '../Data/Product';
import { useState } from 'react';
import { useEffect } from 'react';
export default function ProductSlider() {
    const productList = productListe;
    const [settings,setSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay:true
      })

      const handleResize = () => {
        if(window.innerWidth > 1200){
            
          let sets = {...settings,slidesToShow:4}
          setSettings(sets);
        }
        if(window.innerWidth < 1200 && window.innerWidth > 1000){
          let sets = {...settings,slidesToShow:3}
          setSettings(sets);
        }
        if(window.innerWidth < 1000 && window.innerWidth > 700){
            let sets = {...settings,slidesToShow:2}
            setSettings(sets);
          }
        
        if (window.innerWidth < 700) {
            
      
          let sets = {...settings,slidesToShow:1}
          setSettings(sets);
      } 
      }
      
      // create an event listener
      useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize)
      },[])
  return (
    <div className='sliderCont'>
        <h2 className='brand sliderTitle'>TRENDS</h2>
        <Slider className='productSlider' {...settings}>
          {productList.map((product)=>(
            <div className='productSlide' key={product.productId}>
                <div className="imgCont">
              <img className="productImg" src={`${product.imgUrl}`} />
            </div>
            </div>
          ))}
        </Slider>
      </div>
  )
}
