import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/MainCarousel.css";

function MainCarousel() {
  return (
    <div className="carousel">
      <Carousel
        className="banner__image"
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        {/* Carousel images */}
        <div>
          <img
            loading="lazy"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_TallHero_Gamers_en_US_1x._CB667161802_.jpg"
            alt=""
          />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/gi1" alt="" />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/6ff" alt="" />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Launches/Devices/May21/Fuji_TallHero_EchoDot_v3_en_US_1x._CB669835965_.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2021/FathersDay/Fuji_TallHero_FD21_en_US_1x._CB667980417_.jpg"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
}

export default MainCarousel;
