import { Link } from "react-router-dom";

import Carousel from '../components/Carousel.js';
import NavCourseInformation from '../components/NavCourseInformation.js';
import NavPriceComparison from "../components/NavPriceComparison.js";
import LandingSection from '../components/LandingSection.js';
import SearchBar from '../components/SearchBar.js';
import Header from "../components/Header.js";

export default function Home() {
    return (
        <div>
            <Header />
            <div class="h-[10vh]"/>
            <div class="flex space-x-24 justify-center items-center">
                <div class="flex flex-col items-start space-y-8">
                    <LandingSection />
                    <SearchBar class="w-[25vw] border-4 rounded-lg"/>
                </div>
            <div>
                <div>
                    <Link to="/courses">
                        <NavPriceComparison title="가격비교" text="한번에 모든 과목들의 가격을 비교해보세요"/>
                    </Link>
                </div>
                <div class="mt-4"/>
                <div class="flex w-fit space-x-2">
                    <Link to="/courses">
                        <NavCourseInformation title="자격증요건" text="회계사, 변리사, 보보건사, 장애복지사 등의 자격증을 취득하기 위한 수업들입니다"/>
                    </Link>
                    <Link to="/courses">
                        <NavCourseInformation title="학위요건" text="컴퓨터공공학, 경제학과, 국문학과학위를 온라인으로 취득해보세요"/>
                    </Link>
                    <Link to="/courses">
                        <NavCourseInformation title="편입요건" text="인서울부터 지거국까지 다양한 학교의 편입조건을 한눈에 확인해보세요"/>
                    </Link>
                </div>
                <div class="mt-6"/>
                <div class="w-full flex justify-center">
                    <Carousel />
                </div>
                </div>
            </div>
        </div>
    );
}