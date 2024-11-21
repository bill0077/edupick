import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import CoursePriceCard from "../components/CoursePriceCard";
import SearchBar from "../components/SearchBar";
import CategoryTab from '../components/CategoryTab';

import useSocketSender from '../Hooks/useSocketSender';
import useSocketReceiver from '../Hooks/useSocketReceiver';

export default function CourseListPage() {
    const requestCourseList = useSocketSender('query_course_metadata');
    const requestCoursePrice = useSocketSender('query_course_minprice');
    useEffect(() => {
        requestCourseList();
        requestCoursePrice({
            'index_start':0,
            'index_end':20,
            'query':{'':''}
        });
    },[]);
    
    const [courseList, setCourseList] = useState();
    useSocketReceiver('course_metadata_result', data => {
        setCourseList(data);
    });
    
    const [coursePriceList, setCoursePriceList] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);
    useSocketReceiver('course_minprice_result', data => {
        setCoursePriceList([...coursePriceList, ...data['query_result']]);
        setTotalCourses(data['total_count']);
    });
    
    const [tabNumber, setTabNumber] = useState(-1);
    const [queryName, setQueryName] = useState('');
    function handleTabNumber(data) {
        setCoursePriceList([])
        if (data===-1) {
            requestCoursePrice({
                'index_start':0,
                'index_end':20,
                'query':{'':''}
            });
        } else {
            requestCoursePrice({
                'index_start':0,
                'index_end':20,
                'query':{'category':courseList.categories[data]}
            });
        }
        setTabNumber(data);
        setQueryName('');
        setShownCourseNumber(20);
    } 
    
    function handleSubmit(data) {
        setCoursePriceList([]);
        setQueryName(data);
        setShownCourseNumber(20);
        if (tabNumber===-1) {
            requestCoursePrice({
                'index_start':0,
                'index_end':20,
                'query':{'name':data}
            });
        } else {
            requestCoursePrice({
                'index_start':0,
                'index_end':20,
                'query':{
                    'category':courseList.categories[tabNumber],
                    'name':data
                }
            });
        }
    }

    const [shownCourseNumber, setShownCourseNumber] = useState(20);
    const loadStepSize = 20;
    function handleMoreCoursesClick() {
        if (tabNumber===-1) {
            requestCoursePrice({
                'index_start':shownCourseNumber,
                'index_end':shownCourseNumber+loadStepSize,
                'query':{'name':queryName}
            });
        } else {
            requestCoursePrice({
                'index_start':shownCourseNumber,
                'index_end':shownCourseNumber+loadStepSize,
                'query':{
                    'category':courseList.categories[tabNumber],
                    'name':queryName
                }
            });
        }
        setShownCourseNumber(shownCourseNumber+loadStepSize);
    }

    const courses = coursePriceList ? 
    coursePriceList.map((course, i) =>
        <CoursePriceCard key={i} name={course[0]} price={course[1]} count={course[2]}/>
    )
    : <p>courses not loaded</p>

    const courseName = courseList ? (
        (queryName==='')
        ? (tabNumber===-1?"전체 과목":courseList.categories[tabNumber])
        : (tabNumber===-1?`"${queryName}"`:`${courseList.categories[tabNumber]} > "${queryName}"`)
    )
    : <p>courses not loaded</p>

    const moreCourseButton = shownCourseNumber < totalCourses ? (
        <form>
        <button onClick={handleMoreCoursesClick} type="button" class="text-sm sm:text-lg px-2 py-1 rounded-lg bg-slate-100 text-center">더보기</button>
        </form>
    )
    : <div />

    return (
        <div>
            <Header selected={1}/>
            <div class="sm:flex sm:p-8 m-2 sm:space-x-12">
                <div class="order-1 flex sm:justify-center sm:w-[8vw] sm:mx-8 my-4 sm:my-12">
                    <CategoryTab courseList={courseList} handleTabNumber={handleTabNumber}/>
                </div>
                <div class="order-2 sm:fixed sm:pl-[65vw] sm:my-12">
                    <SearchBar onSubmit={handleSubmit} />
                </div>
                <div class="order-3 flex flex-col pt-8 space-y-2">
                    <p class='text-2xl sm:text-4xl font-bold text-stone-800'>{courseName}</p>
                    <p class="text-sm text-stone-500">{totalCourses}개의 검색결과</p>
                    {courses}
                    {moreCourseButton}
                </div>
            </div>
        </div>
    );
}