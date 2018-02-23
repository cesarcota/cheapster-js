Router.route("/", function  (){
  this.render("landingpage");
});

Router.route("/login", function  (){
  this.render("login");
});

Router.route("/register", function(){
  this.render("register");
});

Router.route("/addgroup", function(){
  this.render("addgroup");
});

Router.route("/dashboard", function(){
  if(Session.get("sessionUser") !== undefined){
    console.log("SESSION: "+Session.get("sessionUser").email);
    this.render("dashboard");
  }else{
    console.log("SESSION: "+Session.get("sessionUser"));
    this.render("login");
  }
});

  Router.route("/newgroup", function(){
    if(Session.get("sessionUser") !== undefined){
      console.log("SESSION NEWGROUP: "+Session.get("sessionUser").email);
      this.render("newgroup");
    }else{
      console.log("SESSION NEWGROUP: "+Session.get("sessionUser"));
      this.render("login");
    }
});
