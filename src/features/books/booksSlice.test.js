
import { describe, it, expect } from 'vitest';
import booksReducer, {getBooks} from './bookSlice'

describe('books reducer', () => {
    const initialState = { items: [], status: 'idle', error: null };

    it('should handle initial state', () => {
        const state = booksReducer(undefined, { type: undefined });
        expect(state).toEqual(initialState);
    });

    it('should handle getBooks.pending', () => {
        const action = { type: getBooks.pending.type };
        const state = booksReducer(initialState, action);
        expect(state).toEqual({ items: [], status: 'loading', error: null });
    });

    it('should handle getBooks.fulfilled', () => {
        const mockBooks = [{ id: 1, title: 'Book 1' }];
        const action = { type: getBooks.fulfilled.type, payload: mockBooks };
        const state = booksReducer(initialState, action);
        expect(state).toEqual({ items: mockBooks, status: 'succeeded', error: null });
    });

    it('should handle getBooks.rejected', () => {
        const action = { type: getBooks.rejected.type, error: { message: 'Failed to fetch' } };
        const state = booksReducer(initialState, action);
        expect(state).toEqual({ items: [], status: 'failed', error: 'Failed to fetch' });
    });
});

