var github = (function(){
  function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+repos[i].description+'</p></li>';
    }
    t.innerHTML = fragment;
  }
  return {
    showRepos: function(options){
      $.getJSON("https://api.github.com/users/"+options.user+"/repos?callback=?",
        { error: function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); }
        , success: function(repos) {
          repos.sort(function(a, b) {
            var aDate = new Date(a.updated_at).valueOf(),
                bDate = new Date(b.updated_at).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

          if (options.count) { repos.splice(options.count); }
          render(options.target, repos);
        }
      });
    }
  };
})();
