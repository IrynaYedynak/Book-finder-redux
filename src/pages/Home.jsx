import SearchBar from "../components/SearchBar";
import BooksList from "../features/books/bookList";

export default function Home() {
    return(
        <div>
            <SearchBar />
            <BooksList />
        </div>
    )
}