import { useSearchParams } from 'react-router-dom';
import Header from "../components/Header";

export default function NotReady() {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedTab = searchParams.get('tab');

    return (
        <div>
            <Header selected={selectedTab} />
            <div class="flex flex-col mx-2 sm:mx-24 my-16 space-y-4">
                <p class="text-xl sm:text-4xl text-blue-400">해당 기능은 아직 준비중입니다.</p>
                <div>
                    <p class="text-sm sm:text-xl text-stone-600">해당 기능은 빠른 시일 내에 업데이트 될 예정입니다.</p>
                    <p class="text-sm sm:text-xl text-stone-600">저희 사이트를 이용해주셔서 감사합니다.</p>
                </div>
            </div>
        </div>
    );
}