// script.js

(function() {
    // ---------- Spotify is handled by iframe, no music toggle needed ----------
    // but we keep the spotify player fixed as is
  
    // ---------- minimal floating elements (just 8 sparkles, no hearts) ----------
    const floatContainer = document.getElementById('floatContainer');
    const symbols = ['✨', '🌸', '🪄', '✨']; // only sparkles and few flowers
    for (let i = 0; i < 8; i++) { // reduced count
      let el = document.createElement('div');
      el.className = 'float-item';
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDuration = (12 + Math.random() * 15) + 's';
      el.style.animationDelay = (Math.random() * 10) + 's';
      el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
      floatContainer.appendChild(el);
    }
  
    // COUNTDOWN TIMER - RUNNING continuously
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Target: March 4th of current year
    let targetDate = new Date(currentYear, 2, 4, 0, 0, 0); // Month is 0-indexed, so 2 = March
    
    // If birthday has passed this year, set target to next year
    if (now > targetDate) {
      targetDate = new Date(currentYear + 1, 2, 4, 0, 0, 0);
    }
    
    // Calculate difference
    const diff = targetDate - now;
    
    // Time calculations
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Display countdown
    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
    // If it's birthday
    if (diff < 0) {
      countdownElement.innerHTML = "🎉 HAPPY BIRTHDAY! 🎉";
    }
  }
  
  // Run countdown immediately
  updateCountdown();
  
  // Update countdown every second (1000ms)
  setInterval(updateCountdown, 1000);
  
    // ---------- gift open with sparkle sound ----------
    const gifts = document.querySelectorAll('.gift-box');
    function playSparkle() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 1300;
        gain.gain.value = 0.08;
        osc.connect(gain).connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.12);
      } catch (e) { }
    }
    gifts.forEach(g => {
      g.addEventListener('click', (e) => {
        if (!g.classList.contains('opened')) {
          g.classList.add('opened');
          playSparkle();
          if (g.id === 'gift3') {
            let rainDiv = document.getElementById('chocoRain');
            // clear previous
            rainDiv.innerHTML = '';
            for (let i = 0; i < 12; i++) {
              let ch = document.createElement('div');
              ch.className = 'choco-drop';
              ch.innerText = '🍫';
              ch.style.left = Math.random() * 100 + '%';
              ch.style.animationDelay = Math.random() * 2 + 's';
              rainDiv.appendChild(ch);
            }
          }
        }
      });
    });
  
    // ---------- lightbox gallery ----------
    const polaroids = document.querySelectorAll('.polaroid');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const closeLight = document.querySelector('.close-light');
    polaroids.forEach(p => {
      p.addEventListener('click', () => {
        let imgSrc = p.querySelector('img').src;
        lbImg.src = imgSrc;
        lightbox.style.display = 'flex';
      });
    });
    closeLight.addEventListener('click', () => lightbox.style.display = 'none');
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.style.display = 'none'; });
  
    // ---------- timeline popup ----------
    const items = document.querySelectorAll('.timeline-item');
    const popup = document.getElementById('timelinePopup');
    const memoryMap = {
      '2011': 'We met in class, The Beginning of Us 💖',
      '2015': 'More Laughter, and gossip 🫶',
      '2021': 'Lasting Memories, Endless Laughter 💫',
      '2022': 'That will end your timeline perfectly 🥹💖',
      '2026': 'Still Us. Still Strong. Still Forever 🧿'
    };
    items.forEach(item => {
      item.addEventListener('click', () => {
        let year = item.getAttribute('data-year');
        popup.style.display = 'block';
        popup.innerText = memoryMap[year] || '✨ forever memory';
      });
    });
  
    // ---------- emotional letter typewriter ----------
    const letterText = `Happy Birthday, Mummmmmmy 💖
  
  From 2011 to 2026… 15 years.
  FIFTEEN YEARS of friendship. Can you believe that?
  
  We were just little kids when we first met. We didn’t know that the girl sitting beside us would become our biggest comfort, our safe place, our partner in crime, and our home outside home.
  
  We have fought.
  We have cried.
  We have laughed until our stomach hurt.
  We have shared secrets no one else knows.
  We have seen each other grow from childish school girls to strong women.
  
  And through everything… we stayed.
  
  In a world full of temporary people, you are my permanent one.
  In a world full of fake friendships, ours stayed real.
  
  Thank you for:
  Understanding my silence.
  Handling my mood swings.
  Fighting with me but never leaving.
  Loving me in my worst phases.
  
  Fifteen years is not just a number.
  It’s memories.
  It’s loyalty.
  It’s growth.
  It’s unconditional love.
  
  No matter where life takes us…
  No matter how busy we get…
  No matter how old we grow…
  
  You will always be my 2011 person.
  My school bench partner.
  My secret keeper.
  My forever Mummyyy.
  
  May Lord Jagannath bless you with success, happiness, peace, and everything your heart desires. You deserve the world… and even more.
  
  Happy Birthday to the most beautiful soul I know.
  Happy Birthday to my 15year forever.
  
  I love you. Always. 💖✨`;
  
    const typeContainer = document.getElementById('typewriterContainer');
    let i = 0;
    function typeWriter() {
      if (i < letterText.length) {
        typeContainer.innerHTML = letterText.substring(0, i + 1) + '<span class="typewriter">|</span>';
        i++;
        setTimeout(typeWriter, 25);
      } else {
        typeContainer.innerHTML = letterText;
      }
    }
    typeWriter();
  
    // ---------- funny letter (static) ----------
    const funnyDiv = document.getElementById('funnyLetter');
    funnyDiv.innerHTML = `Happy Birthday to my 15-year headache partner 🎂💖
  
  From 2011 to 2026…
  We survived school, teachers, exams, mood swings, fights, and each other 😌✨
  
  Honestly, I deserve an award for handling you for 15 years.
  But then again… you deserve a bigger award for handling ME 🤭
  
  We’ve:
  Fought over stupid things
  Stopped talking for 2 hours (maximum 🤣)
  Said “I will never talk to you again”
  And then shared food the same day
  
  Our friendship is basically:
  50% drama 🎭
  30% roasting each other 🔥
  20% emotional support 🤍
  100% permanent 🤞
  
  You are the only person who:
  Knows my embarrassing stories
  Has my worst photos
  And still chooses to stay
  
  That’s real bravery 😌👏
  
  15 years later and we’re still crazy, still loud, still childish, still together.
  Some friendships expire… ours came with lifetime validity 😎
  
  May Lord Jagannath bless you with:
  Unlimited happiness
  Zero tension
  Lots of money
  And patience to tolerate me forever 🤣
  
  Happy Birthday, my forever partner in crime.
  Now grow older… but don’t grow up too much.
  
  Love you idiot 💕🎂✨`;
  
    // ---------- final surprise confetti + fireworks ----------
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    function resizeCanvas() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; }
    window.addEventListener('resize', resizeCanvas); resizeCanvas();
  
    class Confetti {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.size = 6 + Math.random() * 12;
        this.speedY = 4 + Math.random() * 8;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${330 + Math.random() * 30}, 80%, 75%)`;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > height + 30) this.reset();
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  
    function startFinale() {
      canvas.style.display = 'block';
      for (let i = 0; i < 70; i++) particles.push(new Confetti());
      let msgShown = false;
      function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        if (!msgShown) {
          ctx.font = '50px Dancing Script, cursive';
          ctx.fillStyle = 'white';
          ctx.shadowColor = '#ff69b4';
          ctx.shadowBlur = 25;
          ctx.fillText('Happy Birthday My 15-Year Forever Friend 💕', 80, height / 2 - 30);
          msgShown = true;
          setTimeout(() => { msgShown = false; }, 200);
        }
        requestAnimationFrame(animate);
      }
      animate();
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          for (let j = 0; j < 10; j++) particles.push(new Confetti());
        }, i * 200);
      }
    }
    document.getElementById('surpriseBtn').addEventListener('click', startFinale);
  })();