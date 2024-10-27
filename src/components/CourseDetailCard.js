export default function CourseDetailCard(props) {
    return (
        <div class="h-[15vh] border-2 flex justify-center items-center space-x-4 space-y-2">
            <div class="w-[20vw] mr-4 justify-between">
                <div class="flex">
                    <div class="h-[10vh] mx-2 flex items-center bg-slate-100">
                        <h3>{props.category}</h3>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">{props.name}</h3>
                        <p class="text-2xl">{props.price}</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-end">
                <p class="mx-2">{props.date}</p>
                <a class="mx-2" href={props.link}>{props.link}</a>
            </div>
        </div>
    );
}