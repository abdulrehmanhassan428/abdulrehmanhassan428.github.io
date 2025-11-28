document.getElementById("myForm").addEventListener("submit", function(event) {

    let valid = true;

    let name = document.getElementById("name");
    let userName = name.value;
    let letter = true;

    for (let i = 0; i < userName.length; i++) {
        let ch = userName[i];

        if (!((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z') || ch === ' ')) {
            letter = false;
            break;
        }
    }

    if (userName.length === 0 || letter === false) {
        name.style.backgroundColor = "red";
        valid = false;
    } else {
        name.style.backgroundColor = "green";
    }


    let pass = document.getElementById("password");
    let passVal = pass.value;

    let bool = false;
    let specialch = "!@#$%^&*()";

    for (let i = 0; i < passVal.length; i++) {
        if (specialch.indexOf(passVal[i]) !== -1) {
            bool = true;
            break;
        }
    }

    if (bool === false || passVal.length === 0) {
        pass.style.backgroundColor = "red";
        valid = false;
    } else {
        pass.style.backgroundColor = "green";
    }


    let email = document.getElementById("email");
    let emailVal = email.value;

    let End = "@gmail.com";
    let ending = true;

    if (emailVal.length < End.length) {
        ending = false;
    } else {
        for (let i = 0; i < End.length; i++) {
            let emailIndex = emailVal.length - End.length + i;
            if (emailVal[emailIndex] !== End[i]) {
                ending = false;
                break;
            }
        }
    }

    if (ending === false) {
        email.style.backgroundColor = "red";
        valid = false;
    } else {
        email.style.backgroundColor = "green";
    }


    if (valid === false) {
        alert("Form not filled. Fill it properly");
        event.preventDefault();
    }
});
