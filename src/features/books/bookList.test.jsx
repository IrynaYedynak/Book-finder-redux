/// <reference types="vitest" />

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';
import BooksList from './bookList';

// Хелпер для рендеру компоненту з Redux store
function renderWithStore(preloadedState) {
    const store = configureStore({
        reducer: { books: booksReducer },
        preloadedState: { books: preloadedState },
    });

    return render(
        <Provider store={store}>
        <BooksList />
        </Provider>
    );
    }

    describe('BooksList component', () => {
    it('renders loading state', () => {
        renderWithStore({ items: [], status: 'loading', error: null });
        expect(screen.getByText(/loading books/i)).toBeInTheDocument();
    });

    it('renders error state', () => {
        renderWithStore({ items: [], status: 'failed', error: 'Network Error' });
        expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
    });

    it('renders list of books', () => {
        const books = [
        {
            id: '1',
            volumeInfo: {
            title: 'Book 1',
            imageLinks: { thumbnail: 'http://example.com/book1.jpg' },
            },
        },
        {
            id: '2',
            volumeInfo: {
            title: 'Book 2',
            imageLinks: { thumbnail: 'http://example.com/book2.jpg' },
            },
        },
    ];

    renderWithStore({ items: books, status: 'succeeded', error: null });

    // Перевірка тексту
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();

    // Перевірка зображень
    expect(screen.getByAltText('Book 1')).toHaveAttribute('src', 'http://example.com/book1.jpg');
    expect(screen.getByAltText('Book 2')).toHaveAttribute('src', 'http://example.com/book2.jpg');
    });
});
