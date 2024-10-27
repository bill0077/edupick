import { useState } from "react";

export default function SearchBar({ onSubmit }) {
    const [data, setData] = useState("");

    function handleClick() {
        onSubmit(data);
    }

    return (
        <form class='flex' onSubmit={(e)=>e.preventDefault()}>
            <input class='border-2' type="text" placeholder="통합검색" value={data} onChange={(e) => setData(e.target.value)} />
            <button class='w-12 h-8 border-2' onClick={handleClick}>검색</button>
        </form>
    );
}