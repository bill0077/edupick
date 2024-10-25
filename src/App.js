import logo from './logo.svg';
import './App.css';

import Header from './components/Header.js';
import Carousel from './components/Carousel.js';
import TabTemplate from './components/TabTemplate.js';
import Introduction from './components/Introduction.js';
import SearchBar from './components/SearchBar.js';

function App() {
  return (
    <div>
      <Header />
      <div class="h-[10vh]"/>
      <div class="flex space-x-24 justify-center items-center">
        <div class="flex flex-col items-start space-y-8">
          <Introduction />
          <SearchBar class="w-[25vw] border-4 rounded-lg"/>
        </div>
        <div>
          <div class="flex w-fit space-x-2">
            <TabTemplate title="자격증요건" text="회계사, 변리사, 보보건사, 장애복지사 등의 자격증을 취득하기 위한 수업들입니다"/>
            <TabTemplate title="학위요건" text="컴퓨터공공학, 경제학과, 국문학과학위를 온라인으로 취득해보세요"/>
            <TabTemplate title="편입요건" text="인서울부터 지거국까지 다양한 학교의 편입조건을 한눈에 확인해보세요"/>
          </div>
          <div class="mt-6"/>
          <div class="w-full flex justify-center">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
