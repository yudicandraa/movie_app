import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieItem from '../components/movies/MovieItem'; // Import MovieItem
import { Movie } from '../types/app';

export default function Favorite(): JSX.Element {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]); // State for favorite movies

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await AsyncStorage.getItem('@FavoriteList');
        if (data !== null) {
          setFavoriteMovies(JSON.parse(data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      {favoriteMovies.length === 0 ? (
        <Text style={styles.noFavorites}>You have no favorite movies yet.</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.movieList}>
            {favoriteMovies.map((movie) => (
              <MovieItem
                key={movie.id}
                movie={movie}
                size={{ width: 150, height: 225 }}
                coverType="poster"
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noFavorites: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  scrollView: {
    width: '100%',
  },
  movieList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
