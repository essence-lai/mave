// imports/api/items.js

import { Mongo } from 'meteor/mongo';

const Items = new Mongo.Collection('items');

Meteor.methods({
   'Items.addOne': ({ name }) => {
       return Items.insert({ name });
   },
});

Meteor.publish('items', () => {
   return Items.find();
});
export default Items;