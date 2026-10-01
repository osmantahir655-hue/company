document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('open');
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if it's an anchor link on the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Add active state styling
                document.querySelectorAll('.nav-menu a').forEach(a => a.style.color = '');
                this.style.color = 'var(--color-btn-hover)';
            }
        });
    });

    // Add a subtle parallax effect on the hero image based on mouse movement
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && window.matchMedia("(min-width: 992px)").matches) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            
            heroImage.style.transform = `translate(${xAxis}px, ${yAxis}px) scale(1.02)`;
        });
        
        // Reset transform on mouse leave
        document.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'translate(0px, 0px) scale(1)';
        });
    }

    // Scroll Reveal functionality using IntersectionObserver
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Stats Counter Animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    if (statsNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.getAttribute('data-target'), 10);
                    let startValue = 0;
                    const duration = 2000; // 2 seconds
                    const frameRate = 1000 / 60;
                    const totalFrames = Math.round(duration / frameRate);
                    const increment = finalValue / totalFrames;
                    
                    const counter = setInterval(() => {
                        startValue += increment;
                        if (startValue >= finalValue) {
                            target.innerText = finalValue.toLocaleString(); // adds commas for thousands
                            clearInterval(counter);
                        } else {
                            target.innerText = Math.ceil(startValue).toLocaleString();
                        }
                    }, frameRate);
                    
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });

        statsNumbers.forEach(stat => statsObserver.observe(stat));
    }

    // Bilingual Dictionary & Logic
    const translations = {
        en: {
            navHome: "Home",
            navAbout: "About",
            navServices: "Services",
            navAchievements: "Achievements",
            heroTitle: "Welcome to Friends dev",
            heroSubtitle: "We build modern, reliable and user-friendly digital solutions that help businesses grow and succeed.",
            heroContact: "Contact",
            aboutTitle: "About Friends Dev",
            aboutP1: "Friends Dev is a young and ambitious technology company founded by three students with a shared passion for technology, creativity, and innovation.",
            aboutP2: "What started as a simple idea grew through dedication, persistence, and a desire to create meaningful digital solutions. Today, we work together to turn ideas into modern websites, mobile applications, and custom software solutions.",
            aboutP3: "As a growing team, we are constantly learning, improving, and exploring new technologies. Our goal is to build reliable and user-friendly digital products while turning our challenges into opportunities to grow.",
            aboutP4: "We believe that great things can start with a simple idea, a strong team, and the determination to keep going.",
            servicesTitle: "Our Services",
            servicesSubtitle: "Discover the digital solutions we offer to help your business grow.",
            srvMobileTitle: "Mobile Apps",
            srvMobileDesc: "Modern mobile applications built around your needs.",
            srvWebTitle: "Web Development",
            srvWebDesc: "Fast, responsive, and professional websites.",
            srvEcomTitle: "E-Commerce",
            srvEcomDesc: "Complete online store solutions for your business.",
            srvBusTitle: "Business Systems",
            srvBusDesc: "Custom software to simplify and manage your business.",
            srvSchoolTitle: "School Systems",
            srvSchoolDesc: "Smart digital solutions for modern school management.",
            srvDesignTitle: "Graphic Design",
            srvDesignDesc: "Creative designs that make your brand stand out.",
            achTitle: "Our Achievements",
            achSubtitle: "Delivering impactful digital solutions.",
            statProjects: "Projects Completed",
            statClients: "Happy Clients",
            statLines: "Lines of Code",
            proj1Title: "Friends Fast-Food Ordering System",
            proj1Desc: "A comprehensive campus delivery web application featuring integrated mobile money payment workflows, live delivery tracking, and dedicated administrative management interfaces.",
            btnDetails: "View Details",
            proj2Title: "Bint Khuwaylid Student Registration System",
            proj2Desc: "A complete online student registration web application featuring secure public, parent, and admin portals, designed with a custom uniform-inspired blue styling scheme.",
            langToggle: "العربية",
            footerBrandDesc: "Building modern, reliable, and user-friendly digital solutions.",
            footerLinksTitle: "Quick Links",
            footerContactTitle: "Contact Us",
            footerLocation: "Kampala, Uganda",
            footerCopyright: "© 2026 Friends Dev. All rights reserved."
        },
        ar: {
            navHome: "الرئيسية",
            navAbout: "من نحن",
            navServices: "خدماتنا",
            navAchievements: "إنجازاتنا",
            heroTitle: "مرحبا بك في Friends للتطوير",
            heroSubtitle: "نبني حلولاً رقمية حديثة وموثوقة وسهلة الاستخدام تساعد الشركات على النمو والنجاح.",
            heroContact: "تواصل معنا",
            aboutTitle: "عن أصدقاء التطوير",
            aboutP1: "أصدقاء التطوير هي شركة تكنولوجية شابة وطموحة أسسها ثلاثة طلاب يجمعهم الشغف بالتكنولوجيا والإبداع والابتكار.",
            aboutP2: "ما بدأ كفكرة بسيطة نما من خلال التفاني والمثابرة والرغبة في إيجاد حلول رقمية هادفة. اليوم، نعمل معاً لتحويل الأفكار إلى مواقع حديثة وتطبيقات هواتف وحلول برمجية مخصصة.",
            aboutP3: "كفريق متنامٍ، نحن نتعلم باستمرار ونتحسن ونستكشف تقنيات جديدة. هدفنا هو بناء منتجات رقمية موثوقة وسهلة الاستخدام مع تحويل تحدياتنا إلى فرص للنمو.",
            aboutP4: "نحن نؤمن بأن الأشياء العظيمة يمكن أن تبدأ بفكرة بسيطة، فريق قوي، وتصميم على الاستمرار.",
            servicesTitle: "خدماتنا",
            servicesSubtitle: "اكتشف الحلول الرقمية التي نقدمها لمساعدة عملك على النمو.",
            srvMobileTitle: "تطبيقات الهواتف",
            srvMobileDesc: "تطبيقات هواتف حديثة مصممة لتلبية احتياجاتك.",
            srvWebTitle: "تطوير الويب",
            srvWebDesc: "مواقع ويب سريعة ومتجاوبة واحترافية.",
            srvEcomTitle: "التجارة الإلكترونية",
            srvEcomDesc: "حلول متاجر إلكترونية متكاملة لعملك.",
            srvBusTitle: "أنظمة الأعمال",
            srvBusDesc: "برمجيات مخصصة لتبسيط وإدارة أعمالك.",
            srvSchoolTitle: "الأنظمة المدرسية",
            srvSchoolDesc: "حلول رقمية ذكية لإدارة المدارس الحديثة.",
            srvDesignTitle: "التصميم الجرافيكي",
            srvDesignDesc: "تصاميم إبداعية تجعل علامتك التجارية تبرز.",
            achTitle: "إنجازاتنا",
            achSubtitle: "تقديم حلول رقمية مؤثرة.",
            statProjects: "مشاريع منجزة",
            statClients: "عملاء سعداء",
            statLines: "سطور من الكود",
            proj1Title: "نظام طلب الوجبات السريعة للأصدقاء",
            proj1Desc: "تطبيق ويب شامل للتوصيل داخل الحرم الجامعي يتميز بسير عمل متكامل للدفع عبر الأموال المحمولة، وتتبع مباشر للتوصيل، وواجهات إدارة إدارية مخصصة.",
            btnDetails: "عرض التفاصيل",
            proj2Title: "نظام تسجيل طلاب بنت خويلد",
            proj2Desc: "تطبيق ويب كامل لتسجيل الطلاب عبر الإنترنت يتميز ببوابات عامة وأولياء أمور وإداريين آمنة، مصمم بنظام ألوان أزرق مخصص مستوحى من الزي المدرسي.",
            langToggle: "English",
            footerBrandDesc: "بناء حلول رقمية حديثة وموثوقة وسهلة الاستخدام.",
            footerLinksTitle: "روابط سريعة",
            footerContactTitle: "تواصل معنا",
            footerLocation: "كمبالا، أوغندا",
            footerCopyright: "© 2026 Friends Dev. جميع الحقوق محفوظة."
        }
    };

    let currentLang = localStorage.getItem('siteLang') || 'ar';
    
    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
        
        localStorage.setItem('siteLang', lang);
    }
    
    // Apply saved language on load
    setLanguage(currentLang);
    
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    }
});
