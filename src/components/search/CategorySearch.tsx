// src/components/search/CategorySearch.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_ACCESS_TOKEN } from '@env';
import { Movie } from '../../types/app';
import { NavigationProps } from '../../navigations/types'; // Import the NavigationProps type

type Genre = {
  id: number;
  name: string;
};

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  const handleGenreSelection = (genreId: number) => {
    setSelectedGenre(genreId);
    searchByGenre(genreId);
  };

  const searchByGenre = async (genreId: number) => {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Failed to fetch movies by genre:', error);
    }
  };

  const renderGenreItem = ({ item }: { item: Genre }) => (
    <TouchableOpacity
      style={[styles.genreItem, item.id === selectedGenre && styles.selectedGenre]}
      onPress={() => handleGenreSelection(item.id)}
    >
      <Text style={styles.genreName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { id: item.id })} style={styles.movieItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.posterImage}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieOverview}>{item.overview}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={genres}
        renderItem={renderGenreItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genreList}
      />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  genreList: {
    marginBottom: 16,
  },
  genreItem: {
    backgroundColor: '#C0B4D5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedGenre: {
    backgroundColor: '#8978A4',
  },
  genreName: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  posterImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieOverview: {
    fontSize: 14,
    color: 'gray',
  },
});

export default CategorySearch;
