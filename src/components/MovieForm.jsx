import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class MovieForm extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        title: '',
        genreId: '',
        numberInStock: '',
        dailyRentalRate: '',
      },
      genres: [],
      errors: {},
    };
    this.schema = {
      title: Joi.string().required().label('Title'),
      genreId: Joi.string().required().label('Genre'),
      numberInStock: Joi.number()
        .min(0)
        .max(100)
        .required()
        .label('Number in Stock'),
      dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
    };
  }

  componentDidMount() {
    this.setState({ genres: getGenres() });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    // prevent user from coming back. Use return so the rest of the code doesn't get executed.
    if (!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModal(movie) });
  }

  mapToViewModal(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie Form {this.props.match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
