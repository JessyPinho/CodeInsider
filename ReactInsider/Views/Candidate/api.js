// import { API_KEY } from './config';
// const genres = {
//   12: 'Adventure',
//   14: 'Fantasy',
//   16: 'Animation',
//   18: 'Drama',
//   27: 'Horror',
//   28: 'Action',
//   35: 'Comedy',
//   36: 'History',
//   37: 'Western',
//   53: 'Thriller',
//   80: 'Crime',
//   99: 'Documentary',
//   878: 'Science Fiction',
//   9648: 'Mystery',
//   10402: 'Music',
//   10749: 'Romance',
//   10751: 'Family',
//   10752: 'War',
//   10770: 'TV Movie',
// };

const API_URL = `http://127.0.0.1:8000`;
const getImagePath = `https://media.glassdoor.com/sqll/1623966/code-insider-squarelogo-1552316942085.png`;
const getBackdropPath =`https://media.glassdoor.com/sqll/1623966/code-insider-squarelogo-1552316942085.png`;

export const getPost = async () => {
  const { results } = await fetch(API_URL).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      title,
      type_post,
      duration,
      backdrop_path,
    }) => ({
      key: id(id),
      title: title,
      type_post: type_post,
      duration: duration,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      description: description,
      releaseDate: release_date,
    })
  );

  return movies;
};