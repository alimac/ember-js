var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});


App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.route('about');
  this.resource('services', function() {
    this.resource('service', {path: '/:service_id'});
  });
});

/***
App.Router.reopen({
  location: 'history'
});
***/

App.ServicesRoute = Ember.Route.extend({
  model: function() {
    //return App.SERVICES;
    return this.store.find('service'); 
  }
});

App.ServiceRoute = Ember.Route.extend({
  mode: function (params) {
    //return App.SERVICES.findBy('slug', params.slug);
    return this.store.find('service', params.service_id);
  }
});

App.IndexController = Ember.Controller.extend({
  cats: 99,
  logo: 'img/ember-js-mascot.png',
  alt: 'Ember Mascot',
  time: function() {
    return (new Date()).toDateString(); 
  }.property()
});

App.Service = DS.Model.extend({
  slug : DS.attr('string'),
  name: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr('string'),
  reviews: DS.hasMany('review',  { async: true }),
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.Service.FIXTURES = [
  {
    id: 1,
    slug: 'bridal',
    name: 'Bridal Makeup',
    description: 'Natural and timeless. You willset trends long after you\'re dead!',
    price: 100,
    reviews: [ 3]
  },
  {
    id: 2,
    slug: 'ballroom',
    name: 'Ballroom Dance Makeup',
    description: 'Your eye shadow will match your dress, even if it\'s made of rainbows.',
    price: 200,
    reviews: [],
  },
  { 
    id: 3,
    slug: 'consulting',
    name: 'One-on-One Makeup Consulting',
    description: 'I will go to Sephora and battle the demons that work there to get you the best makeup evarrr.',
    price: 300,
    reviews: [1,2],
  }
];

App.Review = DS.Model.extend({
  text: DS.attr('string'),
  service: DS.belongsTo('service'),
});
App.Review.FIXTURES = [
  {
    id: 1,
    service : 3,
    text : 'Sooooo fun!', 
  },
  {
    id: 2,
    service : 3,
    text : 'OMG! Now I can wear makeup.',
  },
  {
    id: 3,
    service : 2,
    text : 'I ended up divorcing her but my makeup was flawless. You will deal.',
  },
];
