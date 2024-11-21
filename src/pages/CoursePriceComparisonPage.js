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
    const [queryName, setQueryName] = useState(searchParams.get('query'));
    const requestCourseList = useSocketSender('query_course_metadata');
    const requestCoursePrice = useSocketSender('query_course_detail');
    useEffect(() => {
        requestCourseList();
        requestCoursePrice({
            'index_start':0,
            'index_end':20,
            'query':{'name':queryName}
        });
    },[]);

    const [courseList, setCourseList] = useState();
    useSocketReceiver('course_metadata_result', data => {
        setCourseList(data);
    });
    
    const [coursePriceList, setCoursePriceList] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);
    useSocketReceiver('course_detail_result', data => {
        setCoursePriceList([...coursePriceList, ...data['query_result']])
        setTotalCourses(data['total_count'])
    });

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

    const [tabNumber, setTabNumber] = useState(-1);
    function handleTabNumber(data) {
        setTabNumber(data);
        setQueryName('');
        setCoursePriceList([]);
        if (queryName==='') {
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
        } else {
            if (data===-1) {
                requestCoursePrice({'':'','name':queryName});
            } else {
                requestCoursePrice({
                    'index_start':0,
                    'index_end':20,
                    'query':{
                        'category':courseList.categories[data],
                        'name':queryName
                    }
                });
            }
        }
        setShownCourseNumber(20);
    }
    
    function handleSubmit(data) {
        setQueryName(data);
        setSearchParams({'query':data});
        setCoursePriceList([]);
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
        setShownCourseNumber(20);
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
            <Header selected={2}/>
            <div class="sm:flex m-2 sm:p-8 sm:space-x-12">
                <div class="order-1 sm:w-[8vw] sm:mx-8 my-4 sm:m-12">
                    <CategoryTab courseList={courseList} handleTabNumber={handleTabNumber}/>
                </div>
                <div class="order-2 sm:fixed sm:pl-[65vw] sm:my-12">
                    <SearchBar onSubmit={handleSubmit} />
                </div>
                <div class="order-3 pt-8 space-y-2 sm:space-y-4">
                    <p class='text-2xl sm:text-4xl font-bold text-stone-800'>{courseName}</p>
                    <p class="text-sm text-stone-500">{totalCourses}개의 검색결과</p>
                    {courses}
                    {moreCourseButton}
                </div>
            </div>
        </div>
    );
}