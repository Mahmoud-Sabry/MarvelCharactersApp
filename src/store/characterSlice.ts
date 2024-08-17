
import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../types/marvel';
import { fetchCharacters, fetchCharacterDetails } from './characterThunks';

const initialState = {
    characters: [] as Character[],
    characterDetails: null as Character | null,
    loading: false,
    error: null as string | null,
    theme: 'light' as 'light' | 'dark',
    total: 0,
    currentOffset: 0,
};

const characterSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setCurrentOffset(state, action) {
            state.currentOffset = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.loading = false;
                state.characters = [...state.characters, ...action.payload.characters];
                state.total = action.payload.total;
                state.currentOffset = action.payload.offset;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch characters';
            })
            .addCase(fetchCharacterDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.characterDetails = action.payload;
            })
            .addCase(fetchCharacterDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch character details';
            });
    },
});

export const { toggleTheme, setCurrentOffset } = characterSlice.actions;
export default characterSlice.reducer;