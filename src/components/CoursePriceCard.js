import { Link } from "react-router-dom";

export default function CoursePriceCard(props) {
    return (
        <Link to={`/course-comparison?query=${props.name}`}>
            <div class='h-[10vh] w-[30vw] border-4 flex items-center justify-between p-4'>
                <p class='text-2xl'>{props.name}</p>
                <p class='text-xl'>최저가 {props.price}</p>
            </div>
        </Link>
    );
}