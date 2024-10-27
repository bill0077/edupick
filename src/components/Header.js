import { Link } from "react-router-dom";

export default function Header() {
    return (
    <header>
        <div class="flex justify-between">
            <Link to="/">
                <h1 class="text-lg font-bold">에듀픽</h1>
            </Link>
            <p class="text-lg">평생교육을 위한 쉬운 선택, 에듀픽</p>
            <div class="flex space-x-4">
                <p>로그인</p>
                <p>회원가입</p>
            </div>
        </div>
    </header>
    );
}