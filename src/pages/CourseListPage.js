import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import CoursePriceCard from "../components/CoursePriceCard";
import SearchBar from "../components/SearchBar";
import CategoryTab from '../components/CategoryTab';

import useSocketSender from '../Hooks/useSocketSender';
import useSocketReceiver from '../Hooks/useSocketReceiver';

export default function CourseListPage() {
    const requestCourseList = useSocketSender('query_course_info');
    const requestCoursePrice = useSocketSender('query_course_minprice');
    useEffect(() => {
        requestCourseList();
        requestCoursePrice({'':''});
    },[]);
    
    const [courseList, setCourseList] = useState();
    useSocketReceiver('course_info', data => {
        setCourseList(data)
    });
    
    const [coursePriceList, setCoursePriceList] = useState();
    useSocketReceiver('minprice_result', data => {
        setCoursePriceList(data)
    });
    
    const [tabNumber, setTabNumber] = useState(-1);
    const [query, setQuery] = useState('');
    function handleTabNumber(data) {
        if (data===-1) {
            requestCoursePrice({'':''});
        } else {
            requestCoursePrice({'category':courseList.categories[data]});
        }
        setTabNumber(data);
        setQuery('');
    } 
    
    function handleSubmit(data) {
        setQuery(data);
        if (tabNumber===-1) {
            requestCoursePrice({'name':data});
        } else {
            requestCoursePrice({'category':courseList.categories[tabNumber],'name':data});
        }
    }

    const courses = coursePriceList ? 
    coursePriceList.map((course, i) =>
        <CoursePriceCard key={i} name={course[0]} price={course[1]} count={course[2]}/>
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
            <Header selected={1}/>
            <div class="flex p-8 space-x-12">
                <div class="w-[8vw] mx-8 my-12">
                    <CategoryTab courseList={courseList} handleTabNumber={handleTabNumber}/>
                </div>
                <div class="pt-8 space-y-2">
                    <p class='text-4xl font-bold text-stone-800'>{courseName}</p>
                    <p class="text-stone-500">{courses.length}개의 검색결과</p>
                    <div class="flex flex-col space-y-2">                    
                        {courses}
                    </div>
                </div>
                <div class="fixed pl-[65vw] my-12">
                    <SearchBar onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
}