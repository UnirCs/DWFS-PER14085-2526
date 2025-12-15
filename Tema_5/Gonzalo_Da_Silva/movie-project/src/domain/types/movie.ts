export interface MovieParams {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  runtime?: number;
  genre_ids?: number[];
  vote_average: number;
}

export interface GenreParams {
  id: number;
  name: string;
}

export interface MoviePresenter {
  id: number;
  title: string;
  posterPath: string;
  overview: string;
  runtime?: number;
  genres?: GenreParams[];
  voteAverage: number;
}
