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
    document.querySelectorAll('.nav-menu a, .footer-col a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Allow native smooth scrolling via CSS, just update active styles for nav
            if (href.startsWith('#') && this.closest('.nav-menu')) {
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
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
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
            navVision: "Vision",
            navMission: "Mission",
            navFounders: "Founders",
            navServices: "Services",
            navAchievements: "Achievements",
            navContact: "Contact Us",
            heroTitle: "Welcome to Friends dev",
            heroSubtitle: "We build modern, reliable and user-friendly digital solutions that help businesses grow and succeed.",
            heroContact: "Contact",
            aboutTitle: "About Friends Dev",
            aboutP1: "Friends Dev is a young and ambitious technology company founded by three students with a shared passion for technology, creativity, and innovation.",
            aboutP2: "What started as a simple idea grew through dedication, persistence, and a desire to create meaningful digital solutions. Today, we work together to turn ideas into modern websites, mobile applications, and custom software solutions.",
            aboutP3: "As a growing team, we are constantly learning, improving, and exploring new technologies. Our goal is to build reliable and user-friendly digital products while turning our challenges into opportunities to grow.",
            aboutP4: "We believe that great things can start with a simple idea, a strong team, and the determination to keep going.",
            visionTitle: "Our Vision",
            visionP1: "To become a leading technology company in innovating smart and reliable digital solutions, transforming ambitious ideas into impactful products, simplifying the lives of individuals and businesses, and contributing to building a more innovative and advanced future.",
            visionP2: "We aspire to be a trusted partner for anyone seeking to turn their idea into a digital reality, through technology, creativity, and continuous learning, with a focus on delivering exceptional experiences and scalable, evolvable solutions.",
            visionP3: "We don't just build products for today; we innovate solutions that create the opportunities of tomorrow.",
            missionTitle: "Our Mission",
            missionP1: "Our mission is to develop innovative and reliable technological solutions that help individuals and businesses transform their ideas and challenges into practical digital products with real value.",
            missionP2: "We work to employ modern technology and creativity to understand our clients' needs, design easy and effective digital experiences, and build applications and products that are scalable and growable.",
            missionP3: "We believe that our success starts with the success of our clients. Therefore, we are committed to continuous learning, quality, innovation, and building long-term partnerships that contribute to turning ideas into tangible achievements.",
            foundersTitle: "Our Founders",
            founder1Name: "Taha Osman",
            founder1Role: "CEO",
            founder2Name: "Muawia Mohmed",
            founder2Role: "CTO",
            founder3Name: "Mohammed Osman",
            founder3Role: "COO",
            servicesTitle: "Our Services",
            servicesSubtitle: "Discover the digital solutions we offer to help your business grow.",
            srvMobileTitle: "Mobile Apps",
            srvMobileDesc: "Custom mobile apps built for your specific needs.",
            srvMobileDetail: "We build smooth, fast mobile apps for both iOS and Android. We typically use cross-platform frameworks like React Native or Flutter so you get one solid app that works everywhere. Our main focus is making the interface incredibly easy for your customers to navigate.",
            srvWebTitle: "Web Development",
            srvWebDesc: "Fast, responsive, and professional websites.",
            srvWebDetail: "Whether you need a simple landing page or a complex platform, we build websites that load quickly and look great on any device. We use modern tools like Next.js and React to make sure your site is secure, SEO-friendly, and ready to scale as your business grows.",
            srvEcomTitle: "E-Commerce",
            srvEcomDesc: "Complete online store solutions to sell your products easily.",
            srvEcomDetail: "We set up complete, secure online stores so you can start selling immediately. From cataloging your products to integrating local and international payment gateways, we handle the technical heavy lifting so you can focus purely on sales.",
            srvBusTitle: "Business Systems",
            srvBusDesc: "Custom software to simplify and manage your daily operations.",
            srvBusDetail: "Say goodbye to messy spreadsheets. We build custom dashboards and management systems (using tools like PostgreSQL and Node.js) tailored exactly to your workflow, helping you track inventory, finances, and staff all from one centralized screen.",
            srvSchoolTitle: "School Systems",
            srvSchoolDesc: "Smart digital solutions for modern educational administration.",
            srvSchoolDetail: "We develop secure management systems that connect administrators, teachers, students, and parents. Our platforms automatically handle attendance records, grading, schedule management, and tuition fee tracking, making school administration a breeze.",
            srvDesignTitle: "Graphic Design",
            srvDesignDesc: "Creative branding and designs that make your business stand out.",
            srvDesignDetail: "Good design translates to good business. We craft clean, modern logos, engaging social media posts, and complete brand identities that speak directly to your target audience without looking cluttered or generic.",
            clickToLearnMore: "Click to see details & technologies ➔",
            modalHowWeBuild: "How We Build It & Technologies",
            modalCloseBtn: "Close",
            achTitle: "Our Achievements",
            achSubtitle: "Delivering impactful digital solutions.",
            statProjects: "Projects Completed",
            statClients: "Happy Clients",
            statLines: "Lines of Code",
            proj1Title: "Flagship Smartphones Hub",
            proj1Desc: "A comprehensive web layout designed for reviewing and comparing flagship mobile devices, featuring side-by-side specification interfaces and product media embeds.",
            btnDetails: "View Details",
            proj2Title: "AccommodateMe",
            proj2Desc: "A responsive rental listing platform featuring dynamic property card layouts and intuitive navigation structures built with CSS flexbox.",
            proj3Title: "JONNE — Study Help Marketplace",
            proj3Desc: "A premium educational marketplace connecting students with verified tutors and peers. Built with React and Vite, it features smart AI-powered study assistance, a dual-mode help system (paid or free), real-time search filtering, and dedicated role-based dashboards.",
            proj4Title: "Enterprise School Management System (ESMS)",
            proj4Desc: "A high-performance digital ecosystem engineered to automate university administration in Uganda. Built with Next.js and Supabase, it features academic tracking, NCHE compliance, localized financial integrations, and a responsive glassmorphic UI.",
            langToggle: "العربية",
            footerBrandDesc: "Building modern, reliable, and user-friendly digital solutions.",
            footerLinksTitle: "Quick Links",
            footerContactTitle: "Contact Us",
            footerLocation: "Kampala, Uganda",
            footerCopyright: "© 2026 Friends Dev. All rights reserved.",
            "achieve-proj5-title": "Software Engineer Mohmed Portfolio",
            "achieve-proj5-desc": "A professional digital platform showcasing the skills, projects, and technical expertise of the engineer, highlighting their proficiency in software development.",
            "achieve-btn": "View Details",
            "achieve-proj6-title": "Friends Restaurant Platform",
            "achieve-proj6-desc": "A comprehensive fast food delivery platform featuring an attractive interface, dynamic menu display, and a seamless shopping cart system for an exceptional user experience."
        },
        ar: {
            navHome: "الرئيسية",
            navAbout: "من نحن",
            navVision: "الرؤية",
            navMission: "الرسالة",
            navFounders: "المؤسسون",
            navServices: "خدماتنا",
            navAchievements: "إنجازاتنا",
            navContact: "تواصل معنا",
            heroTitle: "مرحبا بك في Friends للتطوير",
            heroSubtitle: "نبني حلولاً رقمية حديثة وموثوقة وسهلة الاستخدام تساعد الشركات على النمو والنجاح.",
            heroContact: "تواصل معنا",
            aboutTitle: "عن أصدقاء التطوير",
            aboutP1: "أصدقاء التطوير هي شركة تكنولوجية شابة وطموحة أسسها ثلاثة طلاب يجمعهم الشغف بالتكنولوجيا والإبداع والابتكار.",
            aboutP2: "ما بدأ كفكرة بسيطة نما من خلال التفاني والمثابرة والرغبة في إيجاد حلول رقمية هادفة. اليوم، نعمل معاً لتحويل الأفكار إلى مواقع حديثة وتطبيقات هواتف وحلول برمجية مخصصة.",
            aboutP3: "كفريق متنامٍ، نحن نتعلم باستمرار ونتحسن ونستكشف تقنيات جديدة. هدفنا هو بناء منتجات رقمية موثوقة وسهلة الاستخدام مع تحويل تحدياتنا إلى فرص للنمو.",
            aboutP4: "نحن نؤمن بأن الأشياء العظيمة يمكن أن تبدأ بفكرة بسيطة، فريق قوي، وتصميم على الاستمرار.",
            visionTitle: "رؤيتنا",
            visionP1: "أن نصبح شركة تقنية رائدة في ابتكار حلول رقمية ذكية وموثوقة، تُحوّل الأفكار الطموحة إلى منتجات مؤثرة، وتُسهّل حياة الأفراد والأعمال، وتُسهم في بناء مستقبل أكثر ابتكارًا وتقدمًا.",
            visionP2: "نطمح إلى أن نكون شريكًا موثوقًا لكل من يسعى إلى تحويل فكرته إلى واقع رقمي، من خلال التكنولوجيا والإبداع والتعلّم المستمر، مع التركيز على تقديم تجارب استثنائية وحلول قابلة للنمو والتطور.",
            visionP3: "نحن لا نبني منتجات اليوم فقط، بل نبتكر حلولًا تصنع فرص الغد.",
            missionTitle: "رسالتنا",
            missionP1: "تتمثل رسالتنا في تطوير حلول تقنية مبتكرة وموثوقة تساعد الأفراد والشركات على تحويل أفكارهم وتحدياتهم إلى منتجات رقمية عملية وذات قيمة حقيقية.",
            missionP2: "نعمل على توظيف التكنولوجيا الحديثة والإبداع لفهم احتياجات عملائنا، وتصميم تجارب رقمية سهلة وفعّالة، وبناء تطبيقات ومنتجات قابلة للتطور والنمو.",
            missionP3: "ونؤمن بأن نجاحنا يبدأ من نجاح عملائنا، لذلك نلتزم بالتعلّم المستمر، والجودة، والابتكار، وبناء شراكات طويلة الأمد تساهم في تحويل الأفكار إلى إنجازات ملموسة.",
            foundersTitle: "المؤسسون",
            founder1Name: "طه عثمان",
            founder1Role: "المدير التنفيذي",
            founder2Name: "معاوية محمد",
            founder2Role: "المدير التقني",
            founder3Name: "محمد عثمان",
            founder3Role: "مدير التشغيل",
            servicesTitle: "خدماتنا",
            servicesSubtitle: "اكتشف الحلول الرقمية التي نقدمها لمساعدة عملك على النمو.",
            srvMobileTitle: "تطبيقات الهواتف",
            srvMobileDesc: "تطبيقات موبايل بتظبط شغلك وتمشي معاك خطوة بخطوة.",
            srvMobileDetail: "بنبرمج ليك تطبيقات سريعة وسهلة الاستخدام للآيفون والأندرويد. بنعتمد على تقنيات زي React Native أو Flutter عشان نطلع ليك بتطبيق واحد يشتغل في كل مكان بكفاءة، وبنركز شديد إنو التطبيق يكون مريح وسلس لعملائك.",
            srvWebTitle: "تطوير الويب",
            srvWebDesc: "مواقع ويب سريعة، احترافية، وبتفتح في أي شاشة.",
            srvWebDetail: "سواء كنت عايز موقع تعريفي بسيط أو منصة كبيرة، بنبني ليك موقع سريع وشكلو رهيب في أي جهاز. بنستخدم أحدث التقنيات زي Next.js و React عشان نضمن إنو موقعك يكون آمن، بيظهر في بحث جوجل، وقابل للتطوير قدام.",
            srvEcomTitle: "التجارة الإلكترونية",
            srvEcomDesc: "متاجر إلكترونية متكاملة عشان تبيع منتجاتك بكل سهولة.",
            srvEcomDetail: "بنجهز ليك متجر إلكتروني متكامل عشان تبدأ تبيع طوالي. من رفع المنتجات لحدي ربط بوابات الدفع المحلية والعالمية، بنشيل عنك هم التقنية عشان تركز إنت في المبيعات وبس.",
            srvBusTitle: "أنظمة الأعمال",
            srvBusDesc: "أنظمة مخصصة عشان ترتب وتسهل إدارة شغلك.",
            srvBusDetail: "ريّح راسك من الدفاتر والإكسيل. بنصمم ليك أنظمة ولوحات تحكم مفصلة على مقاس شغلك بالضبط، عشان تقدر تتابع المخزون، الحسابات، والموظفين من شاشة واحدة وبكل سهولة.",
            srvSchoolTitle: "الأنظمة المدرسية",
            srvSchoolDesc: "حلول رقمية ذكية لإدارة المدارس والجامعات.",
            srvSchoolDetail: "بنعمل أنظمة إدارة مدارس متكاملة بتربط الإدارة بالأساتذة والطلاب وأولياء الأمور. النظام بيتكفل بتسجيل الحضور، النتايج، الجداول، ومتابعة الرسوم المالية، وبيخلي شغل الإدارة ساهل ومُنظم.",
            srvDesignTitle: "التصميم الجرافيكي",
            srvDesignDesc: "تصاميم إبداعية بتخلي هويتك التجارية مميزة.",
            srvDesignDetail: "التصميم السمح بيجيب الشغل السمح. بنصمم ليك شعارات، بوستات سوشيال ميديا، وهوية بصرية كاملة بشكل عصري ونظيف بيعكس قيمة البراند بتاعك للناس وبيجذب انتباههم.",
            clickToLearnMore: "اضغط لمعرفة التقنيات والتفاصيل ➔",
            modalHowWeBuild: "كيف بنبني الخدمة والتقنيات المستخدمة",
            modalCloseBtn: "إغلاق",
            achTitle: "إنجازاتنا",
            achSubtitle: "تقديم حلول رقمية مؤثرة.",
            statProjects: "مشاريع منجزة",
            statClients: "عملاء سعداء",
            statLines: "سطور من الكود",
            proj1Title: "منصة الهواتف الرائدة",
            proj1Desc: "تصميم ويب متكامل لمراجعة ومقارنة الهواتف الذكية الرائدة، يتميز بواجهات لعرض المواصفات جنباً إلى جنب وتضمين وسائط المنتجات.",
            btnDetails: "عرض التفاصيل",
            proj2Title: "منصة الإسكان (AccommodateMe)",
            proj2Desc: "منصة ويب متجاوبة لعرض العقارات الإيجارية، تتميز بتصميم ديناميكي لبطاقات العقارات وهياكل تنقل سلسة مبنية باستخدام (CSS Flexbox).",
            proj3Title: "منصة جون التعليمية (JONNE)",
            proj3Desc: "منصة تعليمية متميزة لربط الطلاب بالمعلمين المعتمدين والزملاء. مبنية باستخدام React و Vite، وتتميز بأدوات الذكاء الاصطناعي (AI) المتقدمة للمساعدة في الدراسة، ونظام مساعدة مزدوج (مجاني أو مدفوع)، وتصفية بحث في الوقت الفعلي، ولوحات تحكم مخصصة حسب دور المستخدم.",
            proj4Title: "نظام إدارة المدارس المؤسسي (ESMS)",
            proj4Desc: "نظام رقمي عالي الأداء مصمم لأتمتة الإدارة الجامعية في أوغندا. مبني باستخدام Next.js و Supabase، ويتميز بالتتبع الأكاديمي، والتكامل المالي المحلي، وواجهة مستخدم زجاجية متجاوبة.",
            langToggle: "English",
            footerBrandDesc: "بناء حلول رقمية حديثة وموثوقة وسهلة الاستخدام.",
            footerLinksTitle: "روابط سريعة",
            footerContactTitle: "تواصل معنا",
            footerLocation: "كمبالا، أوغندا",
            footerCopyright: "© 2026 Friends Dev. جميع الحقوق محفوظة.",
            "achieve-proj5-title": "معرض أعمال المهندس البرمجي محمد",
            "achieve-proj5-desc": "منصة رقمية احترافية تستعرض المهارات، والمشاريع، والخبرات التقنية الخاصة بالمهندس لتسليط الضوء على كفاءته في تطوير البرمجيات.",
            "achieve-btn": "عرض التفاصيل",
            "achieve-proj6-title": "منصة مطعم فريندز",
            "achieve-proj6-desc": "منصة ويب متكاملة لطلب المأكولات السريعة، تتميز بواجهة جذابة وعرض ديناميكي لقائمة الطعام مع نظام سلة مشتريات سلس لتجربة مستخدم مميزة."
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
        
        if (window.updateActiveModalLang) {
            window.updateActiveModalLang(lang);
        }

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

    // Modal implementation for Service Detail view
    function initServiceModal() {
        let modal = document.getElementById('serviceModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'serviceModal';
            modal.className = 'service-modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-hidden', 'true');
            modal.innerHTML = `
                <div class="service-modal-overlay"></div>
                <div class="service-modal-content">
                    <button class="service-modal-close" aria-label="Close">&times;</button>
                    <div class="service-modal-header">
                        <div class="service-modal-icon" id="modalServiceIcon"></div>
                        <div class="service-modal-title-group">
                            <span class="service-modal-badge" data-i18n="modalHowWeBuild">كيف بنبني الخدمة والتقنيات المستخدمة</span>
                            <h2 id="modalServiceTitle"></h2>
                        </div>
                    </div>
                    <div class="service-modal-body">
                        <p id="modalServiceDetail"></p>
                    </div>
                    <div class="service-modal-footer">
                        <button class="service-modal-close-btn btn-primary" data-i18n="modalCloseBtn">إغلاق</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        let activeServiceKey = null;

        function openModal(serviceKey, iconHTML, titleText) {
            activeServiceKey = serviceKey;
            const iconEl = modal.querySelector('#modalServiceIcon');
            const titleEl = modal.querySelector('#modalServiceTitle');
            const detailEl = modal.querySelector('#modalServiceDetail');
            
            if (iconEl && iconHTML) iconEl.innerHTML = iconHTML;
            
            const lang = currentLang || 'ar';
            const titleKey = `srv${serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1)}Title`;
            const detailKey = `srv${serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1)}Detail`;
            
            if (titleEl) titleEl.innerText = (translations[lang] && translations[lang][titleKey]) || titleText;
            if (detailEl) detailEl.innerText = (translations[lang] && translations[lang][detailKey]) || '';
            
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            activeServiceKey = null;
        }

        // Modal listeners
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('service-modal-overlay') || 
                e.target.classList.contains('service-modal-close') ||
                e.target.classList.contains('service-modal-close-btn')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });

        // Attach click listeners to all service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            const serviceKey = card.getAttribute('data-service');
            
            card.addEventListener('click', () => {
                const iconHTML = card.querySelector('.service-icon')?.innerHTML;
                const titleText = card.querySelector('h3')?.innerText;
                if (serviceKey) {
                    openModal(serviceKey, iconHTML, titleText);
                }
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });

        window.updateActiveModalLang = function(lang) {
            if (activeServiceKey && modal.classList.contains('open')) {
                const titleKey = `srv${activeServiceKey.charAt(0).toUpperCase() + activeServiceKey.slice(1)}Title`;
                const detailKey = `srv${activeServiceKey.charAt(0).toUpperCase() + activeServiceKey.slice(1)}Detail`;
                const titleEl = modal.querySelector('#modalServiceTitle');
                const detailEl = modal.querySelector('#modalServiceDetail');
                const badgeEl = modal.querySelector('.service-modal-badge');
                const closeBtnEl = modal.querySelector('.service-modal-close-btn');

                if (titleEl && translations[lang] && translations[lang][titleKey]) titleEl.innerText = translations[lang][titleKey];
                if (detailEl && translations[lang] && translations[lang][detailKey]) detailEl.innerText = translations[lang][detailKey];
                if (badgeEl && translations[lang] && translations[lang]['modalHowWeBuild']) badgeEl.innerText = translations[lang]['modalHowWeBuild'];
                if (closeBtnEl && translations[lang] && translations[lang]['modalCloseBtn']) closeBtnEl.innerText = translations[lang]['modalCloseBtn'];
            }
        };
    }

    initServiceModal();
});
