import React, { useState } from 'react';

export default function CategoryTab({ courseList, handleTabNumber }) {
    const [tabNumber, setTabNumber] = useState(-1);

    const categories = courseList ?
    courseList.categories.map((category, i) =>
        <p onClick={(e)=>{
            e.stopPropagation();
            setTabNumber(i);
            handleTabNumber(i);
        }}
        class={tabNumber===i?"text-2xl font-bold text-blue-600":"text-xl text-stone-800"} key={i}>{category}</p>
    )
    : <p>categories not loaded</p>

    return (
        <ol class="fixed space-y-2">
            <p onClick={(e)=>{
                e.stopPropagation();
                setTabNumber(-1);
                handleTabNumber(-1);
            }} 
            class={tabNumber===-1?"text-2xl font-bold text-blue-600":"text-xl text-stone-800"}>전체 과목</p>
            {categories}
        </ol>
    );
}