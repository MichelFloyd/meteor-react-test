import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import MyBooks from './MyBooks';
import Books from '/imports/collections/books';
import { removeBooks } from '/imports/methods';
import { promisifyMethod } from '/imports/helpers';

export default createContainer(() => {
  const handle = Meteor.subscribe('myBooks');

  return {
    books: Books.find().map(b => {
      b.id = b._id; // required to ensure uniqueness in the user's collection when viewing
      return b;
    }),
    removeBooks: promisifyMethod(removeBooks),
  };
}, MyBooks);
