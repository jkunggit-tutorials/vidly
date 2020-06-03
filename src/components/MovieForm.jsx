import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

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
      _id: Joi.string(),
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

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populdateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModal(movie) });
    } catch (ex) {
      // prevent user from coming back. Use return so the rest of the code doesn't get executed.
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    this.populateGenres();
    this.populdateMovie();
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

  doSubmit = async () => {
    await saveMovie(this.state.data);
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
