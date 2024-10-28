import { useNavigate } from 'react-router-dom';

import Carousel from '../components/Carousel.js';
import LandingSection from '../components/LandingSection.js';
import Header from "../components/Header.js";

import SearchBar from '../components/SearchBar.js';

export default function Home() {
    const navigate = useNavigate();
    
    function handleSubmit(data) {
        navigate(`/course-comparison?query=${data}`);
    }

    return (
    <div>
        <Header selected={0}/>
        <div class="flex flex-col items-center m-16 space-y-6">
            <LandingSection />
            <SearchBar onSubmit={handleSubmit}/>
        </div>
    </div>
    );
}