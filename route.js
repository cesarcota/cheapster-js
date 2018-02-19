Router.route("/", function  (){
  this.render("login");
});

Router.route("/register", function(){
  this.render("register");
});

Router.route("/addgroup", function(){
  this.render("addgroup");
});
