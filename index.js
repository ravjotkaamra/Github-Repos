class Backend {
  constructor() {
    this.baseUrl = "";
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  async get(endpoint) {
    const response = await fetch(this.baseUrl + endpoint);
    const data = await response.json();
    return data;
  }

  async post(endpoint, data = {}) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responsedata = await response.json();
    return responsedata;
  }
}

const API = new Backend();

API.setBaseUrl("https://api.github.com/");

const form = document.querySelector("#repos-form");
const username = document.querySelector("#github-username");
const list = document.querySelector("#list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = username.value;

  API.get(`users/${user}/repos`)
    .then((data) => {
      let html = "";
      data.forEach((repo) => {
        html += `<li>
                  <a href="${repo.html_url}" target="_blank">
                      <h2>${repo.full_name}</h2>
                      <p>${repo.description}</p>
                  </a>
              </li>`;
      });
      // we want to completely replace old <li>s
      list.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
      let html =
        "<h3 class='error-message'>You have entered invalid username.</h3>";
      list.innerHTML = html;
    });
});
