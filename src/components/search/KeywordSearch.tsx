// src/components/search/KeywordSearch.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Movie } from '../../types/app';
import { API_ACCESS_TOKEN } from '@env';
import { NavigationProps } from '../../navigations/types'; // Import the NavigationProps type

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation<NavigationProps>(); // Use the typed navigation

  const handleSearch = async () => {
    console.log('Searching for:', keyword);
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}`;
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
      console.error('Failed to fetch movies:', error);
    }
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { id: item.id })} style={styles.movieItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieOverview} numberOfLines={3}>{item.overview}</Text>
        <Text style={styles.movieRating}>Rating: {item.vote_average}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSearch}
      />
      <Button title="Search" onPress={handleSearch} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  movieOverview: {
    fontSize: 14,
    marginBottom: 4,
  },
  movieRating: {
    fontSize: 14,
    color: 'gray',
  },
});

export default KeywordSearch;
