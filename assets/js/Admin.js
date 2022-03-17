const server = 'https://le-gros-appetit.herokuapp.com/feed/';

async function getAPI(url) {
    try {
        let server1 = await fetch(server + url)
        let data = await server1.json()
        // navigate through [0],[1],etc
        console.log(data.staff)
        // console.log(data.staff)
        return 'ok'
    }
    catch(error) {
        console.log(error)
        return 'bad'
    }
}
// getAPI('menu')

export default class Admin {
    constructor(outputElement) {
        // dynamically show login, and employee data
        this.mainElement = document.querySelector(outputElement);
        this.token = null;
    }
    showLogin() {
        this.mainElement.innerHTML = loginForm();
        document.querySelector('#form-submit').addEventListener('click', (e) => {
            e.preventDefault()
            const username = document.querySelector('#username').value;
            const password = document.querySelector('#password').value;
            this.login({username,password}, this.showInfo.bind(this));
        });
    }
    async login(creds,next) {
        if (creds.username == '' || creds.password == '') {
            console.log('STOP')
        }
        else {
            console.log('Tried logging in with: ', creds.username, creds.password)
            let access = await getAPI('staff')
            if (access == 'ok') {
                this.showInfo()
            }
            else {
                console.log('User does not exist!')
            }
        }
    }
    async showInfo() {
        this.mainElement.innerHTML = ``
    }
}
function loginForm() {
    return `
    <form class="login-form" id="login-form">
        <div class="form-title">
            Personnel Login
        </div>
        <div class="form-input">
            <label for="username">Username</label>
            <input type="text" id="username">
        </div>
        <div class="form-input">
            <label for="password">Password</label>
            <input type="password" id="password">
        </div>
        <button type="submit" class="form-submit" id="form-submit">Validate</button>
    </form>
    `
}