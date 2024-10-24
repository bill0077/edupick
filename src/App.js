import logo from './logo.svg';
import './App.css';

import Header from './components/Header.js';
import Carousel from './components/Carousel.js';
import TabTemplate from './components/TabTemplate.js';
import Introduction from './components/Introduction.js';
import SearchBar from './components/SearchBar.js';

function App() {
  return (
    <div class="flex justify-center items-center"className="App">
      <Header />
      <div class="mt-16"/>
      <div class="flex space-x-24 justify-center items-center">
        <div class="flex flex-col items-start space-y-12">
          <Introduction />
          <SearchBar />
        </div>
        <div class="flex flex-col items-center">
          <div class="flex space-x-2">
            <TabTemplate title="자격증요건" text="회계사, 변리사, 보보건사, 장애복지사 등의 자격증을 취득하기 위한 수업들입니다"/>
            <TabTemplate class="w-36 h-52" /*bg-blue-400"*/ title="학위요건" text="컴퓨터공공학, 경제학과, 국문학과학위를 온라인으로 취득해보세요"/>
            <TabTemplate class="w-36 h-52" /*bg-green-400"*/ title="편입요건" text="인서울부터 지거국까지 다양한 학교의 편입조건을 한눈에 확인해보세요"/>
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
