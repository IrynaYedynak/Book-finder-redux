import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBooks } from "../features/books/bookSlice"; // thunk який запускає запит до гугл апі

function SearchBar() {
const [query, setQuery] = useState(""); // setQuery змінює рядок  при кожному введені символу
const dispatch = useDispatch(); // дозволяє викликати екшени

useEffect (() => {
    //якщо рядок пустий, то не робимо запит
    if (!query.trim()) return;

    //таймер на 500мс
    const timeoutId = setTimeout(() => {
        dispatch(getBooks(query));
    }, 500)

    //очищаємо таймер 
    return () => clearTimeout(timeoutId);
}, [query, dispatch]);

return(
    <div>
        <input type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
        className="search-input" />
    </div>
)};

export default SearchBar;