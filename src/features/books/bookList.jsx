import { useSelector } from "react-redux";
import BookCard from "../../components/BookCard";

export default function BooksList() {
    const { items, status, error } = useSelector((state) => state.books);

    if (status === "loading") {
        return (
        <div className="status-container">
            <div className="spinner"></div>
            <p className="status-text">Loading books...</p>
        </div>
        );
    }

    if (status === "failed") {
        return (
        <div className="status-container error">
            <p className="status-text">Error: {error}</p>
        </div>
        );
    }

    return (
        <div className="book-list">
        {items.map((book) => (
            <BookCard key={book.id} book={book} />
        ))}
        </div>
    );
}

