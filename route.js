Router.route("/", function  (){
  this.render("login");
});

Router.route("/register", function(){
  this.render("register");
});

Router.route("/addgroup", function(){
  this.render("addgroup");
});

Router.route("/dashboard", function(){
  if(Meteor.user()){
    this.render("dashboard");
  }else{
    this.render("login");
  }

});
