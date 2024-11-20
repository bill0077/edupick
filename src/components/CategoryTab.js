import React, { useState } from 'react';

export default function CategoryTab({ courseList, handleTabNumber }) {
    const [tabNumber, setTabNumber] = useState(-1);

    const categories = courseList ?
    ["전체 과목", ...courseList.categories].map((category, i) =>
        <p onClick={(e)=>{
            e.stopPropagation();
            setTabNumber(i-1);
            handleTabNumber(i-1);
        }}
        class={tabNumber===i-1?"text-lg sm:text-2xl font-bold text-blue-600":"text-sm sm:text-xl text-stone-800"} key={i}>{category}</p>
    )
    : <p>categories not loaded</p>

    return (
        <ol class="sm:fixed space-y-2 space-x-1 flex items-center sm:items-start sm:flex-col">
            <div />
            {categories}
        </ol>
    );
}