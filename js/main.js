document.addEventListener('DOMContentLoaded', () => {
    formatNavItems();
    renderWhoami();
    
    // 1. Get the parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const sectionFromUrl = urlParams.get('section');
    
    // 2. Determine the section
    // If sectionFromUrl exists, use it. If not, default to 'whoami'
    const section = sectionFromUrl || 'landing';
    
    // 3. Navigate
    navigateTo(section);

    // UI Elements
    const menuToggle = document.getElementById('menu-toggle');
    const overlay = document.getElementById('mobile-nav-overlay');
    const closeNav = document.getElementById('close-nav');
    const backToTopBtn = document.createElement("button");

    // Back-to-Top Setup
    backToTopBtn.id = "back-to-top";
    backToTopBtn.innerHTML = '<i class="fa fa-arrow-up"></i>'; 
    document.body.appendChild(backToTopBtn);

    // --- Consolidated Scroll Listener ---
    window.addEventListener('scroll', () => {
        // 1. Back-to-Top visibility
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // 2. Burger Menu visibility (only on mobile)
        const aside = document.querySelector('aside');
        if (window.innerWidth <= 850) {
            if (window.scrollY > aside.offsetHeight) {
                menuToggle.classList.add('show');
            } else {
                menuToggle.classList.remove('show');
            }
        } else {
            menuToggle.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener("click", () => {
        backToTopBtn.classList.add('flash-active');

        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => {
            backToTopBtn.classList.remove('flash-active');
        }, 1000);

        backToTopBtn.blur();
    });

    // --- Mobile Overlay Logic ---
    menuToggle.addEventListener('click', () => {
        const navContent = document.querySelector('aside nav').cloneNode(true);
        const overlayNav = overlay.querySelector('nav');
        overlayNav.innerHTML = '';

        const homeBtn = document.createElement('button');
        homeBtn.innerHTML = '<i class="fa fa-home" style="margin-right: 20px;"></i>';
        homeBtn.onclick = () => {
            navigateTo('landing');
            closeMobileNav();
        };
        overlayNav.appendChild(homeBtn);

        overlayNav.appendChild(navContent);
        
        overlayNav.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('nav-parent')) {
                    btn.parentElement.classList.toggle('expanded');
                    return;
                }
                closeMobileNav();
                const targetBtn = document.querySelector(`aside nav button[data-section="${btn.dataset.section}"]`);
                if (targetBtn) targetBtn.click();
            });
        });
        menuToggle.classList.add('active');
        overlay.classList.add('active');
    });

    function closeMobileNav() {
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
    }

    closeNav.addEventListener('click', closeMobileNav);

    // --- Navigation Logic ---
    const navButtons = document.querySelectorAll('nav button');
    const cvGroup = document.getElementById('cv-group');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Inside navButtons.forEach listener
            if (btn.classList.contains('active')) {
            // Special case: If it's the CV parent, we still want to allow toggling 
            // even if it's "active", so we don't return here if it's the CV button.
                if (btn.dataset.section !== 'cv') return;
            }

            const target = btn.dataset.section;
            const isCvSub = target.endsWith('-sub');
            const isCvParent = target === 'cv';

            // window.scrollTo({ top: 0, behavior: 'smooth' });

            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (isCvParent) {
                cvGroup.classList.toggle('expanded'); 
            } else if (!isCvSub) {
                cvGroup.classList.remove('expanded');
            }

            const displayId = (isCvSub || isCvParent) ? 'cv' : target;
            const targetSec = document.getElementById(displayId);
            const currentActive = document.querySelector('.section.active');

            // If switching sections, perform fade transition
            if (currentActive !== targetSec) {
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                if (targetSec) {
                    targetSec.classList.add('active');
                    if (displayId === 'cv') renderMasterCv();
                }
            }
            
            if (isCvSub) {
                const subElement = document.getElementById(target);
                if (subElement) {
                    // Ensure smooth transition to element
                    subElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    highlightRegion(subElement);
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // 5. Trigger specific render function for non-CV
            if (!isCvSub && !isCvParent) {
                const funcName = `render${target.charAt(0).toUpperCase() + target.slice(1).toLowerCase()}`;
                if (typeof window[funcName] === 'function') window[funcName]();
            }
            
            if (event.isTrusted) {
                const newUrl = target === 'landing' ? '/' : `/?section=${target}`;
                history.pushState({ section: target }, "", newUrl);
            }

            // Close mobile nav if open
            if (window.innerWidth <= 850) closeMobileNav();
        });
    });

    window.addEventListener('popstate', (event) => {
        // Get the section from the URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const section = urlParams.get('section') || 'landing'; 
        
        // Call the navigation function directly
        // This updates the UI without double-triggering events
        navigateTo(section);
    });
});

async function initTerminal() {
    const display = document.getElementById('terminal-display');
    const path = "theatina@portfolio:~$ ";
    const wait = (ms) => new Promise(res => setTimeout(res, ms));

    const rawPool = [
        ...CV_DATA.profile.aboutMeSections,
        ...CV_DATA.experience.map(e => `Experience: ${e.role} @ ${e.company}`),
        ...CV_DATA.skills.map(s => `Tech: ${s.items.join(' | ')}`)
    ].map(s => s.replace(/<[^>]*>/g, ''));

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // Initialize once
    display.innerHTML = `<span class="path">${path}</span><span class="cmd"></span>`;
    const cmdSpan = display.querySelector('.cmd');

    while (document.getElementById('landing').classList.contains('active')) {
        const textPool = shuffle([...rawPool]);

        for (let sentence of textPool) {
            // 1. Typing
            for (let i = 0; i <= sentence.length; i++) {
                // Simulate a backspace typo
                if (Math.random() > 0.98 && i > 5) {
                    cmdSpan.textContent = sentence.substring(0, i) + 'X'; // Typo
                    await wait(200);
                    cmdSpan.textContent = sentence.substring(0, i - 1); // Backspace
                    await wait(100);
                }
                cmdSpan.textContent = sentence.substring(0, i);
                await wait(Math.random() * 60 + 40);
            }

            await wait(3000); // Read time

            // 2. Disappear by backspacing the whole sentence
            for (let i = sentence.length; i >= 0; i--) {
                cmdSpan.textContent = sentence.substring(0, i);
                await wait(30); // Eraser speed
            }
            
            await wait(500); // Pause before next sentence
        }
    }
}

// Ensure the CTA button navigates to the 'whoami' section
document.querySelector('.cta-btn').addEventListener('click', () => {
    navigateTo('whoami');
});

function highlightRegion(element) {
    element.classList.remove('region-highlight');
    void element.offsetWidth;
    element.classList.add('region-highlight');
    setTimeout(() => element.classList.remove('region-highlight'), 2000);
}

function formatNavItems() {
    const navItems = document.querySelectorAll('nav button');

    navItems.forEach(btn => {
        const section = btn.dataset.section;
        const text = btn.innerText;

        if (section === 'whoami') {
            // Special handling for Whoami: wrap "Who"
            btn.innerHTML = `<span class="first-letter">Who</span>${text.slice(3)}`;
        } else if (['cv', 'projects', 'research'].includes(section)) {
            // Standard handling for others: wrap first letter
            btn.innerHTML = `<span class="first-letter">${text.charAt(0)}</span>${text.slice(1)}`;
        }
    });
}

function navigateTo(section) {
    const aside = document.querySelector('aside');
    const main = document.querySelector('main');
    const isMobile = window.innerWidth <= 850;

    // 1. Reset state
    document.body.classList.remove('landing-page');
    aside.style.display = '';
    main.style.marginLeft = '';

    // 2. Handle Landing Page Layout
    if (section === 'landing') {
        document.body.classList.add('landing-page');
        aside.style.display = 'none';
        main.style.marginLeft = '0';
        initTerminal();
    } 
    // 3. Handle Other Pages (Mobile vs Desktop logic)
    else {
        if (isMobile) {
            // Only show aside if explicitly on 'whoami', otherwise hide for clean content
            aside.style.display = (section === 'whoami') ? 'block' : 'none';
            main.style.marginLeft = '0';
        } else {
            aside.style.display = 'flex';
            main.style.marginLeft = '260px';
        }
    }

    // 2. Navigation Button State
    const btn = document.querySelector(`nav button[data-section="${section}"]`);
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // 3. CV Accordion State
    const isCvSub = section.endsWith('-sub');
    const isCvParent = section === 'cv';
    const cvGroup = document.getElementById('cv-group');
    if (cvGroup) {
        if (isCvParent) cvGroup.classList.add('expanded');
        else if (!isCvSub) cvGroup.classList.remove('expanded');
    }

    // 4. Section Visibility
    const displayId = (isCvSub || isCvParent) ? 'cv' : section;
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const targetSec = document.getElementById(displayId);
    if (targetSec) targetSec.classList.add('active');

    // 5. Trigger Rendering (Cleaned up logic)
    if (displayId === 'landing') {
        // initTerminal(); // REMOVE OR COMMENT OUT THIS LINE
    } else if (displayId === 'cv') {
        renderMasterCv();
    } else {
        const funcName = `render${displayId.charAt(0).toUpperCase() + displayId.slice(1).toLowerCase()}`;
        if (typeof window[funcName] === 'function') window[funcName]();
    }

    // 6. Smooth Scroll
    if (isCvSub) {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function renderWhoami() {
    document.getElementById('whoami-text').innerHTML = CV_DATA.profile.aboutMeSections.map(p => `<p>${p}</p>`).join('');
    document.getElementById('whoami-snapshot').innerHTML = `
        <div class="snapshot-group"><h4>Expertise</h4><div class="tag-cloud">${CV_DATA.profile.snapshot.expertise.map(t => `<span class="tag">${t}</span>`).join(' ')}</div></div>
        <div class="snapshot-group"><h4>Soft Skills</h4><div class="tag-cloud">${CV_DATA.profile.snapshot.softskills.map(t => `<span class="tag">${t}</span>`).join(' ')}</div></div>
        <div class="snapshot-group"><h4>Languages</h4><div class="tag-cloud">${CV_DATA.profile.snapshot.languages.map(t => `<span class="tag">${t}</span>`).join(' ')}</div></div>
        <div class="snapshot-group"><h4>Beyond the Screen</h4><div class="tag-cloud">${CV_DATA.profile.snapshot.hobbies.map(t => `<span class="tag pink-tag">${t}</span>`).join(' ')}</div></div>
    `;
}

function renderMasterCv() {
    renderExperience('experience-sub');
    renderSkills('skills-sub');
    renderCertifications('certifications-sub');
    renderEducation('education-sub');
}

function renderExperience(id) {
    document.getElementById(id).innerHTML = "<h3>Professional Experience</h3>" + CV_DATA.experience.map(exp => `
        <div class="cv-item" onclick="if(event.target.closest('.project-accordion')) return; this.classList.toggle('active')">
            <div class="cv-header"><div><strong>${exp.role}</strong><small>${exp.company} • ${exp.period}</small></div><div class="icon">▼</div></div>
            <div class="cv-body"><ul class="cv-details-list">${exp.details.map(d => `<li>${d}</li>`).join('')}</ul>
                ${exp.projects ? `<div class="project-dropdown-list"><p class="project-list-label">Project Case Studies</p>
                ${exp.projects.map(p => `<div class="project-accordion" onclick="event.stopPropagation(); this.classList.toggle('open')"><div class="project-acc-header"><span>${p.name}</span><i class="fa fa-chevron-down"></i></div><div class="project-acc-body"><p>${p.info}</p></div></div>`).join('')}</div>` : ''}
            </div>
        </div>`).join('');
}

function renderSkills(id) {
    const container = document.getElementById(id);
    container.innerHTML = "<h2>Technical Stack</h2>";
    container.innerHTML += CV_DATA.skills.map(s => `
        <div class="cv-item static">
            <div class="cv-header" style="cursor: default;"><strong>${s.name}</strong></div>
            <div class="cv-body"><div class="tag-cloud">${s.items.map(i => `<span class="tag">${i}</span>`).join(' ')}</div></div>
        </div>
    `).join('');
}

function renderCertifications(id) {
    document.getElementById(id).innerHTML = "<h3>Certifications</h3><div class='grid'>" + CV_DATA.certifications.map(c => `
        <div class="card"><span class="tag">${c.issuer}</span><h4>${c.title}</h4><small>${c.date}</small><p>${c.desc}</p></div>`).join('') + "</div>";
}

function renderEducation(id) {
    document.getElementById(id).innerHTML = "<h3>Education</h3>" + CV_DATA.education.map(e => `
        <div class="cv-item" onclick="this.classList.toggle('active')">
            <div class="cv-header">
                <div><strong>${e.degree}</strong><small>${e.school} • ${e.period}</small></div>
                <div class="icon">▼</div>
            </div>
            <div class="cv-body">
                <p><span class="cv-focus-label">Focus:</span> ${e.focus}</p>
            </div>
        </div>`).join('');
}

function renderProjects() { 
    document.getElementById('project-grid').innerHTML = CV_DATA.projects.map(p => `
        <div class="card">
            <span class="tag">${p.tag}</span>
            <h4>${p.title}</h4>
            <p>${p.desc}</p>
            <div class="tech-tags" style="margin-top: 10px;">${p.tech.map(t => `<span class="tag-tech">${t}</span>`).join('')}</div>
            <div class="card-footer"><a href="${p.repo}" target="_blank"><i class="fa fa-github"></i> Repository</a><a href="${p.docs}" target="_blank"><i class="fa fa-book"></i> Docs</a></div>
        </div>`).join(''); 
}

function renderResearch() { 
    const container = document.getElementById('research-grid');
    container.classList.remove('grid');
    container.innerHTML = CV_DATA.research.map(r => `
        <div class="research-row">
            <h4>${r.title}</h4>
            <div class="subtitle">${r.subtitle}</div>
            <div class="tags">${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <a href="${r.link}" target="_blank">View Paper &rarr;</a>
        </div>`).join(''); 
}

function renderWriting() { document.getElementById('writing-list').innerHTML = CV_DATA.writing.map(w => `<div class="card"><h4>${w.title}</h4><p>${w.desc}</p></div>`).join(''); }
function renderMusic() { document.getElementById('music-list').innerHTML = CV_DATA.music.map(m => `<div class="card"><h4>${m.title}</h4><p>${m.desc}</p></div>`).join(''); }

