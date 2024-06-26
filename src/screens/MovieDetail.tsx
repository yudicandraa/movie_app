import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import { FontAwesome } from '@expo/vector-icons';
import MovieList from '../components/movies/MovieList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../types/app';

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    fetchMovieDetails();
    checkIsFavorite(id).then(setIsFavorite);
  }, [id]);

  const fetchMovieDetails = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error('Failed to fetch movie details:', error);
      });
  };

  const checkIsFavorite = async (id: number): Promise<boolean> => {
    try {
      const data = await AsyncStorage.getItem('@FavoriteList');
      if (data !== null) {
        const favMovieList: Movie[] = JSON.parse(data);
        return favMovieList.some((favMovie) => favMovie.id === id);
      }
      return false;
    } catch (error) {
      console.error('Failed to check favorite status:', error);
      return false;
    }
  };

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem('@FavoriteList');
      let favMovieList: Movie[] = [];

      if (data !== null) {
        favMovieList = JSON.parse(data);
      }

      favMovieList.push(movie);

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
      setIsFavorite(true);
    } catch (error) {
      console.error('Failed to add favorite movie:', error);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem('@FavoriteList');
      if (data !== null) {
        const favMovieList: Movie[] = JSON.parse(data);
        const updatedList = favMovieList.filter((favMovie) => favMovie.id !== id);
        await AsyncStorage.setItem('@FavoriteList', JSON.stringify(updatedList));
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Failed to remove favorite movie:', error);
    }
  };

  if (!movie) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.favoriteIconContainer}>
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={30}
            color="red"
            onPress={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}
          />
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.detail}>Rating: {movie.vote_average}</Text>
      </View>
      <MovieList
        title="Recommendations"
        path={`movie/${id}/recommendations`}
        coverType="poster"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  poster: {
    width: 300,
    height: 450,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default MovieDetail;
