let balance = 1000;
let multiplier = 1.0;
let interval;
let inGame = false;
let crashed = false;

const balanceEl = document.getElementById("balance");
const multiplierEl = document.getElementById("multiplier");
const betInput = document.getElementById("bet");
const startBtn = document.getElementById("start");
const cashoutBtn = document.getElementById("cashout");
const statusEl = document.getElementById("status");

function resetGame() {
  clearInterval(interval);
  multiplier = 1.0;
  multiplierEl.textContent = "x1.00";
  startBtn.disabled = false;
  cashoutBtn.disabled = true;
  inGame = false;
  crashed = false;
}

startBtn.addEventListener("click", () => {
  const bet = parseFloat(betInput.value);
  if (isNaN(bet) || bet <= 0 || bet > balance) {
    alert("Aposta inválida!");
    return;
  }

  balance -= bet;
  balanceEl.textContent = balance.toFixed(2);
  startBtn.disabled = true;
  cashoutBtn.disabled = false;
  inGame = true;
  crashed = false;
  statusEl.textContent = "";

  // Crash aleatório entre x1.5 e x10
  const crashPoint = (Math.random() * 8.5 + 1.5).toFixed(2);

  interval = setInterval(() => {
    multiplier += 0.05;
    multiplierEl.textContent = `x${multiplier.toFixed(2)}`;

    if (multiplier >= crashPoint) {
      crashed = true;
      clearInterval(interval);
      statusEl.textContent = "💥 Crash! Você perdeu!";
      cashoutBtn.disabled = true;
      setTimeout(resetGame, 2000);
    }
  }, 100);
});

cashoutBtn.addEventListener("click", () => {
  if (!inGame || crashed) return;

  const bet = parseFloat(betInput.value);
  const gain = bet * multiplier;
  balance += gain;
  balanceEl.textContent = balance.toFixed(2);
  statusEl.textContent = `✅ Você sacou em x${multiplier.toFixed(2)} e ganhou R$ ${gain.toFixed(2)}!`;
  resetGame();
});
