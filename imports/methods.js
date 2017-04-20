import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import Books from './collections/books';

export const saveBooks = new ValidatedMethod({
  name: 'saveBooks',

  validate: new SimpleSchema({
    books: Array,
    'books.$': { type: Object, blackbox: true },
  }).validator(),

  run({ books }) {
    try {
      Books.batchInsert(books); // This allows the same book to be inserted multiple times in a user's collection
    } catch (e) {
      throw new Meteor.Error('save-error');
    }
  },
});

export const removeBooks = new ValidatedMethod({
  name: 'removeBooks',

  validate: new SimpleSchema({
    bookIds: [String],
  }).validator(),
  run({ bookIds }){
    try {
      Books.remove({_id: {$in: bookIds}})
    } catch (e) {
      throw new Meteor.Error('remove-error');
    }
  }
});
