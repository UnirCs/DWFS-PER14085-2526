import type { AxiosInstance } from "axios";
import type { GenreParams, MovieParams } from "../domain/types/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;

export class ImDbMovieApiRepository {

    constructor(private readonly httpClient: AxiosInstance){}

    async getAllMovies(){

        const response = await this.httpClient.get(`${API_BASE_URL}/movie/popular`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            },
            params: {
                language: 'es-ES'
            }
        });

        return response.data.results as MovieParams[];

    }

    async getMovieGenres(){

        const response = await this.httpClient.get(`${API_BASE_URL}/genre/movie/list`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            },
            params: {   
                language: 'es-ES'
            }
        });

        return response.data.genres as GenreParams[];

    }
}