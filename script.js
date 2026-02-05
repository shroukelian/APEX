document.addEventListener('DOMContentLoaded', () => {
        const langBtn = document.getElementById('langSwitcher');
    const htmlTag = document.getElementById('mainHtml');

    function setLanguage(lang) {
        if (!htmlTag || !langBtn) return;

        if (lang === 'en') {
            htmlTag.setAttribute('lang', 'en');
            htmlTag.setAttribute('dir', 'ltr');
            langBtn.textContent = 'العربية';
        } else {
            htmlTag.setAttribute('lang', 'ar');
            htmlTag.setAttribute('dir', 'rtl');
            langBtn.textContent = 'English';
        }
        localStorage.setItem('apexLang', lang);
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const currentLang = htmlTag.getAttribute('lang') || 'ar';
            setLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }

    const savedLang = localStorage.getItem('apexLang') || 'ar';
    setLanguage(savedLang);


    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-links');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); 
            } else {
                entry.target.classList.remove('active'); 
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });


    const counters = document.querySelectorAll('.counter');
    const counterSpeed = 100;

    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix') || "";
        
        const updateCount = () => {
            const currentText = el.innerText.replace('+', '').replace(suffix, '');
            const count = +currentText;
            const increment = target / counterSpeed;

            if (count < target) {
                el.innerText = "+" + Math.ceil(count + increment) + suffix;
                setTimeout(updateCount, 20);
            } else {
                el.innerText = "+" + target + suffix;
            }
        };
        updateCount();
    };

    const statsSection = document.querySelector('.stats-section');
    let counterStarted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                counters.forEach(c => startCounter(c));
                counterStarted = true; 
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) statsObserver.observe(statsSection);
});