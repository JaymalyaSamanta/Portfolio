// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initCursor();
    initScrollAnimation();
    initMobileMenu();
    initSkillsAnimation();
    initFormAnimation();
    initSmoothScroll();
    initParallaxEffect();
    initPricingToggle();
    initContactPopup();
    initContactForm();
    initNavigationHighlight();
});

// Loader Animation
function initLoader() {
    const loader = document.querySelector('.loader');
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            document.body.style.overflow = '';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// Enhanced Typing Effect
function initTypingEffect() {
    const text = "Jaymalya Samanta";
    const typingText = document.getElementById('typing-text');
    let i = 0;

    function type() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (i > 0) {
            typingText.textContent = text.substring(0, i-1);
            i--;
            setTimeout(erase, 50);
        } else {
            setTimeout(type, 1000);
        }
    }

    setTimeout(type, 1000);
}

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor-small');
    const cursorGlow = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-category, .social-link');
    interactiveElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorGlow.style.transform = 'scale(2)';
        });
        
        elem.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorGlow.style.transform = 'scale(1)';
        });
    });
}

// Remove old scroll functions
function initScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

// Enhanced navigation highlighting
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',  // Considers section in view when it's in the middle of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Handle clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Skills Animation
function initSkillsAnimation() {
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillLists = document.querySelectorAll('.skills-list');
    
    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            const targetCategory = category.getAttribute('data-category');
            
            // Update active category
            skillCategories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');
            
            // Show corresponding skills
            skillLists.forEach(list => {
                list.style.display = 'none';
                list.style.opacity = '0';
                
                if (list.id === `${targetCategory}-skills`) {
                    list.style.display = 'block';
                    setTimeout(() => {
                        list.style.opacity = '1';
                    }, 50);
                }
            });
        });
    });
}

// Form Animation
function initFormAnimation() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00ffee)';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax Effect
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    const orbital = document.querySelector('.orbital-animation');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (orbital) {
            orbital.style.transform = `translateY(${scrolled * 0.4}px) rotate(${scrolled * 0.1}deg)`;
        }
    });

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        if (orbital) {
            orbital.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Toggle body scroll
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Prevent menu from closing when clicking inside nav
    nav.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Reset menu state on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Pricing Currency Toggle
function initPricingToggle() {
    const toggle = document.getElementById('currencyToggle');
    const cards = document.querySelectorAll('.pricing-card');
    const inrLabel = document.querySelector('.currency-label.inr');
    const usdLabel = document.querySelector('.currency-label.usd');

    function updatePrices(isUSD) {
        cards.forEach(card => {
            const priceElement = card.querySelector('.price');
            const currencyElement = priceElement.querySelector('.currency');
            const amountElement = priceElement.querySelector('.amount');
            
            const inrPrice = card.getAttribute('data-price-inr');
            const usdPrice = card.getAttribute('data-price-usd');

            // Animate price change
            priceElement.style.transform = 'translateY(-20px)';
            priceElement.style.opacity = '0';
            
            setTimeout(() => {
                if (isUSD) {
                    currencyElement.textContent = '$';
                    amountElement.textContent = usdPrice;
                    inrLabel.classList.remove('active');
                    usdLabel.classList.add('active');
                } else {
                    currencyElement.textContent = '₹';
                    amountElement.textContent = inrPrice;
                    inrLabel.classList.add('active');
                    usdLabel.classList.remove('active');
                }
                
                priceElement.style.transform = 'translateY(0)';
                priceElement.style.opacity = '1';
            }, 200);
        });
    }

    toggle.addEventListener('change', (e) => {
        updatePrices(e.target.checked);
    });

    // Initialize prices
    updatePrices(false);
}

// Contact Popup
function showContactPopup() {
    const popup = document.getElementById('contactPopup');
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function initContactPopup() {
    const popup = document.getElementById('contactPopup');
    const closeBtn = popup.querySelector('.close-popup');
    const contactBtn = popup.querySelector('.contact-now-btn');

    // Close popup when clicking the close button
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Handle contact button click
    contactBtn.addEventListener('click', () => {
        popup.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            popup.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const plan = document.getElementById('plan').value;
    const message = document.getElementById('message').value;

    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        selected_plan: plan,
        message: message,
        to_name: 'Jaymalya',
        to_email: 'jaymalya.coder@gmail.com'
    };

    // Send email using EmailJS
    emailjs.send('service_u0q31ek', 'template_7xn7d4a', templateParams)
        .then(function() {
            // Show success notification
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            // Show error notification
            showNotification('Failed to send message. Please try again.', 'error');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            console.error('EmailJS Error:', error);
        });
});

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    const text = document.createElement('p');
    text.textContent = message;
    
    content.appendChild(icon);
    content.appendChild(text);
    notification.appendChild(content);
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Testimonials Animation
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150); // Staggered animation
            }
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));
}

function initSkillCards() {
    const cards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

class UltraSmootherPreloader {
    constructor() {
        this.init();
        this.loadingSteps = [
            { text: 'Initializing Core Systems', duration: 1.5 },
            { text: 'Configuring Neural Interface', duration: 1.5 },
            { text: 'Loading Quantum Assets', duration: 1.5 },
            { text: 'Optimizing Render Pipeline', duration: 1.5 },
            { text: 'Finalizing Calibration', duration: 1 }
        ];
        this.currentStep = 0;
        this.particles = [];
        this.morphTargets = [];
    }

    async init() {
        await this.loadDependencies();
        this.setupScene();
        this.createMorphingGeometry();
        this.createAdvancedParticles();
        this.setupPostProcessing();
        this.addDynamicLights();
        this.animate();
        this.initSmoothLoading();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('preloader-canvas'),
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 5;
        
        // Enable smooth camera movement
        this.cameraTarget = new THREE.Vector3(0, 0, 0);
        this.cameraPosition = new THREE.Vector3(5, 5, 5);
    }

    createMorphingGeometry() {
        // Create multiple geometric shapes for morphing
        const shapes = [
            new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
            new THREE.IcosahedronGeometry(1, 2),
            new THREE.OctahedronGeometry(1, 2)
        ];

        const material = new THREE.MeshPhysicalMaterial({
            color: 0x00ff8c,
            metalness: 0.9,
            roughness: 0.1,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });

        this.morphMesh = new THREE.Mesh(shapes[0], material);
        this.scene.add(this.morphMesh);

        // Store vertices for morphing
        this.morphTargets = shapes.map(shape => {
            return shape.attributes.position.array;
        });
    }

    createAdvancedParticles() {
        const particleCount = 5000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount * 3; i += 3) {
            const radius = 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);

            const color = new THREE.Color();
            color.setHSL(Math.random(), 0.8, 0.6);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;

            sizes[i / 3] = Math.random() * 2;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    gl_FragColor = vec4(vColor, 1.0 - (dist * 2.0));
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particleSystem = new THREE.Points(geometry, particleMaterial);
        this.scene.add(this.particleSystem);
    }

    setupPostProcessing() {
        this.composer = new THREE.EffectComposer(this.renderer);
        
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        const bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5, 0.4, 0.85
        );
        this.composer.addPass(bloomPass);
    }

    addDynamicLights() {
        this.lights = [];
        const colors = [0x00ff8c, 0x00a1ff, 0xff00ff];

        colors.forEach((color, i) => {
            const light = new THREE.PointLight(color, 2);
            light.position.set(
                Math.cos(i * Math.PI * 2 / 3) * 3,
                Math.sin(i * Math.PI * 2 / 3) * 3,
                2
            );
            this.lights.push(light);
            this.scene.add(light);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = performance.now() * 0.001;

        // Smooth camera movement
        this.camera.position.lerp(this.cameraPosition, 0.05);
        this.camera.lookAt(this.cameraTarget);

        // Animate morphing geometry
        if (this.morphMesh) {
            const morphProgress = (Math.sin(time * 0.5) + 1) / 2;
            const currentIndex = Math.floor(time % this.morphTargets.length);
            const nextIndex = (currentIndex + 1) % this.morphTargets.length;
            
            const positions = this.morphMesh.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i++) {
                positions[i] = this.morphTargets[currentIndex][i] * (1 - morphProgress) +
                             this.morphTargets[nextIndex][i] * morphProgress;
            }
            this.morphMesh.geometry.attributes.position.needsUpdate = true;
            
            this.morphMesh.rotation.x = time * 0.2;
            this.morphMesh.rotation.y = time * 0.3;
        }

        // Animate particles
        if (this.particleSystem) {
            const positions = this.particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + positions[i]) * 0.002;
                positions[i] += Math.cos(time + positions[i + 1]) * 0.002;
            }
            this.particleSystem.geometry.attributes.position.needsUpdate = true;
            this.particleSystem.rotation.y = time * 0.05;
        }

        // Animate lights
        this.lights.forEach((light, i) => {
            light.position.x = Math.cos(time + i * Math.PI * 2 / 3) * 3;
            light.position.y = Math.sin(time + i * Math.PI * 2 / 3) * 3;
        });

        this.composer.render();
    }

    initSmoothLoading() {
        gsap.to({}, {
            duration: 7,
            ease: "power1.inOut",
            onUpdate: () => this.updateLoadingProgress(),
            onComplete: () => this.completeLoading()
        });
    }

    updateLoadingProgress() {
        const progress = gsap.getProperty(this, "progress") || 0;
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-percentage');
        
        if (progressFill && progressText) {
            gsap.to(progressFill, {
                width: `${progress}%`,
                duration: 0.3,
                ease: "power2.out"
            });
            
            progressText.textContent = `${Math.round(progress)}%`;
        }
    }

    completeLoading() {
        gsap.to('#preloader', {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                document.getElementById('preloader').remove();
                document.documentElement.style.overflow = 'auto';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

class DNAPreloader {
    constructor() {
        this.init();
        this.progress = 0;
    }

    async init() {
        await this.loadDependencies();
        this.setupScene();
        this.createDNA();
        this.addLights();
        this.animate();
        this.simulateLoading();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('preloader-canvas'),
            antialias: true,
            alpha: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 20;
        this.camera.position.y = 5;
        
        // Add orbital controls for smooth camera movement
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 2;
    }

    createDNA() {
        this.dnaGroup = new THREE.Group();
        
        // DNA Parameters
        const turns = 4;
        const pointsPerTurn = 40;
        const height = 20;
        const radius = 4;
        const sphereRadius = 0.3;
        const connectionWidth = 0.1;

        // Create the helixes
        for (let i = 0; i < 2; i++) {
            const points = [];
            const offset = (i * Math.PI); // Offset for second helix
            
            for (let j = 0; j <= turns * pointsPerTurn; j++) {
                const angle = (j / pointsPerTurn) * Math.PI * 2;
                const y = (j / (turns * pointsPerTurn)) * height - height/2;
                const x = Math.cos(angle + offset) * radius;
                const z = Math.sin(angle + offset) * radius;
                points.push(new THREE.Vector3(x, y, z));
            }

            // Create spheres along the helix
            points.forEach(point => {
                const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 8, 8);
                const sphereMaterial = new THREE.MeshPhongMaterial({
                    color: i === 0 ? 0x00ff8c : 0x00a1ff,
                    shininess: 100,
                    specular: 0x444444
                });
                const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                sphere.position.copy(point);
                this.dnaGroup.add(sphere);
            });
        }

        // Create connections between helixes
        for (let i = 0; i <= turns * pointsPerTurn; i += 2) {
            const angle1 = (i / pointsPerTurn) * Math.PI * 2;
            const angle2 = angle1 + Math.PI;
            const y = (i / (turns * pointsPerTurn)) * height - height/2;
            
            const point1 = new THREE.Vector3(
                Math.cos(angle1) * radius,
                y,
                Math.sin(angle1) * radius
            );
            
            const point2 = new THREE.Vector3(
                Math.cos(angle2) * radius,
                y,
                Math.sin(angle2) * radius
            );

            const connectionGeometry = new THREE.CylinderGeometry(
                connectionWidth,
                connectionWidth,
                point1.distanceTo(point2),
                8,
                1
            );
            
            const connectionMaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.7,
                shininess: 100
            });
            
            const connection = new THREE.Mesh(connectionGeometry, connectionMaterial);
            
            // Position and rotate the connection
            connection.position.copy(point1);
            connection.position.lerp(point2, 0.5);
            connection.lookAt(point2);
            connection.rotateX(Math.PI / 2);
            
            this.dnaGroup.add(connection);
        }

        // Add particles around DNA
        const particlesCount = 200;
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesPositions = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i += 3) {
            particlesPositions[i] = (Math.random() - 0.5) * 20;
            particlesPositions[i + 1] = (Math.random() - 0.5) * height;
            particlesPositions[i + 2] = (Math.random() - 0.5) * 20;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x00ff8c,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.dnaGroup.add(this.particles);

        this.scene.add(this.dnaGroup);
    }

    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Point lights
        const colors = [0x00ff8c, 0x00a1ff, 0xffffff];
        colors.forEach((color, i) => {
            const light = new THREE.PointLight(color, 1);
            light.position.set(
                Math.cos(i * Math.PI * 2/3) * 10,
                0,
                Math.sin(i * Math.PI * 2/3) * 10
            );
            this.scene.add(light);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Rotate DNA
        if (this.dnaGroup) {
            this.dnaGroup.rotation.y = time * 0.3;
        }

        // Animate particles
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + positions[i]) * 0.01;
                positions[i] += Math.cos(time + positions[i + 2]) * 0.01;
                
                // Reset particles that go too far
                if (Math.abs(positions[i]) > 10) positions[i] = (Math.random() - 0.5) * 20;
                if (Math.abs(positions[i + 1]) > 10) positions[i + 1] = (Math.random() - 0.5) * 20;
                if (Math.abs(positions[i + 2]) > 10) positions[i + 2] = (Math.random() - 0.5) * 20;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Update controls
        this.controls.update();

        this.renderer.render(this.scene, this.camera);
    }

    simulateLoading() {
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        gsap.to(this, {
            progress: 100,
            duration: 4,
            ease: "power1.inOut",
            onUpdate: () => {
                const currentProgress = Math.round(this.progress);
                progressBar.style.width = `${currentProgress}%`;
                progressText.textContent = `${currentProgress}%`;
            },
            onComplete: () => this.complete()
        });
    }

    complete() {
        gsap.to('#preloader', {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                document.getElementById('preloader').remove();
                document.documentElement.style.overflow = 'auto';
                document.body.style.overflow = 'auto';
            }
        });
    }

    async loadDependencies() {
        await Promise.all([
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'),
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js'),
            this.loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js')
        ]);
    }

    loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
} 
}

// Initialize the DNA preloader
document.addEventListener('DOMContentLoaded', () => {
    new DNAPreloader();
});

class CyberPreloader {
    constructor() {
        this.initNoise();
        this.initTerminal();
        this.initFractals();
        this.startLoading();
        this.initAudio();
    }

    initNoise() {
        const canvas = document.getElementById('noise-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let noise = new SimplexNoise();
        let animationFrame;

        const drawNoise = (time) => {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;
            
            let t = time * 0.001;
            
            for(let x = 0; x < canvas.width; x++) {
                for(let y = 0; y < canvas.height; y++) {
                    let value = noise.noise3D(x * 0.01, y * 0.01, t);
                    value = Math.abs(value);
                    
                    const idx = (y * canvas.width + x) * 4;
                    const color = Math.floor(value * 255);
                    
                    data[idx] = color;
                    data[idx + 1] = color;
                    data[idx + 2] = color;
                    data[idx + 3] = 255;
                }
            }
            
            ctx.putImageData(imageData, 0, 0);
            animationFrame = requestAnimationFrame(drawNoise);
        };

        drawNoise(0);
    }

    initTerminal() {
        const terminal = document.getElementById('terminal-text');
        const messages = [
            'Initializing system...',
            'Loading quantum modules...',
            'Calibrating neural network...',
            'Synchronizing parallel processes...',
            'Engaging cyber protocols...'
        ];

        let messageIndex = 0;
        let charIndex = 0;

        const typeMessage = () => {
            if (messageIndex < messages.length) {
                if (charIndex < messages[messageIndex].length) {
                    terminal.textContent += messages[messageIndex][charIndex];
                    charIndex++;
                    setTimeout(typeMessage, 50);
                } else {
                    terminal.textContent += '\n';
                    messageIndex++;
                    charIndex = 0;
                    setTimeout(typeMessage, 500);
                }
            }
        };

        typeMessage();
    }

    initFractals() {
        const container = document.querySelector('.fractal-container');
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Create fractal geometry
        const geometry = new THREE.IcosahedronGeometry(1, 3);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                varying vec3 vNormal;
                uniform float time;
                void main() {
                    vNormal = normal;
                    vec3 pos = position;
                    pos += normal * sin(time + position.x * 2.0) * 0.1;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    vec3 color = normalize(vNormal) * 0.5 + 0.5;
                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });

        const fractal = new THREE.Mesh(geometry, material);
        scene.add(fractal);
        camera.position.z = 2;

        const animate = (time) => {
            material.uniforms.time.value = time * 0.001;
            fractal.rotation.x += 0.01;
            fractal.rotation.y += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate(0);
    }

    startLoading() {
        const progressText = document.querySelector('.progress-text');
        let progress = 0;
        
        gsap.to({}, {
            duration: 4,
            onUpdate: () => {
                progress = Math.min(100, Math.round(progress + 1));
                progressText.textContent = `${progress}%`;
            },
            onComplete: () => this.complete()
        });
    }

    initAudio() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        this.completeSound = () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
        };
    }

    complete() {
        this.completeSound();
        
        gsap.to('#preloader', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                document.getElementById('preloader').remove();
                document.documentElement.style.overflow = 'auto';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Initialize with proper error handling
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadRequiredLibraries();
        new CyberPreloader();
    } catch (error) {
        console.error('Failed to initialize preloader:', error);
        // Fallback to simple loading if needed
    }
});

async function loadRequiredLibraries() {
    const libraries = [
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js'
    ];

    await Promise.all(libraries.map(src => loadScript(src)));
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

class OptimizedPreloader {
    constructor() {
        this.canvas = document.getElementById('preloader-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
        this.startLoading();
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Enable hardware acceleration
        this.ctx.imageSmoothingEnabled = false;
    }

    createParticles() {
        const particleCount = Math.min(50, window.innerWidth / 30);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                life: 1,
                color: `rgba(0, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`
            });
        }
    }

    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            // Add subtle attraction to mouse
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                particle.speedX += dx / distance * 0.1;
                particle.speedY += dy / distance * 0.1;
            }

            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -0.9;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -0.9;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // Draw trail
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(particle.x - particle.speedX * 5, particle.y - particle.speedY * 5);
            this.ctx.strokeStyle = particle.color;
            this.ctx.stroke();
        });

        requestAnimationFrame(() => this.animate());
    }

    startLoading() {
        const progressFill = document.querySelector('.progress-fill');
        let progress = 0;
        
        const updateProgress = () => {
            progress += 1;
            if (progress <= 100) {
                progressFill.style.width = `${progress}%`;
                setTimeout(updateProgress, 40); // 4000ms / 100 steps = 40ms per step
            } else {
                this.complete();
            }
        };

        updateProgress();
    }

    complete() {
        // Create glitch effect
        const preloader = document.getElementById('preloader');
        const glitchDuration = 500;
        let glitchCount = 0;
        
        const glitchEffect = () => {
            if (glitchCount < 3) {
                preloader.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                preloader.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(${1 + Math.random()})`;
                glitchCount++;
                setTimeout(glitchEffect, 50);
            } else {
                // Final fade out
                preloader.style.opacity = '0';
                preloader.style.transform = 'none';
                preloader.style.filter = 'none';
                
                setTimeout(() => {
                    preloader.remove();
                    document.documentElement.style.overflow = 'auto';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        };

        setTimeout(glitchEffect, glitchDuration);
    }
}

// Initialize preloader
document.addEventListener('DOMContentLoaded', () => {
    new OptimizedPreloader();
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Function to get current section
    function getCurrentSection() {
        const scrollPosition = window.scrollY;

        for (let section of sections) {
            const sectionTop = section.offsetTop - 150; // Adjusted offset
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return section.id;
            }
        }
        return null;
    }

    // Function to update active link
    function updateActiveLink() {
        const currentSection = getCurrentSection();
        
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Handle clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
            
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Handle scroll
    window.addEventListener('scroll', () => {
        updateActiveLink();
    });

    // Initial check
    updateActiveLink();
});

// Update footer year and last updated
document.addEventListener('DOMContentLoaded', function() {
    // Update current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    // Update last modified date
    const lastModified = new Date(document.lastModified);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('lastUpdated').textContent = lastModified.toLocaleDateString('en-US', options);
});

// Enhanced Select Dropdown
const planSelect = document.getElementById('plan');

// Add hover effect class
planSelect.addEventListener('mouseover', function(e) {
    if (e.target.tagName === 'OPTION') {
        e.target.classList.add('option-hover');
    }
});

planSelect.addEventListener('mouseout', function(e) {
    if (e.target.tagName === 'OPTION') {
        e.target.classList.remove('option-hover');
    }
});

// Add change animation
planSelect.addEventListener('change', function() {
    this.classList.add('option-selected');
    setTimeout(() => {
        this.classList.remove('option-selected');
    }, 500);
});

// Highlight the selected option
planSelect.addEventListener('input', function() {
    const options = this.querySelectorAll('option');
    options.forEach(option => {
        if (option.selected && !option.disabled) {
            option.classList.add('option-active');
        } else {
            option.classList.remove('option-active');
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("7l4-wsXQ8SkMCQCmg");
})();

// Initialize testimonial cards
function initTestimonialCards() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (!('IntersectionObserver' in window)) {
        testimonialCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '20px'
    });

    testimonialCards.forEach(card => observer.observe(card));
} 