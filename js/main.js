// --- Global State Variables ---
let terminalActive = false;

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

    // --- Safe Hash Routing Check ---
    const currentHash = window.location.hash;

    if (currentHash === '#archive') {
        openWritingsModal();
    } else if (currentHash.startsWith('#post-') && typeof ARCHIVE_DATA !== 'undefined') {
        const postId = currentHash.replace('#post-', '');
        const postIndex = ARCHIVE_DATA.findIndex(item => item.id === postId);
        if (postIndex !== -1) {
            openWritingsModal();
            readArticle(postIndex);
        } else {
            openWritingsModal(); // Fallback to grid if ID is invalid
        }
    }


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

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('writingsModal');
            if (modal && modal.style.display === 'block') {
                closeWritingsModal(); // Calls the central function to clear the URL!
            }
        }
    });
});

async function initTerminal() {
    terminalActive = true;
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
            if (!terminalActive) break;
            
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

            // 2. Wait for 5 seconds instead of backspacing
            await wait(5000);
            // 3. Clear instantly
            cmdSpan.textContent = "";
            
            await wait(500); // Pause before next sentence
        }
    }
}

// Ensure the CTA button navigates to the 'whoami' section
document.querySelector('.cta-btn').addEventListener('click', () => {
    // document.querySelector('nav button[data-section="whoami"]').click();
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
        terminalActive = false; // Stop any previous loop
        initTerminal();
        document.body.classList.add('landing-page');
        aside.style.display = 'none';
        main.style.marginLeft = '0';
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
        initTerminal(); 
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

    const newUrl = section === 'landing' ? '/' : `/?section=${section}`;
    
    // Only push to history if it's different from the current URL
    if (window.location.search !== (section === 'landing' ? '' : `?section=${section}`)) {
        history.pushState({ section: section }, "", newUrl);
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

function renderMusic() { document.getElementById('music-list').innerHTML = CV_DATA.music.map(m => `<div class="card"><h4>${m.title}</h4><p>${m.desc}</p></div>`).join(''); }

function renderWritings() {
    const grid = document.getElementById('writing-list'); // Matches your HTML section ID
    if (!grid || !CV_DATA.writing) return;

    grid.innerHTML = CV_DATA.writing.map(post => `
        <div class="writing-card">
            <small>${post.date}</small>
            <h3>${post.title}</h3>
            <p>${post.text.substring(0, 100)}...</p>
        </div>
    `).join('');
}


// ==========================================================================
// Hidden Gemstone Notebook Overlay Router Engine Layer
// ==========================================================================

function openWritingsModal() {
    history.replaceState(null, null, '#archive');
    const modal = document.querySelector('.writings-modal');
    const grid = document.getElementById('writingsGrid');
    const titleHeader = document.querySelector('.writings-modal-content h2');
    
    // Ensure this points to the constant generated by your script
    if (!modal || !grid || typeof ARCHIVE_DATA === 'undefined') return;
    
    if (modal) modal.scrollTop = 0; // Reset scroll
    modal.style.display = 'block';
    document.getElementById('modal-scroll-up').style.display = 'none';
    document.body.style.overflow = 'hidden';

    grid.style.display = 'grid';
    titleHeader.innerHTML = "The Notebook Archive";

    grid.innerHTML = ARCHIVE_DATA.map((item, index) => {
        // FIX: Using item.text instead of item.desc
        // const excerpt = item.text ? item.text.substring(0, 80) : '';

        // 1. Get raw text
        const rawText = item.text || '';
        
        // 2. Truncate raw text safely
        // We add an ellipsis if the text is longer than 80 chars
        const truncatedRaw = rawText.length > 80 
            ? rawText.substring(0, 80) + '...' 
            : rawText;
        
        // 3. Now parse the truncated string
        const excerpt = parseSimpleMarkdown(truncatedRaw);

        return `
            <div class="writing-card" onclick="readArticle(${index}); event.stopPropagation();">
                <div class="card-meta">${item.date}</div>
                <h3>${item.title}</h3>
                <p>${excerpt}...</p>
            </div>
        `;
    }).join('');
    
    if (modal) modal.scrollTop = 0;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function readArticle(index) {
    const modal = document.querySelector('.writings-modal');
    const item = ARCHIVE_DATA[index]; 
    const grid = document.getElementById('writingsGrid');
    const titleHeader = document.querySelector('.writings-modal-content h2');
    
    if (!grid || !item) return;
    if (modal) modal.scrollTop = 0;

    titleHeader.innerHTML = `<span onclick="openWritingsModal()" class="breadcrumb-back">Archive</span> / ${toUpperNoAccents(item.title)}`;
    grid.style.display = 'block';
    // FIX: Using item.text instead of item.desc
    grid.innerHTML = `
        <div class="markdown-reader-body">
            <div class="reader-meta">Published: ${item.date}</div>
            <div class="plaintext-render-content">${parseSimpleMarkdown(item.text || '')}</div>
            <button class="reader-back-btn" onclick="openWritingsModal()">← Back to Archive</button>
        </div>
    `;

    history.replaceState(null, null, `#post-${item.id}`);
}

function resetModalScroll() {
    const modal = document.querySelector('.writings-modal');
    if (modal) {
        modal.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function parseSimpleMarkdown(text) {
    if (!text) return '';

    // Safety: strip any leftover HTML
    text = text.replace(/<[^>]+>/g, '');

    let html = text;

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    html = html.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank">$1</a>'
    );

    html = html.replace(/^>\s*(.*)$/gm, '<blockquote>$1</blockquote>');

    html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

    html = html.replace(/\n/g, '<br>');

    return html;
}

function closeWritingsModal(event) {
    const modal = document.getElementById('writingsModal');
    
    // If an event exists, make sure the user is actually clicking the background or the X button
    if (event && event.target !== modal && !event.target.classList.contains('writings-close')) return;

    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';

    // Revert the URL to the active background section and drop the hash cleanly
    const activeSection = document.querySelector('.section.active')?.id || 'landing';
    const revertUrl = activeSection === 'landing' ? window.location.pathname : `?section=${activeSection}`;
    
    history.replaceState(null, null, revertUrl);
}


function toUpperNoAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.writings-modal');
    const btn = document.getElementById('modal-scroll-up');

    if (modal && btn) {
        modal.addEventListener('scroll', function() {
            // Check if we are in an article (Reader Mode)
            // We check this by seeing if the 'writingsGrid' content has the 'markdown-reader-body' class
            const isReaderMode = document.querySelector('.markdown-reader-body') !== null;
            
            if (isReaderMode && this.scrollTop > 300) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });
    }
});