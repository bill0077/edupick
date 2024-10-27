import logoImg from "../images/logo.png";

export default function LandingSection() {
    return (
        <div class="flex flex-col items-end space-y-2">
            {/*<h1 class="text-7xl font-bold">eduPick</h1>*/}
            <div class="w-[20vw]">
                <img src={logoImg} alt="eduPick logo"/>
            </div>
            <p class="text-xl">전국의 모든 학점은행 간단히 확인하자</p>
        </div>
    );
}