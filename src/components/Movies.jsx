import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';
import MoviesTable from './MoviesTable';
import Search from './common/Search';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
    searchQuery: '',
  };

  componentDidMount() {
    // we need to set all movie like initial value
    const movies = getMovies().map((m) => {
      return { ...m, liked: m.liked || false };
    });
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
    this.setState({
      movies,
      genres: genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = this.state.movies.map((m) => {
      if (m._id === movie._id) {
        m.liked = !movie.liked;
      }
      return m;
    });
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    // reset the current page whenever they switch the genre
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = ({ currentTarget: input }) => {
    const query = input.value;
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    // we need to filter the allMovies.

    let filtered = allMovies;

    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    // sort it
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: movieCount } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    if (!movieCount) return <p>There are no movies in the database.</p>;

    const { totalCount, data } = this.getPageData();
    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          <Link to='/movies/new' className='btn btn-primary'>
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <Search value={searchQuery} onSearch={this.handleSearch} />
          <MoviesTable
            movies={data}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
