import { Link } from "react-router-dom";

export default function CoursePriceCard(props) {
    return (
        <Link to={`/course-comparison?query=${props.name}`}>
            <div class="h-[15vh] sm:w-[45vw] border-2 rounded-lg sm:rounded-xl flex items-center justify-between p-4 sm:p-8">
                <div>
                    <p class="text-md sm:text-xl font-bold">{props.name}</p>
                    <p class="text-xs sm:text-sm text-stone-500">수강 가능한 사이트 {props.count}개</p>
                </div>
                <p class="text-md sm:text-xl font-bold text-blue-700">최저가 {props.price}원</p>
            </div>
        </Link>
    );
}