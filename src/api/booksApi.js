import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes"; // url для отримання списку книг

export const fetchBooks = async (query) => {
    const response = await axios.get(`${BASE_URL}?q=${query}`); // get запит динамічно формується з базового url і параметр запиту де q = пошуковий рядок, await чекає на завершення запиту
    return response.data.items || [];

}