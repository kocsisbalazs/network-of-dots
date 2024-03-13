document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  let particlesArray = [];
  const numberOfParticles = 10;

  class Particle {
      constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = Math.random() * 5 + 1;
          this.speedX = Math.random() * 3 - 1.5;
          this.speedY = Math.random() * 3 - 1.5;
      }
      update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
              this.x = Math.random() * canvas.width;
              this.y = Math.random() * canvas.height;
          }
      }
      draw() {
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
      }
  }

  const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animate);
  };

  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
  });

  function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          particlesArray.push(new Particle(x, y));
      }
  }
  init();
  animate();

  function connectParticles() {
      for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a; b < particlesArray.length; b++) {
              const distance = Math.sqrt(
                  (particlesArray[a].x - particlesArray[b].x) ** 2 +
                  (particlesArray[a].y - particlesArray[b].y) ** 2
              );
              if (distance < 100) {
                  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                  ctx.lineWidth = 1;
                  ctx.beginPath();
                  ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                  ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                  ctx.stroke();
              }
          }
      }
  }

  // Footer © year changing
  var currentYear = new Date().getFullYear();
  document.getElementById('copyright').textContent = '©' + currentYear + ' Balázs Kocsis';
});
