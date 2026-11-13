document.addEventListener("DOMContentLoaded", function() {
  
  // ===== ۱. تنظیم سال فوتر =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== ۲. انیمیشن ورود بخش‌ها (Reveal) =====
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  // ===== ۳. منوی موبایل =====
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });
    // بستن منو با کلیک روی لینک‌ها
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== ۴. مودال پروژه‌ها (Project Modal) =====
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalStack = document.getElementById('modal-stack');
  const modalClose = document.getElementById('modal-close');
  const projects = document.querySelectorAll('.project');

  if (modal) {
    projects.forEach(project => {
      project.addEventListener('click', function() {
        modalTitle.textContent = this.getAttribute('data-title');
        modalDesc.textContent = this.getAttribute('data-desc');
        modalStack.textContent = this.getAttribute('data-stack');
        modal.classList.add('open');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', function() {
        modal.classList.remove('open');
      });
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }

  // ===== ۵. انتخابگر زبان (Language Switcher) =====
  // این بخش به صورت هوشمند تصمیم می‌گیره کاربر به کدوم صفحه بره
  const isFa = window.location.pathname.includes('index-fa.html');
  
  // ذخیره زبان در حافظه مرورگر
  if (isFa) {
    localStorage.setItem('harch-lang', 'fa');
  } else {
    localStorage.setItem('harch-lang', 'en');
  }

  // ===== ۶. افکت Parallax (برای دسکتاپ) =====
  if (window.innerWidth > 850) {
    const visual = document.querySelector('.visual');
    const orb = document.querySelector('.orb');
    
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      // حرکت عکس و دایره با سرعت‌های متفاوت
      if (visual && scrollY < 800) {
        visual.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
      if (orb && scrollY < 800) {
        orb.style.transform = `translateY(${scrollY * -0.1}px)`;
      }
    }, { passive: true });
  }

  // ===== ۷. محافظت از محتوا (Anti-Copy) =====
  // به جای بلاک کردن کامل راست کلیک، فقط هشدار میده و کار را سخت می‌کنه
  document.addEventListener('contextmenu', function(e) {
    // اگر کاربر روی متن یا تصویر بود، هشدار بده
    e.preventDefault();
    alert("© 2026 H.Arch. All Rights Reserved.\n\nIntellectual property protected. Unauthorized copying or reproduction of this website's design and code is strictly prohibited.");
  });

  // بلاک کردن کلیدهای میانبر برای دیدن سورس و ابزار توسعه‌دهنده
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U') || e.key === 'F12') {
      e.preventDefault();
    }
  });

});
