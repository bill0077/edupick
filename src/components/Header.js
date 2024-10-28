import { Link } from "react-router-dom";

export default function Header({ selected }) {
    return (
    <header class="border-b">
        <div class="flex justify-between mx-32 my-6">
            <Link to="/">
                <h1 class="font-['Tenada'] text-2xl font-bold text-stone-800">🧭 eduPick</h1>
            </Link>
            <div class="flex space-x-2">
                <Link to="/">
                    <p class={`${selected===0?'bg-sky-100 text-blue-600':'text-stone-600'} px-2 py-1 rounded-lg text-stone-600`}>홈</p>
                </Link>
                <Link to="/courses">
                    <p class={`${selected===1?'bg-sky-100 text-blue-600':'text-stone-600'} px-2 py-1 rounded-lg text-stone-600`}>최저가비교</p>
                </Link>
                <Link to="/course-comparison?query=">
                    <p class={`${selected===2?'bg-sky-100 text-blue-600':'text-stone-600'} px-2 py-1 rounded-lg`}>가격비교</p>
                </Link>
                <p class="px-2 py-1 rounded-lg text-stone-600">자격증요건</p>
                <p class="px-2 py-1 rounded-lg text-stone-600">학위요건</p>
                <p class="px-2 py-1 rounded-lg text-stone-600">편입요건</p>
                <p class="px-2 py-1 rounded-lg text-stone-600">학습설계</p>
            </div>
        </div>
    </header>
    );
}