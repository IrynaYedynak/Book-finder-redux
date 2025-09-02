import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks } from "../../api/booksApi";

export const getBooks = createAsyncThunk("books/getBooks", async (query) => {
    return await fetchBooks(query);
});

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getBooks.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getBooks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(getBooks.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export default booksSlice.reducer;