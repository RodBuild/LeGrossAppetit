const server = 'https://le-gros-appetit.herokuapp.com/staff';
import { getDataFromAPI, postDataToAPI } from "./utils.js";

// getDataFromAPI(server, 'staff')


// async function getAPI(url) {
//     try {
//         let server1 = await fetch(server + url)
//         let data = await server1.json()
//         // navigate through [0],[1],etc
//         console.log(data.staff)
//         // console.log(data.staff)
//         return 'ok'
//     } catch (error) {
//         console.log(error)
//         return 'bad'
//     }
// }
// // getAPI('menu')

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
            
            this.attempLogin({username, password})
            
            // this.login({
            //     username,
            //     password
            // }, this.showInfo.bind(this));
        });
    }

    attempLogin(creds) {
        // debug username - password
        // Alain Ducasse
        // $2b$10$dGaZWsVM.BYgj7iZ.wYIVu/GNO3GQghMJJwLtqUmMvHU0cm5fhRq2
        getDataFromAPI(server,this.mainElement, 'staff',creds);
        // postDataToAPI(server,this.mainElement, 'staff',creds)
    }

    // async login(creds, next) {
    //     if (creds.username == '' || creds.password == '') {
    //         console.log('STOP')
    //     } else {
    //         console.log('Tried logging in with: ', creds.username, creds.password)
    //         let access = await getAPI('staff')
    //         if (access == 'ok') {
    //             this.showInfo()
    //         } else {
    //             console.log('User does not exist!')
    //         }
    //     }
    // }
    // async showInfo() {
    //     this.mainElement.innerHTML = `
    //     <form class="login-form" id="login-form">
    //         <div class="form-title">
    //             Personnel Information
    //         </div>
    //         <div class="form-input">
    //             <label for="username">New Username</label>
    //             <input type="text" id="username">
    //         </div>
    //         <div class="form-input">
    //             <label for="password">New Password</label>
    //             <input type="password" id="password">
    //         </div>
    //         <div class="form-input">
    //             <p class="role"><b>Role in restaurant:</b> Chef</p>
    //             <p class="hours"><b>Hours per week:</b> 40</p>
    //             <p class="payment"><b>Payment per hour:</b> 20</p>
    //             <p class="description"><b>Description:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia maxime enim
    //                 animi hic ullam! Delectus numquam nisi sequi earum vero odit libero, laudantium, porro deserunt facere
    //                 ullam sapiente? Officia, placeat?</p>

    //         </div>
    //         <button type="submit" class="form-submit" id="form-update">Update</button>
    //     </form>
    //     `
    //     // listen for the update info button....
    //     document.getElementById('form-update').addEventListener('click', (e) => {
    //         e.preventDefault()
    //         const username = document.querySelector('#username').value;
    //         const password = document.querySelector('#password').value;
    //         console.log('New data is: ', username, password)
    //     });
    // }
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