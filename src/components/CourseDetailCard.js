export default function CourseDetailCard(props) {
    return (
        <div class='w-[45vw] border-2 rounded-xl p-8 space-y-2'>
            <div>
                <a class="text-xl text-sky-600" href={props.link}>{props.link}</a>
            </div>
            <div>
                <p class="text-md text-stone-800 font-bold">{props.category}</p>
                <p class="text-2xl font-bold">{props.name}</p>
            </div>
            <p class="text-xl font-bold text-blue-700">{props.price}원</p>
            <div>
                <p class="text-stone-600">수강신청기간: {props.register_date}</p>
                <p class="text-stone-600">수강기간: {props.semester_date}</p>
            </div>
        </div>
    );
}