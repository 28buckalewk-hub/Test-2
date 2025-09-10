const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player setup
const player = { x: 100, y: 300, width: 40, height: 40, color: "blue" };

// Enemy setup
const enemy = { x: 600, y: 300, width: 40, height: 40, color: "red", hp: 10 };

// Controls
let keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Game state
let gameOver = false;
let win = false;

// Enemy attacks every 3s
setInterval(() => {
  if (!gameOver) {
    // Check if player is near enemy
    if (Math.abs(player.x - enemy.x) < 50) {
      gameOver = true;
      win = false;
    }
  }
}, 3000);

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw enemy
  ctx.fillStyle = enemy.color;
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

  // Draw enemy HP
  ctx.fillStyle = "white";
  ctx.font = "20px Comic Sans MS";
  ctx.fillText("Enemy HP: " + enemy.hp, 600, 50);

  // Movement (A and D keys)
  if (keys["a"]) player.x -= 5;
  if (keys["d"]) player.x += 5;

  // Attack (Enter key)
  if (keys["Enter"]) {
    if (Math.abs(player.x - enemy.x) < 60 && enemy.hp > 0) {
      enemy.hp -= 1;
      keys["Enter"] = false; // prevent holding key down
    }
  }

  // Win/Lose check
  if (enemy.hp <= 0) {
    gameOver = true;
    win = true;
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Comic Sans MS";
    ctx.fillText(win ? "YOU WIN!" : "GAME OVER", 300, 200);
    return; // stop updating
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
