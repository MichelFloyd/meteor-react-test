import React, { Component } from 'react';
import { injectSheet } from '/imports/styling';
import Bookshelf, { BookshelfHelper } from '../Bookshelf';

const styles = {
  bookCount: {
    fontWeight: 'bold',
  },

  bookResults: {
    marginTop: 24,
  },

  busyText: {
    fontSize: 13,
    marginLeft: 6,
  },

  manageButtons: {
    marginTop: 16,
  },

  resultsArea: {
    marginTop: 24,
  },

  searchButton: {
    marginLeft: 6,
  },
};

@injectSheet(styles)
@BookshelfHelper
class MyBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookCount: 0,
      books: [],
    };
  }

  bookSelectionUpdated = bookIds => {
    this.setState({ bookSelections: bookIds });
  };

  removeBooks = () => {
    const bookIds= this.props.books.filter(
      book => this.props.selectedBookIds.indexOf(book.id) >= 0,
    ).map(book => book._id);
    this.props.removeBooks.call({ bookIds });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.bookCount}>
          {this.props.books.length} books in your collection.
        </div>
        <div className={classes.manageButtons}>
          <button
            disabled={!this.props.selectedBookIds.length}
            onClick={this.removeBooks}
          >
            Remove from my Collection</button>
        </div>
        <div className={classes.bookResults}>
          <Bookshelf
            books={this.props.books}
            selectedBookIds={this.props.selectedBookIds}
            onToggleBookSelection={this.props.onToggleBookSelection}
          />
        </div>
      </div>
    );
  }
}

export default MyBooks;
