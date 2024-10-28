import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import CoursePriceCard from "../components/CoursePriceCard";
import SearchBar from "../components/SearchBar";

import useSocketSender from '../Hooks/useSocketSender';
import useSocketReceiver from '../Hooks/useSocketReceiver';

export default function CourseListPage() {
    const requestCourseList = useSocketSender('query_course_info');
    const requestCoursePrice = useSocketSender('query_course_minprice');
    useEffect(() => {
        requestCourseList();
        requestCoursePrice({'':''});
    },[]);
    
    function handleSubmit(data) {
        requestCoursePrice({'name':data});
    }
    
    const [courseList, setCourseList] = useState();
    useSocketReceiver('course_info', data => {
        setCourseList(data)
    });

    const [coursePriceList, setCoursePriceList] = useState();
    useSocketReceiver('minprice_result', data => {
        setCoursePriceList(data)
    });

    const categories = courseList ?
    courseList.categories.map((category, i) =>
        <p onClick={(e)=>{
        e.stopPropagation()
        requestCoursePrice({'category':category})}} 
        class="text-xl text-stone-800" key={i}>{category}</p>
    )
    : <p>categories not loaded</p>
    
    const courses = coursePriceList ? 
    coursePriceList.map((course, i) =>
        <CoursePriceCard key={i} name={course[0]} price={course[1]} count={course[2]}/>
    )
    : <p>courses not loaded</p>

    return (
        <div>
            <Header selected={1}/>
            <div class="flex p-8 space-x-12">
                <div class="w-[10vw] m-4">
                    <ol class="fixed space-y-2">
                        <p onClick={(e)=>{
                        e.stopPropagation()
                        requestCoursePrice({'':''})}} 
                        class="text-xl font-bold text-stone-800">전체 과목</p>
                        {categories}
                    </ol>
                </div>
                <div class="space-y-2">
                    <p class="text-stone-500">{courses.length}개의 검색결과</p>
                    <div class="flex flex-col space-y-2">                    
                        {courses}
                    </div>
                </div>
                <div class="fixed pl-[60vw] pt-[5vh]">
                    <SearchBar onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
}