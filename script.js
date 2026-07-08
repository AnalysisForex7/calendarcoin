let balance = Number(localStorage.getItem("balance")) || 0;
let mineTime = Number(localStorage.getItem("mineTime")) || 0;
let dailyDate = localStorage.getItem("dailyDate") || "";

const balanceEl = document.getElementById("balance");
const timerEl = document.getElementById("timer");
const mineBtn = document.getElementById("mineBtn");
const adsBtn = document.getElementById("adsBtn");
const dailyBtn = document.getElementById("dailyBtn");
const withdrawBtn = document.getElementById("withdrawBtn");

function save() {
    localStorage.setItem("balance", balance);
    localStorage.setItem("mineTime", mineTime);
    localStorage.setItem("dailyDate", dailyDate);
}

function updateBalance() {
    balanceEl.innerHTML = balance + " Coin";

    if (balance >= 10000) {
        withdrawBtn.disabled = false;
    } else {
        withdrawBtn.disabled = true;
    }
}

mineBtn.onclick = function () {

    if (Date.now() < mineTime) return;

    balance += 100;
    mineTime = Date.now() + 24 * 60 * 60 * 1000;

    save();
    updateBalance();
    updateTimer();

    alert("Mining berhasil! +100 Coin");
};

adsBtn.onclick = function () {
    balance += 5;
    save();
    updateBalance();
    alert("+5 Coin");
};

dailyBtn.onclick = function () {

    let today = new Date().toDateString();

    if (today == dailyDate) {
        alert("Daily hari ini sudah diambil");
        return;
    }

    dailyDate = today;
    balance += 5;

    save();
    updateBalance();

    alert("Daily berhasil +5 Coin");
};

withdrawBtn.onclick = function () {

    if (balance < 10000) {
        alert("Minimal 10.000 Coin");
        return;
    }

    alert("Fitur withdraw belum tersedia");
};

function updateTimer() {

    let now = Date.now();

    if (now >= mineTime) {

        timerEl.innerHTML = "Ready";
        mineBtn.disabled = false;
        return;
    }

    mineBtn.disabled = true;

    let diff = mineTime - now;

    let h = Math.floor(diff / 3600000);
    let m = Math.floor((diff % 3600000) / 60000);
    let s = Math.floor((diff % 60000) / 1000);

    timerEl.innerHTML =
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0") + ":" +
        String(s).padStart(2, "0");
}

setInterval(updateTimer, 1000);

updateBalance();
updateTimer();
