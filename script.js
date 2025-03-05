let countdownInterval;
let sosActive = false;
const sosPassword = "1234";

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = sidebar.style.left === "0px" ? "-250px" : "0px";
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12
    });
}

function startSOS() {
    sosActive = true;
    document.getElementById("sos-modal").style.display = "block";
    let timeLeft = 5;
    document.getElementById("countdown").innerText = timeLeft;

    countdownInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("countdown").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            if (sosActive) {
                sendLocation();
            }
            document.getElementById("sos-modal").style.display = "none";
        }
    }, 1000);
}

function cancelSOS() {
    sosActive = false;
    clearInterval(countdownInterval);
    document.getElementById("sos-modal").style.display = "none";
    document.getElementById("password-modal").style.display = "block";
}

function verifyPassword() {
    const enteredPassword = document.getElementById("sos-password").value;
    if (enteredPassword === sosPassword) {
        alert("SOS Process Stopped!");
        document.getElementById("password-modal").style.display = "none";
        sosActive = false;
    } else {
        alert("Incorrect Password! Try Again.");
    }
}

function skipSOS() {
    sosActive = false;
    clearInterval(countdownInterval);
    sendLocation();
    document.getElementById("sos-modal").style.display = "none";
}

function sendLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            alert(`Live location sent to contacts! \nLatitude: ${lat} \nLongitude: ${lng}`);
        }, () => {
            alert("Location access denied!");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
