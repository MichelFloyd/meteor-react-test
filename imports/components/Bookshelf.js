import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectSheet } from '/imports/styling';
import Book from './Book';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export const BookshelfHelper = Wrapped => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedBookIds: [],
      };
    }

    bookSelected = bookId => {
      return this.state.selectedBookIds.indexOf(bookId) >= 0;
    };

    toggleBookSelection = bookId => {
      let newSelection = this.state.selectedBookIds;
      newSelection = this.bookSelected(bookId) ? newSelection.filter(id => id !== bookId) : [...newSelection, bookId];
      this.setState({ selectedBookIds: newSelection });
    };

    clearBookSelection = () => {
      this.setState({ selectedBookIds: []});
    }

    render() {
      return (
        <Wrapped
          {...this.props}
          selectedBookIds={this.state.selectedBookIds}
          onToggleBookSelection={this.toggleBookSelection}
          onClearBookSelection={this.clearBookSelection}
        />
      );
    }
  };
};

const Bookshelf = ({
  books,
  classes,
  onToggleBookSelection,
  selectedBookIds,
}) => {
  return (
    <div className={'bookshelf ' + classes.root}>
      {books.map( book => (
        <Book
          key={book.etag}
          book={book}
          selected={selectedBookIds.indexOf(book.etag) >= 0}
          onClick={onToggleBookSelection.bind(this,book.etag)}
        />
      ))}
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleBookSelection: PropTypes.func.isRequired,
  selectedBookIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default injectSheet(styles)(Bookshelf);
