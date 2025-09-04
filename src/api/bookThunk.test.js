/// <reference types="vitest" />

import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import  booksReducer, { getBooks } from '../features/books/bookSlice';
import * as api from './booksApi';

vi.mock('./booksApi', () => ({ fetchBooks: vi.fn() }));

describe('getBooks thunk', () => {
    it('dispatches fulfilled when fetchBooks succeeds', async () => {
    api.fetchBooks.mockResolvedValue([{ id: 1, title: 'Book 1' }]);

    const store = configureStore({ reducer: { books: booksReducer } });

    await store.dispatch(getBooks('Harry Potter'));

    const state = store.getState().books;
    expect(state.status).toBe('succeeded');
    expect(state.items).toHaveLength(1);
    });

    it('dispatches rejected when fetchBooks fails', async () => {
    api.fetchBooks.mockRejectedValue(new Error('Network Error'));

    const store = configureStore({ reducer: { books: booksReducer } });

    await store.dispatch(getBooks('Harry Potter'));

    const state = store.getState().books;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Network Error');
    });
});