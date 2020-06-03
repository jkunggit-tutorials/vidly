import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
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

  async componentDidMount() {
    // we need to set all movie like initial value
    let { data: movies } = await getMovies();

    movies = movies.map((m) => {
      return { ...m, liked: m.liked || false };
    });

    const { data } = await getGenres();
    const genres = [{ _id: '', name: 'All Genres' }, ...data];
    this.setState({
      movies,
      genres: genres,
    });
  }

  handleDelete = async (movie) => {
    const originMovies = this.state.movies;
    const movies = originMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      console.log('fuck');
      if (ex.response && ex.response.status === 404) {
        toast.error('This movie has already been delete.');
      }
      this.setState({ movies: originMovies });
    }
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
