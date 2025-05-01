/**
 * Portfolio Website
 */

// Console Easter Egg
(function () {
  const titleStyles = [
    "color: #ff6b6b",
    "background: #1a1a1a",
    "padding: 12px 20px",
    "font-size: 18px",
    "font-weight: bold",
    "border-radius: 5px",
    "text-shadow: 0 1px 0 #000",
    "line-height: 1.5",
  ].join(";");

  console.log("%cMade with ❤️ by NexiLune", titleStyles);
})();

// Main namespace to avoid global scope pollution
const Portfolio = {
  // Configuration settings
  config: {
    particles: {
      baseCount: 100,
      connectionDistance: 150,
      speed: 0.2,
      mouseRadius: 180,
    },
    typing: {
      baseSpeed: 70,
      mistakeProbability: 0.03,
      phraseDelay: 1500,
    },
    loading: {
      duration: 2800,
      fadeOutTime: 800,
      staggerDelay: 120,
      elementDelay: 250,
      finalDelay: 600,
    },
    magnetic: {
      strength: 25,
      maxMovement: 15,
    },
    // DOM elements cache
    elements: {
      loadingScreen: null,
      container: null,
      nameText: null,
      typingContainer: null,
      subtitle: null,
      btnWrapper: null,
      heroElements: null,
    },
  },

  // Utility functions
  utils: {
    // Throttle function to limit execution frequency
    throttle(callback, delay = 15) {
      let isThrottled = false;

      return function (...args) {
        if (isThrottled) return;

        isThrottled = true;
        callback.apply(this, args);

        setTimeout(() => {
          isThrottled = false;
        }, delay);
      };
    },

    // Device detection
    isTouchDevice: () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    },

    // Check if device is low-end
    isLowEndDevice: () => {
      return (
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        Portfolio.utils.isTouchDevice() ||
        window.innerWidth < 768
      );
    },
  },

  // Initialization function
  init() {
    // Cache DOM elements
    this.cacheDOMElements();

    // Wait for page to load
    window.addEventListener("load", function () {
      // Add transition class
      document.body.classList.add("transition-active");

      // Start with critical elements
      Portfolio.effects.particles.init();
      Portfolio.effects.binaryLoading.init();

      // Setup transition
      Portfolio.setupEnhancedTransition();

      // Initialize UI effects based on device
      if (!Portfolio.utils.isTouchDevice()) {
        Portfolio.effects.cursor.init();
        Portfolio.effects.magnetic.init();
        Portfolio.effects.textDistortion.init();
      }

      // Initialize functionality
      Portfolio.functionality.cryptoDonate.init();
    });
  },

  // Cache DOM elements
  cacheDOMElements() {
    const elements = this.config.elements;
    elements.loadingScreen = document.querySelector(".loading");
    elements.container = document.querySelector(".container");
    elements.nameText = document.querySelector(".name-text");
    elements.typingContainer = document.querySelector(".typing-container");
    elements.subtitle = document.getElementById("subtitle");
    elements.btnWrapper = document.querySelector(".btn-wrapper");

    // Get hero elements
    elements.heroElements = [
      elements.typingContainer,
      elements.subtitle,
      elements.btnWrapper,
    ].filter((el) => el !== null);
  },

  // Enhanced transition
  setupEnhancedTransition() {
    const elements = this.config.elements;

    // Prepare elements for animation
    this.prepareElementsForAnimation();

    // Start transition sequence
    setTimeout(() => {
      // Phase 1: Loading screen exit animation
      this.animateLoadingScreenExit();

      // Phase 2: Reveal main content
      setTimeout(() => {
        this.revealMainContentWithEffects();
      }, this.config.loading.fadeOutTime * 0.8);
    }, this.config.loading.duration);
  },

  // Prepare elements for animation
  prepareElementsForAnimation() {
    const elements = this.config.elements;

    // Reset container
    if (elements.container) {
      elements.container.style.opacity = "0";
      elements.container.style.visibility = "visible";
    }

    // Prepare name text
    if (elements.nameText) {
      elements.nameText.style.opacity = "0";
      elements.nameText.style.transform = "translateY(40px) rotateX(10deg)";
      elements.nameText.style.filter = "blur(10px)";
      elements.nameText.style.transition =
        "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
    }

    // Prepare other elements
    elements.heroElements.forEach((element) => {
      if (!element) return;

      // Reset animations
      element.style.animation = "none";
      element.style.opacity = "0";

      // Set initial states
      if (element === elements.typingContainer) {
        element.style.transform = "translateX(30px)";
        element.style.filter = "blur(5px)";
      } else if (element === elements.subtitle) {
        element.style.transform = "translateY(20px) scale(0.95)";
        element.style.filter = "blur(4px)";
      } else if (element === elements.btnWrapper) {
        element.style.transform = "translateY(30px) scale(0.9)";
      }

      // Clear transitions
      element.style.transition = "none";
    });
  },

  // Loading screen exit animation
  animateLoadingScreenExit() {
    const elements = this.config.elements;

    if (elements.loadingScreen) {
      // Add exit class
      elements.loadingScreen.classList.add("dramatic-exit");

      // Apply exit transition
      elements.loadingScreen.style.opacity = "0";
      elements.loadingScreen.style.transform = "scale(1.05)";
      elements.loadingScreen.style.filter = "blur(10px)";

      // Accelerate particles during transition
      if (
        Portfolio.effects.particles &&
        Portfolio.effects.particles.particles
      ) {
        const originalSpeed = Portfolio.effects.particles.particleSpeed;
        Portfolio.effects.particles.particleSpeed *= 2;

        // Restore original speed after transition
        setTimeout(() => {
          Portfolio.effects.particles.particleSpeed = originalSpeed;
        }, this.config.loading.fadeOutTime + 1000);
      }
    }
  },

  // Reveal main content
  revealMainContentWithEffects() {
    const elements = this.config.elements;

    // Hide loading screen
    if (elements.loadingScreen) {
      elements.loadingScreen.style.visibility = "hidden";
    }

    // Fade in container
    if (elements.container) {
      elements.container.style.opacity = "1";
      elements.container.style.transform = "scale(1)";
      elements.container.style.transition =
        "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)";
    }

    // Name text reveal
    if (elements.nameText) {
      setTimeout(() => {
        elements.nameText.style.opacity = "1";
        elements.nameText.style.transform = "translateY(0) rotateX(0)";
        elements.nameText.style.filter = "blur(0)";
        elements.nameText.classList.add("revealed");

        // Initialize text distortion
        if (!Portfolio.utils.isTouchDevice()) {
          Portfolio.effects.textDistortion.init();
        }
      }, 100);
    }

    // Animate hero elements
    elements.heroElements.forEach((element, index) => {
      if (!element) return;

      // Custom transitions for each element
      if (element === elements.typingContainer) {
        element.style.transition =
          "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateX(0)";
          element.style.filter = "blur(0)";

          // Start typing animation
          setTimeout(() => Portfolio.effects.typewriter.init(), 300);
        }, 400 + index * this.config.loading.staggerDelay);
      } else if (element === elements.subtitle) {
        element.style.transition =
          "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), filter 1.1s cubic-bezier(0.16, 1, 0.3, 1)";
        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0) scale(1)";
          element.style.filter = "blur(0)";

          // Initialize subtitle animation
          setTimeout(() => Portfolio.effects.subtitle.init(), 300);
        }, 700 + index * this.config.loading.staggerDelay);
      } else if (element === elements.btnWrapper) {
        element.style.transition =
          "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0) scale(1)";
        }, 1000 + index * this.config.loading.staggerDelay);
      }
    });

    // Apply particle reveal effect
    this.applyParticleRevealEffect();

    // Enable scrolling after animations
    setTimeout(() => {
      document.body.classList.remove("loading-active");
      document.body.classList.remove("transition-active");
    }, this.config.loading.finalDelay + 1500);
  },

  // Particle effect during reveal
  applyParticleRevealEffect() {
    if (!Portfolio.effects.particles || !Portfolio.effects.particles.particles)
      return;

    Portfolio.effects.particles.particles.forEach((particle, index) => {
      const originalSize = particle.size;
      const originalAlpha = particle.alpha;

      setTimeout(() => {
        particle.size *= 1.8;
        particle.alpha = Math.min(1, particle.alpha * 2);

        setTimeout(() => {
          particle.size = originalSize;
          particle.alpha = originalAlpha;
        }, 800);
      }, (index % 10) * 30);
    });
  },

  // Legacy transition method
  setupLoadingTransition() {
    this.setupEnhancedTransition();
  },

  // Visual and interactive effects
  effects: {
    // Cursor effect
    cursor: {
      mouseX: 0,
      mouseY: 0,
      dotX: 0,
      dotY: 0,

      init() {
        const cursorDot = document.querySelector(".cursor-dot");
        const coordinatesDisplay = document.querySelector(
          ".cursor-coordinates"
        );

        if (!cursorDot || !coordinatesDisplay) return;

        // Track mouse position
        document.addEventListener(
          "mousemove",
          Portfolio.utils.throttle((e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            // Update coordinates
            coordinatesDisplay.textContent = `X: ${Math.round(
              this.mouseX
            )} | Y: ${Math.round(this.mouseY)}`;
          }, 30)
        );

        // Animation loop
        const animateCursor = () => {
          if (!cursorDot) return;

          const easingDot = 0.2;

          this.dotX += (this.mouseX - this.dotX) * easingDot;
          this.dotY += (this.mouseY - this.dotY) * easingDot;

          cursorDot.style.left = this.dotX + "px";
          cursorDot.style.top = this.dotY + "px";

          requestAnimationFrame(animateCursor);
        };

        animateCursor();
        this.setupInteractions(cursorDot);
      },

      setupInteractions(cursorDot) {
        // Interactive elements
        const interactiveElements = document.querySelectorAll(
          "a, button, .magnetic-btn, .name-text"
        );

        // Hover states
        interactiveElements.forEach((el) => {
          el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover-link");
          });

          el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover-link");
          });
        });

        // Click effect
        document.addEventListener("mousedown", () => {
          document.body.classList.add("cursor-clicked");
        });

        document.addEventListener("mouseup", () => {
          document.body.classList.remove("cursor-clicked");
        });

        // Window events
        document.addEventListener("mouseleave", () => {
          if (cursorDot) cursorDot.style.opacity = "0";
        });

        document.addEventListener("mouseenter", () => {
          if (cursorDot) cursorDot.style.opacity = "0.8";
        });

        // Link hover effects
        const links = document.querySelectorAll("a");
        links.forEach((link) => {
          link.addEventListener("mouseenter", function () {
            if (cursorDot)
              cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
          });

          link.addEventListener("mouseleave", function () {
            if (cursorDot)
              cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
          });
        });
      },
    },

    // Magnetic button effect
    magnetic: {
      init() {
        const magneticBtns = document.querySelectorAll(".magnetic-btn");

        magneticBtns.forEach((btn) => {
          // Mouse movement
          btn.addEventListener(
            "mousemove",
            Portfolio.utils.throttle(function (e) {
              const btnRect = this.getBoundingClientRect();
              const btnX = e.clientX - btnRect.left;
              const btnY = e.clientY - btnRect.top;

              const strength = Portfolio.config.magnetic.strength;
              const maxMove = Portfolio.config.magnetic.maxMovement;

              const rawDeltaX = (btnRect.width / 2 - btnX) / strength;
              const rawDeltaY = (btnRect.height / 2 - btnY) / strength;

              const deltaX = Math.max(Math.min(rawDeltaX, maxMove), -maxMove);
              const deltaY = Math.max(Math.min(rawDeltaY, maxMove), -maxMove);

              this.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

              // Cursor effect
              const cursorDot = document.querySelector(".cursor-dot");
              if (cursorDot)
                cursorDot.style.transform = `translate(-50%, -50%) scale(1.3)`;
            })
          );

          // Reset on mouse leave
          btn.addEventListener("mouseleave", function () {
            this.style.transform = "translate(0, 0)";
            const cursorDot = document.querySelector(".cursor-dot");
            if (cursorDot) cursorDot.style.transform = "translate(-50%, -50%)";
          });

          // Ripple effect on click
          btn.addEventListener("mousedown", function (e) {
            Portfolio.effects.magnetic.createRipple(this, e);
          });
        });
      },

      // Create ripple effect
      createRipple(button, event) {
        const btnRect = button.getBoundingClientRect();
        const x = event.clientX - btnRect.left;
        const y = event.clientY - btnRect.top;

        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      },
    },

    // Text distortion effect
    textDistortion: {
      init() {
        const distortText = document.querySelector(".distort-text");
        const nameText = document.querySelector(".name-text");
        if (!distortText) return;

        // Add glow effect
        if (nameText) {
          nameText.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.6)";
        }

        // Start continuous animation
        this.startContinuousAnimation(distortText);

        // Mouse movement handler
        distortText.addEventListener(
          "mousemove",
          Portfolio.utils.throttle(function (e) {
            const textRect = this.getBoundingClientRect();
            const textX = e.clientX - textRect.left;
            const textY = e.clientY - textRect.top;

            const centerX = textRect.width / 2;
            const centerY = textRect.height / 2;

            const deltaX = (textX - centerX) / centerX;
            const deltaY = (textY - centerY) / centerY;

            this.style.transform = `perspective(1000px) rotateX(${
              deltaY * 5
            }deg) rotateY(${-deltaX * 5}deg)`;

            // Enhanced glow on hover
            if (nameText) {
              nameText.style.textShadow = "0 0 15px rgba(255, 255, 255, 0.8)";
            }
          })
        );

        distortText.addEventListener("mouseleave", function () {
          if (nameText) {
            nameText.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.6)";
          }
        });
      },

      // Continuous animation
      startContinuousAnimation(element) {
        let time = 0;
        const speed = 0.0015;
        const maxRotation = 2;

        // Animation loop
        const animate = () => {
          time += speed;

          // Only apply when not hovered
          if (!element.matches(":hover")) {
            const rotateX = Math.sin(time) * maxRotation;
            const rotateY = Math.cos(time * 1.3) * maxRotation;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          }

          requestAnimationFrame(animate);
        };

        animate();
      },
    },

    // Typing text effect
    typewriter: {
      phrases: [
        "Developer & Digital Creator",
        "Frontend Engineer",
        "UI/UX Enthusiast",
      ],
      phraseIndex: 0,
      charIndex: 0,
      isDeleting: false,
      typingSpeed: 0,

      init() {
        const typingText = document.querySelector(".typing-text");
        const typingContainer = document.querySelector(".typing-container");
        if (!typingText) return;

        // Pre-calculate text width
        this.preCalculateWidth(typingText, typingContainer);

        // Initialize typing speed
        this.typingSpeed = Portfolio.config.typing.baseSpeed;

        // Start typing
        setTimeout(() => this.typeAnimation(typingText), 1000);
      },

      preCalculateWidth(typingText, typingContainer) {
        let maxWidth = 0;
        const tempSpan = document.createElement("span");
        tempSpan.style.visibility = "hidden";
        tempSpan.style.position = "absolute";
        tempSpan.style.fontSize = window.getComputedStyle(typingText).fontSize;
        tempSpan.style.fontFamily =
          window.getComputedStyle(typingText).fontFamily;
        document.body.appendChild(tempSpan);

        this.phrases.forEach((phrase) => {
          tempSpan.textContent = phrase;
          const width = tempSpan.offsetWidth;
          if (width > maxWidth) maxWidth = width;
        });
        document.body.removeChild(tempSpan);

        // Apply max width to container
        if (typingContainer) {
          typingContainer.style.width = `${maxWidth + 20}px`;
        }
      },

      typeAnimation(typingText) {
        const currentPhrase = this.phrases[this.phraseIndex];
        const baseSpeed = Portfolio.config.typing.baseSpeed;

        if (this.isDeleting) {
          // Deleting is faster than typing
          this.typingSpeed = baseSpeed * 0.4;
          typingText.textContent = currentPhrase.substring(
            0,
            this.charIndex - 1
          );
          this.charIndex--;

          // Correcting a mistake
          if (
            this.isCorrectingMistake &&
            this.charIndex === this.mistakePosition
          ) {
            this.isDeleting = false;
            this.isCorrectingMistake = false;
            this.typingSpeed = baseSpeed * 1.5;
          }
        } else {
          // Typing with variable speed
          const randomFactor = 0.8 + Math.random() * 0.7;
          this.typingSpeed = baseSpeed * randomFactor;

          // Simulate occasional typing mistakes
          if (
            Math.random() < Portfolio.config.typing.mistakeProbability &&
            this.charIndex < currentPhrase.length - 2 &&
            this.charIndex > 1 &&
            !this.isCorrectingMistake
          ) {
            this.mistakePosition = this.charIndex;

            const correctChar = currentPhrase.charAt(this.charIndex);

            // Choose a wrong character
            let wrongChar;
            const keyboardRows = {
              a: "qwsz",
              b: "vghn",
              c: "xdfv",
              d: "serfcx",
              e: "wrsdf",
              f: "drtgvc",
              g: "ftyhbv",
              h: "gyujnb",
              i: "ujko",
              j: "huikmn",
              k: "jiolm",
              l: "kop",
              m: "njk",
              n: "bhjm",
              o: "iklp",
              p: "ol",
              q: "wa",
              r: "edft",
              s: "awedxz",
              t: "rfgy",
              u: "yhji",
              v: "cfgb",
              w: "qase",
              x: "zsdc",
              y: "tghu",
              z: "asx",
              A: "QWS",
              B: "VGH",
              C: "XDF",
              D: "SERF",
              E: "WRSD",
              F: "DRTG",
              G: "FTYH",
              H: "GYUJ",
              I: "UJK",
              J: "HUIK",
              K: "JIOL",
              L: "KOP",
              M: "NJK",
              N: "BHJ",
              O: "IKL",
              P: "OL",
              Q: "WA",
              R: "EDF",
              S: "AWEZ",
              T: "RFG",
              U: "YHJ",
              V: "CFG",
              W: "QAS",
              X: "ZSD",
              Y: "TGH",
              Z: "ASX",
              " ": "nm,",
            };

            if (keyboardRows[correctChar]) {
              const nearbyChars = keyboardRows[correctChar];
              wrongChar = nearbyChars.charAt(
                Math.floor(Math.random() * nearbyChars.length)
              );
            } else {
              const randomChars =
                "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
              do {
                wrongChar = randomChars.charAt(
                  Math.floor(Math.random() * randomChars.length)
                );
              } while (wrongChar === correctChar);
            }

            // Type wrong character
            typingText.textContent =
              currentPhrase.substring(0, this.charIndex) + wrongChar;
            this.charIndex++;

            // Set up correction
            this.isCorrectingMistake = true;
            this.typingSpeed = baseSpeed * 3;
            setTimeout(() => {
              this.isDeleting = true;
            }, this.typingSpeed);

            return setTimeout(
              () => this.typeAnimation(typingText),
              this.typingSpeed
            );
          }

          // Normal typing
          typingText.textContent = currentPhrase.substring(
            0,
            this.charIndex + 1
          );
          this.charIndex++;
        }

        // Phrase completion logic
        if (!this.isDeleting && this.charIndex === currentPhrase.length) {
          // Pause at end of phrase
          this.typingSpeed = Portfolio.config.typing.phraseDelay;
          setTimeout(() => {
            this.isDeleting = true;
          }, this.typingSpeed);
        } else if (this.isDeleting && this.charIndex === 0) {
          // Move to next phrase
          this.isDeleting = false;
          this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
          this.typingSpeed = baseSpeed * 5;
        }

        // Pause at word boundaries
        if (!this.isDeleting && currentPhrase.charAt(this.charIndex) === " ") {
          this.typingSpeed += baseSpeed;
        }

        // Continue animation
        setTimeout(() => this.typeAnimation(typingText), this.typingSpeed);
      },
    },

    // Subtitle animation
    subtitle: {
      init() {
        const subtitle = document.getElementById("subtitle");
        if (!subtitle) return;

        const words = subtitle.textContent.split(" ");
        subtitle.innerHTML = "";

        words.forEach((word, index) => {
          const span = document.createElement("span");
          span.className = "highlight-word";
          span.textContent = word + " ";
          subtitle.appendChild(span);
        });
      },
    },

    // Binary loading animation
    binaryLoading: {
      // Letter patterns (1 = filled dot, 0 = empty)
      patterns: {
        n: [
          1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0,
          0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
        ],
        i: [
          0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
          0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0,
        ],
        m: [
          1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0,
          0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
        ],
        a: [
          0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
          0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
        ],
      },

      init() {
        this.createLetterPatterns();
        this.showInitText();
        this.animateDots();
      },

      createLetterPatterns() {
        const letters = ["n", "i", "m", "a"];
        letters.forEach((letter) => {
          const letterEl = document.getElementById(`letter-${letter}`);
          if (!letterEl) return;

          // Clear existing content
          letterEl.innerHTML = "";

          // Create dots based on pattern
          this.patterns[letter].forEach((value, index) => {
            const dot = document.createElement("div");
            dot.className = "binary-dot";
            dot.dataset.active = value === 1 ? "true" : "false";
            letterEl.appendChild(dot);
          });
        });
      },

      showInitText() {
        const binaryCodeLine = document.querySelector(".binary-code-line");
        if (binaryCodeLine) {
          binaryCodeLine.style.opacity = "1";
          binaryCodeLine.style.animation = "none";
        }
      },

      animateDots() {
        const allLetters = document.querySelectorAll(".binary-letter");
        allLetters.forEach((letterEl, letterIndex) => {
          const dots = letterEl.querySelectorAll(".binary-dot");
          if (!dots.length) return;

          // Randomize activation sequence
          const randomDots = [...dots].sort(() => Math.random() - 0.5);

          // Apply sequential animation
          randomDots.forEach((dot, dotIndex) => {
            setTimeout(() => {
              dot.classList.add("flicker");

              setTimeout(() => {
                dot.classList.remove("flicker");
                // Set final state based on pattern
                if (dot.dataset.active === "true") {
                  dot.classList.add("active");
                }
              }, 400 + Math.random() * 600);
            }, 100 + dotIndex * 30 + letterIndex * 120);
          });
        });
      },
    },

    // Particle background
    particles: {
      canvas: null,
      ctx: null,
      particles: [],
      mouseX: null,
      mouseY: null,
      lastTimestamp: 0,

      init() {
        this.canvas = document.getElementById("particle-background");
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");
        this.setupCanvas();
        this.initializeParticles();
        this.setupMouseTracking();

        // Start animation
        requestAnimationFrame(this.animate.bind(this));
      },

      setupCanvas() {
        // Set canvas size
        const resizeCanvas = () => {
          this.canvas.width = window.innerWidth;
          this.canvas.height = window.innerHeight;
        };

        // Initial sizing and resize listener
        resizeCanvas();
        window.addEventListener(
          "resize",
          Portfolio.utils.throttle(resizeCanvas, 100)
        );
      },

      initializeParticles() {
        // Clear existing particles
        this.particles = [];

        // Adaptive settings based on device
        const isLowEnd = Portfolio.utils.isLowEndDevice();

        const particleCount = isLowEnd
          ? Math.min(window.innerWidth / 20, 50)
          : Math.min(
              window.innerWidth / 12,
              Portfolio.config.particles.baseCount
            );

        this.connectionDistance = isLowEnd
          ? 120
          : Portfolio.config.particles.connectionDistance;

        this.particleSpeed = isLowEnd ? 0.1 : Portfolio.config.particles.speed;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
          this.particles.push(new this.Particle());
        }
      },

      // Particle definition
      Particle: function () {
        this.x = Math.random() * Portfolio.effects.particles.canvas.width;
        this.y = Math.random() * Portfolio.effects.particles.canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX =
          (Math.random() - 0.5) * Portfolio.effects.particles.particleSpeed;
        this.speedY =
          (Math.random() - 0.5) * Portfolio.effects.particles.particleSpeed;
        this.alpha = Math.random() * 0.5 + 0.2;

        // Update particle
        this.update = function () {
          // Move particle
          this.x += this.speedX;
          this.y += this.speedY;

          // Bounce off edges
          if (this.x < 0 || this.x > Portfolio.effects.particles.canvas.width) {
            this.speedX *= -1;
          }

          if (
            this.y < 0 ||
            this.y > Portfolio.effects.particles.canvas.height
          ) {
            this.speedY *= -1;
          }

          // Mouse interaction
          if (
            Portfolio.effects.particles.mouseX &&
            Portfolio.effects.particles.mouseY
          ) {
            const dx = Portfolio.effects.particles.mouseX - this.x;
            const dy = Portfolio.effects.particles.mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < Portfolio.config.particles.mouseRadius) {
              const force =
                (Portfolio.config.particles.mouseRadius - distance) /
                Portfolio.config.particles.mouseRadius;
              const directionX = dx / distance || 0;
              const directionY = dy / distance || 0;

              // Apply repulsion
              this.x -= directionX * force * 1.5;
              this.y -= directionY * force * 1.5;
            }
          }
        };

        // Draw particle
        this.draw = function () {
          Portfolio.effects.particles.ctx.beginPath();
          Portfolio.effects.particles.ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
          );
          Portfolio.effects.particles.ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
          Portfolio.effects.particles.ctx.fill();
        };
      },

      setupMouseTracking() {
        // Only track mouse on non-touch devices
        if (!Portfolio.utils.isTouchDevice()) {
          window.addEventListener(
            "mousemove",
            Portfolio.utils.throttle((e) => {
              this.mouseX = e.clientX;
              this.mouseY = e.clientY;
            })
          );

          window.addEventListener("mouseleave", () => {
            this.mouseX = null;
            this.mouseY = null;
          });
        }
      },

      // Draw connections between particles
      connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const dx = this.particles[i].x - this.particles[j].x;
            const dy = this.particles[i].y - this.particles[j].y;

            // Fast distance check
            const squareDistance = dx * dx + dy * dy;
            const squareConnectionDistance =
              this.connectionDistance * this.connectionDistance;

            if (squareDistance < squareConnectionDistance) {
              const distance = Math.sqrt(squareDistance);
              const opacity = 1 - distance / this.connectionDistance;

              this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
              this.ctx.lineWidth = 0.5;

              this.ctx.beginPath();
              this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
              this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
              this.ctx.stroke();
            }
          }
        }
      },

      // Animation loop with frame rate control
      animate(timestamp) {
        // Calculate elapsed time
        const isLowEnd = Portfolio.utils.isLowEndDevice();
        const targetFPS = isLowEnd ? 30 : 60;
        const frameInterval = 1000 / targetFPS;
        const elapsed = timestamp - this.lastTimestamp;

        // Only render if enough time has passed
        if (elapsed > frameInterval || this.lastTimestamp === 0) {
          this.lastTimestamp = timestamp - (elapsed % frameInterval);

          // Clear and redraw
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

          // Update and draw particles
          for (const particle of this.particles) {
            particle.update();
            particle.draw();
          }

          // Connect particles
          this.connectParticles();
        }

        // Continue animation
        requestAnimationFrame(this.animate.bind(this));
      },
    },
  },

  // Functional elements
  functionality: {
    // Cryptocurrency donation
    cryptoDonate: {
      init() {
        // Add copy functionality for donate buttons
        const donateButtons = document.querySelectorAll(".eth-donate-btn");
        donateButtons.forEach((btn) => {
          btn.addEventListener("click", this.copyAddressToClipboard);
        });
      },

      copyAddressToClipboard(event) {
        event.preventDefault();

        // Get wallet address
        const address = event.currentTarget.getAttribute("data-address");

        // Copy to clipboard
        navigator.clipboard
          .writeText(address)
          .then(() => {
            // Show notification
            const notification = document.getElementById("copyNotification");
            notification.classList.add("show");

            // Hide notification after delay
            setTimeout(() => {
              notification.classList.remove("show");
            }, 3000);
          })
          .catch((err) => {
            console.error("Failed to copy address: ", err);
            alert("Failed to copy cryptocurrency address. Please try again.");
          });

        // Add visual feedback
        Portfolio.effects.magnetic.createRipple(event.currentTarget, event);
      },
    },
  },
};

// Initialize the portfolio
Portfolio.init();
