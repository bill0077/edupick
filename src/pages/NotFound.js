import Header from "../components/Header";

export default function NotFound() {
    return (
        <div>
            <Header />
            <div class="flex flex-col mx-24 my-16 space-y-4">
                <p class="text-4xl text-blue-400">해당 페이지를 찾을 수 없습니다.</p>
            </div>
        </div>
    );
}