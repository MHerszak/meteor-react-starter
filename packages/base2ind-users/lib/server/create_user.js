Accounts.onCreateUser(function(options, user){
  user = Base2Ind.callbacks.run("onCreateUser", user, options);
  return user;
});
