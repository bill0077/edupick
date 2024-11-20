import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import CourseDetailCard from "../components/CourseDetailCard";
import SearchBar from '../components/SearchBar';
import CategoryTab from '../components/CategoryTab';

import { useSearchParams } from 'react-router-dom';
import useSocketSender from '../Hooks/useSocketSender';
import useSocketReceiver from '../Hooks/useSocketReceiver';

export default function CoursePriceComparisonPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query'));
    const requestCourseList = useSocketSender('query_course_info');
    const requestCoursePrice = useSocketSender('query_course_list');
    useEffect(() => {
        requestCourseList();
        requestCoursePrice({'name':query});
    },[]);

    const [courseList, setCourseList] = useState();
    useSocketReceiver('course_info', data => {
        setCourseList(data)
    });
    
    const [coursePriceList, setCoursePriceList] = useState();
    useSocketReceiver('course_list_result', data => {
        setCoursePriceList(data)
    });

    const [tabNumber, setTabNumber] = useState(-1);
    function handleTabNumber(data) {
        setTabNumber(data);
        setQuery('')
        if (query==='') {
            if (data===-1) {
                requestCoursePrice({'':''});
            } else {
                requestCoursePrice({'category':courseList.categories[data]});
            }
        } else {
            if (data===-1) {
                requestCoursePrice({'':'','name':query});
            } else {
                requestCoursePrice({'category':courseList.categories[data],'name':query});
            }
        }
    }
    
    function handleSubmit(data) {
        setQuery(data);
        setSearchParams({'query':data});
        if (tabNumber===-1) {
            requestCoursePrice({'name':data});
        } else {
            requestCoursePrice({'category':courseList.categories[tabNumber],'name':data});
        }
    }
    
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

    const courseName = courseList ? (
        (query==='')
        ? (tabNumber===-1?"전체 과목":courseList.categories[tabNumber])
        : (tabNumber===-1?`"${query}"`:`${courseList.categories[tabNumber]} > "${query}"`)
    )
    : <p>courses not loaded</p>


    return (
        <div>
            <Header selected={2}/>
            <div class="sm:flex m-1 sm:p-8 sm:space-x-12">
                <div class="order-1 sm:w-[8vw] sm:mx-8 my-4 sm:m-12">
                    <CategoryTab courseList={courseList} handleTabNumber={handleTabNumber}/>
                </div>
                <div class="order-2 sm:fixed sm:pl-[65vw] sm:my-12">
                    <SearchBar onSubmit={handleSubmit} />
                </div>
                <div class="order-3 pt-8 space-y-2 sm:space-y-4">
                    <p class='text-2xl sm:text-4xl font-bold text-stone-800'>{courseName}</p>
                    <p class="text-sm text-stone-500">{courses.length}개의 검색결과</p>
                    {courses}
                </div>
            </div>
        </div>
    );
}