const imgavator = document.querySelector("#avatar");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const repos = document.querySelector("#repos");
const username = document.querySelector("#username");
const mostViewedRepo = document.querySelector("#mostViewedRepo");
const profile_link = document.querySelector("#profile-link");



  // requesting url
  const requestURL = "https://api.github.com/users/abdullah-niaz"; 
  // initilize the xml request and stores it's refrence to a object
  const xhr = new  XMLHttpRequest();
  // opening request for geting data
  xhr.open('GET',requestURL);
  xhr.onreadystatechange = function(){
      console.log(xhr.readyState)
      if(this.readyState === 4){
          const data = JSON.parse(this.responseText);
          console.log(data)
          imgavator.src = data.avatar_url;
          username.textContent = data.name
          followers.textContent = data.followers;
          following.textContent = data.following
          repos.textContent = data.public_repos
          profile_link.href = data.html_url

        
          // Fetch repositories to determine the most viewed (starred) one
          fetchMostStarredRepo(data.repos_url);
      }
  }
  
  // sending request
  xhr.send();



function fetchMostStarredRepo(reposURL) {
    const xhrRepos = new XMLHttpRequest();
    xhrRepos.open('GET',reposURL);
    xhrRepos.onreadystatechange = function() {
        if (this.readyState === 4) {
            const reposData = JSON.parse(this.responseText);
            let mostStarredRepo = reposData[0];
            for (const repo of reposData) {
                if (repo.stargazers_count > mostStarredRepo.stargazers_count) {
                    mostStarredRepo = repo;
                }
            }
            mostViewedRepo.textContent = mostStarredRepo.name;
        }
    };
    xhrRepos.send();
}