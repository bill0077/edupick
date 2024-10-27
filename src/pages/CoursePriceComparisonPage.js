import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import CourseDetailCard from "../components/CourseDetailCard";
import SearchBar from "../components/SearchBar";

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
    
    const [courseList, setCourseList] = useState();
    useSocketReceiver('course_info', data => {
        setCourseList(data)
    });

    const [coursePriceList, setCoursePriceList] = useState();
    useSocketReceiver('course_list_result', data => {
        setCoursePriceList(data)
    });

    const categories = courseList ?
    courseList.categories.map((category, i) =>
        <p class="border-b-2" key={i}>{category}</p>
    )
    : <p>categories not loaded</p>
    
    const courses = coursePriceList ? 
    coursePriceList.map((course, i) =>
        <CourseDetailCard key={i} name={course[1]} category={course[5]} price={course[4]} date={`${course[3][0]}~${course[3][1]}`} link={course[0]}/>
    )
    : <p>courses not loaded</p>

    return (
        <>
            <Header />
            <div class="flex">
                <div class="w-[15vw] m-4">
                    <ol class="text-xl">
                        {categories}
                    </ol>
                </div>
                <div class="space-y-12">
                    <SearchBar onSubmit={handleSubmit} class="w-[25vw] border-4 rounded-lg"/>
                    <div class="space-y-2">
                        {courses}
                    </div>
                </div>
            </div>
        </>
    );
}