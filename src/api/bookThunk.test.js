/// <reference types="vitest" />

import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import  booksReducer, { getBooks } from '../features/books/bookSlice';
import * as api from './booksApi';

vi.mock('./booksApi', () => ({ fetchBooks: vi.fn() })); // фейкова функція замість fetchbooks, дозволяє імітувати сценарії

describe('getBooks thunk', () => { 
    it('dispatches fulfilled when fetchBooks succeeds', async () => { //позитивний сценарій
    api.fetchBooks.mockResolvedValue([{ id: 1, title: 'Book 1' }]); // fetchBooks поверне масив з однією книжкою

    const store = configureStore({ reducer: { books: booksReducer } }); // створюємо тестовий redux store з нашим редюсером

    await store.dispatch(getBooks('Harry Potter')); //диспатчимо getBooks("Harry Potter")

    const state = store.getState().books; // беремо state.books
    expect(state.status).toBe('succeeded');
    expect(state.items).toHaveLength(1);
    });

    it('dispatches rejected when fetchBooks fails', async () => { // негативний сценарій
    api.fetchBooks.mockRejectedValue(new Error('Network Error'));

    const store = configureStore({ reducer: { books: booksReducer } }); // створюємо тестовий redux store з нашим редюсером

    await store.dispatch(getBooks('Harry Potter')); //диспатчимо getBooks("Harry Potter")

    const state = store.getState().books;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Network Error');
    });
});