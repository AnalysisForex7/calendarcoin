let balance = Number(localStorage.getItem("balance")) || 0;

document.getElementById("balance").innerHTML = balance + " Coin";

function save() {
    localStorage.setItem("balance", balance);
    document.getElementById("balance").innerHTML = balance + " Coin";
}

function watchAds() {
    alert("Iklan selesai. +5 Coin");
    balance += 5;
    save();
}

function dailyLogin() {
    let today = new Date().toDateString();

    if (localStorage.getItem("daily") == today) {
        alert("Daily sudah diklaim hari ini.");
        return;
    }

    localStorage.setItem("daily", today);
    balance += 5;
    save();
}

function claimMining() {
    let now = Date.now();
    let last = Number(localStorage.getItem("mining")) || 0;

    if (now - last < 86400000) {
        alert("Mining baru bisa diklaim setiap 24 jam.");
        return;
    }

    localStorage.setItem("mining", now);
    balance += 100;
    save();
    alert("Mining berhasil! +100 Coin");
}
