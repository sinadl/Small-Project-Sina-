// Fetch Script
class gitHub{
    constructor(){
        this.client_id = '1f74f4ce1621d8dd6df6';
        this.client_secret = 'dfd15ad97c044a475d1f9072baf5392ca81c117a';
        this.repos_count = 6;
        this.repos_sort = 'created: asc';
    }
    async getUser(user){
        const profileRepos = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const theRepos = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profiles = await profileRepos.json();
        const ownRepos = await theRepos.json();
        return{
            profiles,
            ownRepos
        }
    }
}

// UI Script
class UI{
    constructor(){
        this.profile = document.getElementById("profile");
    }
    showProfile(user){
        this.profile.style.opacity = "1";
        this.profile.innerHTML = `
        <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3 mb-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}" alt="">
            <a href="${user.url}" class="btn btn-primary btn-block">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">public Gists; ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>
        `}
    showRepos(data){
        let output = '';
        data.forEach(element => {
            output+= `
            <div class="card card-body">
            <div class="row">
              <div class="col-md-6">
                <a href="${element.html_url}" target="_blank">${element.name}</a>          
              </div>
              <div class="col-md-6">
                <span class="badge badge-primary">${element.stargazers_count}</span>
                <span class="badge badge-secondary">${element.watchers_count}</span>
                <span class="badge badge-success">${element.forms_count}</span>
              </div>
            </div>
          </div>
            `;
        });
        document.getElementById('repos').innerHTML = output;
    }
    clearProfile(){
        this.profile.style.opacity = "0";
        setTimeout(() => {
            this.profile.innerHTML = '';
        }, 800);
    }
    showAlert( messsage, className){
        this.clearAlert();
        let parentDiv = document.querySelector('.card.main-card');
        let beforeDiv = document.querySelector('.card.main-card .card-header');
        const div = document.createElement("div");
        div.className = className;
        div.appendChild(document.createTextNode(messsage));
        parentDiv.insertBefore(div, beforeDiv);
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }
    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }
}
// App Script
const searchUser = document.getElementById('searchUser');
const github = new gitHub;
const ui = new UI;
searchUser.addEventListener("keyup", (e) =>{
    const userText = e.target.value;
    if(userText !== ''){
        github.getUser(userText)
        .then(data => {
            if(data.profiles.message === "Not Found"){
                ui.clearProfile();
                ui.showAlert("There is no user with that name!!!","alert alert-danger");
            }
            else{
                ui.showProfile(data.profiles);
                ui.showRepos(data.ownRepos);
            }
        })
    }else{
        ui.clearProfile();
    }
});














