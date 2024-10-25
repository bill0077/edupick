export default function TabTemplate(props) {
    return (
    <div class="w-[15vw] h-[40vh] flex flex-col justify-items-center items-center border-2 rounded-xl space-y-6" >
        <h3 class="text-2xl font-bold p-6">{props.title}</h3>
        <p class="m-4">{props.text}</p>
    </div>
    );
}