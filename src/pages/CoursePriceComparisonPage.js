import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import CourseDetailCard from "../components/CourseDetailCard";
import SearchBar from '../components/SearchBar';

import { useSearchParams } from 'react-router-dom';
import useSocketSender from '../Hooks/useSocketSender';
import useSocketReceiver from '../Hooks/useSocketReceiver';

export default function CoursePriceComparisonPage() {
    const requestCourseList = useSocketSender('query_course_info');
    const requestCoursePrice = useSocketSender('query_course_list');
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query'));

    function handleSubmit(data) {
        setQuery(data);
    }
    
    useEffect(() => {
        requestCourseList();
        requestCoursePrice({'name':query});
    },[query]);
    
    const [coursePriceList, setCoursePriceList] = useState();
    useSocketReceiver('course_list_result', data => {
        setCoursePriceList(data)
    });
    
    const courses = coursePriceList ? 
    coursePriceList.map((course, i) =>
        <CourseDetailCard 
        key={i} 
        name={course[1]} 
        category={course[5]} 
        price={course[4]} 
        semester_date={`${course[2][0]}~${course[2][1]}`} 
        register_date={`${course[3][0]}~${course[3][1]}`} 
        link={course[0]}/>
    )
    : <p>courses not loaded</p>

    return (
        <div>
            <Header selected={2}/>
            <div class="flex p-8 space-x-12">
                <div class="pl-32 pt-8 space-y-4">
                    <p class='text-4xl font-bold text-stone-800'>{query==='' ? '전체 과목' : `"${query}"`}</p>
                    <p class="text-stone-500">{courses.length}개의 검색결과</p>
                    {courses}
                </div>
                <div class="fixed pl-[60vw] pt-[5vh]">
                    <SearchBar onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
}