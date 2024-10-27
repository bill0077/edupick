import React, { useRef, useState, useEffect } from 'react';

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
    //const courseList = useRef('');
    useSocketReceiver('course_info', data => {
        //courseList.current = data;
        setCourseList(data)
    });

    const [coursePriceList, setCoursePriceList] = useState();
    //const coursePriceList = useRef('');
    useSocketReceiver('minprice_result', data => {
        //coursePriceList.current = data;
        setCoursePriceList(data)
    });

    const categories = courseList ?
    courseList.categories.map((category, i) =>
        <p class="border-b-2" key={i}>{category}</p>
    )
    : <p>categories not loaded</p>
    
    const courses = coursePriceList ? 
    coursePriceList.map((course, i) =>
        <CoursePriceCard key={i} name={course[0]} price={course[1]} />
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
                <div class="flex flex-col space-y-2">
                    {courses}
                </div>
            </div>
        </div>
        </>
    );
}