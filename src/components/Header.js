import { Link } from "react-router-dom";

import logo from "../images/logo.jpg";

export default function Header({ selected }) {
    return (
    <header class="sm:border-b">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:mx-4 sm:my-6">
            <Link class="flex space-x-1 p-1" to="/">
                <img class="w-4 h-4 sm:w-8 sm:h-8" src={logo} alt="logo" />
                <h1 class="font-['Tenada'] text-sm sm:text-2xl font-bold text-stone-800">eduPick</h1>
            </Link>
            <div class="flex justify-center sm:space-x-2">
                <Link to="/">
                    <p class={`${selected===0?'bg-sky-100 text-blue-600':'text-stone-600'} px-2 py-1 rounded-lg text-xs sm:text-base`}>홈</p>
                </Link>
                <Link to="/courses">
                    <p class={`${selected===1?'bg-sky-100 text-blue-600':'text-stone-600'} px-2 py-1 rounded-lg text-xs sm:text-base`}>최저가비교</p>
                </Link>
                <Link to="/course-comparison?query=">
                    <p class={`${selected===2?'bg-sky-100 text-blue-600':'text-stone-600'} px-2 py-1 rounded-lg text-xs sm:text-base`}>가격비교</p>
                </Link>
                <Link to="/not-ready?tab=3">
                    <p class={`${selected==='3'?'bg-sky-100 text-blue-600':'text-stone-600'} px-2 py-1 rounded-lg text-xs sm:text-base`}>자격증요건</p>                    
                </Link>
                {/*<Link to="/not-ready?tab=4">
                    <p class={`${selected==='4'?'bg-sky-100 text-blue-600':'text-stone-600'} px-2 py-1 rounded-lg text-xs sm:text-base`}>학위요건</p>
                </Link>
                <Link to="/not-ready?tab=5">
                    <p class={`${selected==='5'?'bg-sky-100 text-blue-600':'text-stone-600'} px-2 py-1 rounded-lg text-xs sm:text-base`}>편입요건</p>
                </Link>*/}
                <Link to="/not-ready?tab=6">
                    <p class={`${selected==='6'?'bg-sky-100 text-blue-600':'text-stone-600'} px-2 py-1 rounded-lg text-xs sm:text-base`}>학습설계</p>
                </Link>
            </div>
        </div>
    </header>
    );
}