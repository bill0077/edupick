import { useNavigate } from 'react-router-dom';

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
        <div class="flex flex-col items-center space-y-6 sm:m-16">
            <LandingSection />
            <SearchBar onSubmit={handleSubmit}/>
        </div>
    </div>
    );
}