function maskPassword(pass){
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str  += "*";
    }
    return str;
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
          /* clipboard successfully set */
          document.getElementById("alert").style.display = "block";
          setTimeout(() => {
            document.getElementById("alert").style.display = "none";
          }, 2000);
        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed");
        }
    );
}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website;
    });
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
};

const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data To Show";
    } else {
        tb.innerHTML =  `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            str += `<tr>
                <td>${element.website} <button class="copy-btn" onclick="copyText('${element.website}')"><i class="fas fa-copy"></i><span>Copy</span></button></td>
                <td>${element.username} <button class="copy-btn" onclick="copyText('${element.username}')"><i class="fas fa-copy"></i><span>Copy</span></button></td>
                <td>${maskPassword(element.password)} <button class="copy-btn" onclick="copyText('${element.password}')"><i class="fas fa-copy"></i><span>Copy</span></button></td>
                <td><button class="delete-btn" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML = tb.innerHTML + str;
    }
    website.value = "";
    username.value = "";
    password.value = "";
};

console.log("Working");
showPasswords();

function savePassword() {
    var website = document.getElementById("website").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (website === "" || username === "" || password === "") {
        // Show popup if any field is empty
        showPopup("Please fill in all fields!");
    } else {
        // Proceed with saving the password
        let passwords = localStorage.getItem("passwords");
        if (passwords == null) {
            let json = [];
            json.push({ website: website, username: username, password: password });
            alert("Password Saved");
            localStorage.setItem("passwords", JSON.stringify(json));
        } else {
            let json = JSON.parse(localStorage.getItem("passwords"));
            json.push({ website: website, username: username, password: password });
            alert("Password Saved");
            localStorage.setItem("passwords", JSON.stringify(json));
        }
        showPasswords();
    }
}

function showPopup(message) {
    const popup = document.getElementById("error-popup");
    popup.textContent = message;
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 3000); // Hide after 3 seconds
}
