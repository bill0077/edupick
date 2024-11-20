import { useState } from "react";

export default function SearchBar({ onSubmit }) {
    const [data, setData] = useState("");

    function handleClick() {
        onSubmit(data);
    }

    return (
        <form onSubmit={(e)=>e.preventDefault()}>
            <input class='border-2 rounded-xl p-1 sm:p-2 text-sm sm:text-lg' type="text" placeholder="수업 이름 검색" value={data} onChange={(e) => setData(e.target.value)} />
            <button class='hidden' onClick={handleClick}>검색</button>
        </form>
    );
}