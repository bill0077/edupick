import logo from "../images/logo.jpg";

export default function LandingSection() {
    return (
        <div class="flex flex-col items-center space-y-2">
            <div class="invisible sm:visible flex items-center sm:space-x-2">
                <img class="w-0 sm:w-16" src={logo} alt="logo" />
                <p class="font-['Tenada'] text-6xl">eduPick</p>
            </div>
            <p class="text-sm sm:text-2xl">전국의 모든 과목을 한번에 비교해보세요</p>
        </div>
    );
}