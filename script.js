// Animate skill bars
window.addEventListener("scroll", () => {
  const skills = document.querySelector(".skills");
  const position = skills.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.2;
  if (position < screenPosition) {
    document.querySelectorAll(".progress").forEach(bar => {
      bar.style.animation = "grow 1.5s ease-out forwards";
    });
  }
});

const style = document.createElement('style');
style.innerHTML = `
@keyframes grow {
  from { width: 0; }
  to { width: inherit; }
}`;
document.head.appendChild(style);

// Cursor Trail
const canvas = document.getElementById('cursorTrail');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', e => {
  particles.push({
    x: e.clientX,
    y: e.clientY,
    size: Math.random() * 6 + 2,
    life: 100
  });
});

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 255, ${p.life / 100})`;
    ctx.fill();
    p.y -= 0.3;
    p.life -= 2;
    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();
