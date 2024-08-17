import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import md5 from 'md5';
import { Character } from '../types/marvel';

const PUBLIC_KEY = '3245e7a4c79906331b34e444a1296a08';
const PRIVATE_KEY = 'a7eb74257593424d980190b1d03d2cfbb54a1030';
const BASE_URL = 'https://gateway.marvel.com/v1/public';

const ts = new Date().getTime();
const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        apikey: PUBLIC_KEY,
        ts,
        hash,
    },
});

// Fetch Characters
export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async ({ limit, offset }: { limit?: number; offset?: number }) => {
        try {

            const response = await api.get('/characters', {
                params: { limit, offset },
            });

            console.log('Fetched Characters:', response.data);
            return {
                characters: response.data.data.results as Character[],
                total: response.data.data.total,
                offset
            };
        } catch (error) {
            console.error('Failed to fetch characters:', error);
            throw error;
        }
    }
);

// Fetch Character Details
export const fetchCharacterDetails = createAsyncThunk(
    'characters/fetchCharacterDetails',
    async (characterId: number) => {
        try {
            const response = await api.get(`/characters/${characterId}`);
            console.log('Fetched Character Details:', response.data);
            return response.data.data.results[0] as Character;
        } catch (error) {
            console.error('Failed to fetch character details:', error);
            throw error;
        }
    }
);
