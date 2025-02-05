let changed = [];


function clickInput(inputID) {
    document.getElementById(inputID).click();
}

function displayImage(input, changeID) {
    let reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById(changeID).setAttribute('src', e.target.result);
    };

    photo = reader.readAsDataURL(input.files[0]);

    if (!(changeID in changed)) {
        changed.push(changeID);

        if (changed.length == 6) {
            let header = document.getElementById("header");
            header.innerHTML = "Congratulations!"
        }
    }
}