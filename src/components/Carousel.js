import React from "react";
import Slider from "react-slick";

export default function Carousel() {
  var settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div>
      <link
      rel="stylesheet"
      type="text/css"
      charset="UTF-8"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <div class="w-[45vw]">
        <Slider {...settings}>
          <div>
            <p class="text-center text-4xl">마감 임박 강의 보러가기</p>
            <p class="text-center">10.10~11.10</p>
          </div>
          <div>
            <p class="text-center text-4xl">CPA 인정 과목 변경사항</p>
            <p class="text-center text-2xl">2024년 기준</p>
          </div>
          <div>
            <p class="text-center text-4xl">ABC에듀 연계행사 안내</p>
          </div>
        </Slider>
      </div>
    </div>
  );
}