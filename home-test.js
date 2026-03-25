window.addEventListener('load', function () {
  // NAV
  const navBtn = document.querySelector('.nav-toggle');

  if (navBtn) {
    navBtn.addEventListener('click', function () {
      const isOpen = document.body.classList.toggle('nav-open');
      navBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // HERO CAPTIONS
  const heroCaptions = [
    {
      title: 'Selected Game-Worn Artifacts',
      sub: "Curated examples from across Jordan's career."
    },
    {
      title: '1992–93 Away Jersey',
      sub: 'Multi-game example from the first 3-peat season.'
    },
    {
      title: '1986–87 Home Uniform',
      sub: 'Singular home uniform worn during his 37.1 PPG season.'
    },
    {
      title: '1997–98 Air Jordan (ECF Game 7)',
      sub: "A rare example from Jordan's last championship run."
    },
    {
      title: '1996–97 Home Jersey',
      sub: 'Rare autographed example from the 1997 championship.'
    }
  ];

  const heroCarousel = document.querySelector('.hero-carousel');
  const track = document.getElementById('heroTrack');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');
  const captionTitle = document.getElementById('heroCaptionTitle');
  const captionSub = document.getElementById('heroCaptionSub');

  if (heroCarousel && track) {
    const realSlides = Array.from(track.querySelectorAll('.hero-slide'));
    const totalReal = realSlides.length;

    if (totalReal > 1) {
      const firstClone = realSlides[0].cloneNode(true);
      const lastClone = realSlides[totalReal - 1].cloneNode(true);

      track.insertBefore(lastClone, realSlides[0]);
      track.appendChild(firstClone);

      let index = 1;
      let heroTimer = null;
      let isTransitioning = false;

      const computedTransition = window.getComputedStyle(track).transition;
      const TRANSITION_ON =
        computedTransition && computedTransition !== 'all 0s ease 0s'
          ? computedTransition
          : 'transform 600ms ease';

      function updateCaption() {
        const realIndex = ((index - 1 + totalReal) % totalReal);
        const item = heroCaptions[realIndex];
        if (captionTitle) captionTitle.textContent = item.title;
        if (captionSub) captionSub.textContent = item.sub;
      }

      function setTransform(i, animate) {
        track.style.transition = animate ? TRANSITION_ON : 'none';
        track.style.transform = 'translateX(-' + (i * 100) + '%)';
      }

      function goTo(i, animate = true) {
        index = i;
        isTransitioning = animate;
        setTransform(index, animate);
        updateCaption();
      }

      function nextSlide() {
        if (isTransitioning) return;
        goTo(index + 1, true);
      }

      function prevSlide() {
        if (isTransitioning) return;
        goTo(index - 1, true);
      }

      function startAuto() {
        stopAuto();
        heroTimer = setInterval(nextSlide, 6500);
      }

      function stopAuto() {
        if (heroTimer) {
          clearInterval(heroTimer);
          heroTimer = null;
        }
      }

      function normalizeHeroPosition() {
        if (index === totalReal + 1) {
          goTo(1, false);
        } else if (index === 0) {
          goTo(totalReal, false);
        } else {
          goTo(index, false);
        }

        track.offsetHeight;
        isTransitioning = false;
      }

      track.addEventListener('transitionend', function () {
        isTransitioning = false;

        if (index === totalReal + 1) {
          goTo(1, false);
        } else if (index === 0) {
          goTo(totalReal, false);
        }
      });

      goTo(1, false);
      startAuto();

      heroCarousel.addEventListener('mouseenter', stopAuto);
      heroCarousel.addEventListener('mouseleave', startAuto);

      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          stopAuto();
          nextSlide();
          startAuto();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          stopAuto();
          prevSlide();
          startAuto();
        });
      }

      function heroResume() {
        stopAuto();
        normalizeHeroPosition();
        startAuto();
      }

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          stopAuto();
        } else {
          setTimeout(heroResume, 150);
        }
      });

      window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
          setTimeout(heroResume, 150);
        }
      });

      window.addEventListener('focus', function () {
        setTimeout(heroResume, 150);
      });
    }
  }

  // SCROLL REVEAL
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealItems.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    revealItems.forEach(function (item) {
      io.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }
});