Items = new Meteor.Collection('items');




//if(Meteor.isClient) { //if its on client side

Template.addgroup.events({
  'click .submit': function() { //faz o evento acontecer
      Items.insert({
        item: $('.the_item').val()
      })
    }
});

//}
