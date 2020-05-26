export default class GithubApi {
  constructor(options) {
    this.options = options;
  }

  //API GITHUB
  getCommits() {
    return (fetch(`https://api.github.com/repos/Hillar1ous/diploma-work/commits?sha=master`, {
      method: 'GET',
      headers: {
          authorization: 'OAUTH-TOKEN'
      }
    })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err))
    );
  }
}
