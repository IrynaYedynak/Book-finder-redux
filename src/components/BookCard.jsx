export default function  BookCard({book}) {
    const { volumeInfo }  = book; // об'єкт з вкладеними даними з апі
    return(
    <div className="book-card-container"> 
        <img 
        src={volumeInfo.imageLinks?.thumbnail}
        alt={volumeInfo.title} 
        className="book-card-image"/>
        <h2>{volumeInfo.title}</h2>
        <p>{volumeInfo.authors?.join(" , ")}</p>
    </div>
    )};