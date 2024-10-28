import { Link } from "react-router-dom";

export default function CoursePriceCard(props) {
    return (
        <Link to={`/course-comparison?query=${props.name}`}>
            <div class="h-[15vh] w-[40vw] border-2 rounded-xl flex items-center justify-between p-8">
                <div>
                    <p class="text-xl font-bold">{props.name}</p>
                    <p class="text-sm text-stone-500">수강 가능한 사이트 {props.count}개</p>
                </div>
                <p class="text-xl font-bold text-blue-700">최저가 {props.price}</p>
            </div>
        </Link>
    );
}