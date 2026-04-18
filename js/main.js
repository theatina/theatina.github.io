document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Whoami (Initial Render)
    const introContainer = document.getElementById('whoami-text');
    if (introContainer) {
        // Map through the array and create <p> tags
        introContainer.innerHTML = CV_DATA.profile.aboutMeSections.map(text => 
            `<p>${text}</p>`
        ).join('');
    }

    // (Optional) Update intro image if you have a path
    // document.getElementById('intro-image').src = "assets/images/my-photo.jpg";

    // 2. Setup Navigation
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.section;
            
            // UI Toggle
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
            document.getElementById(target).classList.add('active');
            btn.classList.add('active');
            
            // Dynamic Function Calling (Case-sensitive fix)
            const functionName = `render${target.charAt(0).toUpperCase() + target.slice(1).toLowerCase()}`;
            if (typeof window[functionName] === 'function') {
                window[functionName]();
            }
        });
    });
});

// ... Keep your renderCv, renderProjects, renderWriting, renderMusic functions exactly as they were ...

/**
 * Section: CV (Experience, Education, Skills)
 */
function renderCv() {
    const container = document.getElementById('cv-content');
    if (!container) return;
    container.innerHTML = ""; 

    // Experience Section
    let html = "<h3>Experience</h3>";
    html += CV_DATA.cv.experience.map(exp => `
        <div class="cv-item" onclick="this.classList.toggle('active')">
            <div class="cv-header">
                <div>
                    <strong>${exp.role}</strong><br>
                    <small>${exp.company} • ${exp.period}</small>
                </div>
                <div class="icon">▼</div>
            </div>
            <div class="cv-body">
                <ul class="cv-details-list">
                    ${exp.details.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // Education Section
    html += "<h3 style='margin-top:30px;'>Education</h3>";
    html += CV_DATA.cv.education.map(edu => `
        <div class="cv-item" onclick="this.classList.toggle('active')">
            <div class="cv-header">
                <div>
                    <strong>${edu.degree}</strong><br>
                    <small>${edu.school} • ${edu.period}</small>
                </div>
                <div class="icon">▼</div>
            </div>
            <div class="cv-body">
                <p><span class="cv-focus-label">Focus:</span> ${edu.focus}</p>
            </div>
        </div>
    `).join('');

    // ... (rest of the skills logic remains the same)
    container.innerHTML = html;
}

/**
 * Section: Projects (Engineering & LLM)
 */
function renderProjects() {
    const container = document.getElementById('project-grid');
    if (!container) return;
    container.innerHTML = CV_DATA.projects.map(p => `
        <div class="card">
            <span class="tag">${p.tag}</span>
            <h3>${p.title}</h3>
            <p style="font-size:0.9rem; color:#555;">${p.desc}</p>
            <small><b>Tech:</b> ${p.tech}</small><br>
            <a href="${p.link}" target="_blank" style="display:inline-block; margin-top:10px; color:var(--accent); font-weight:bold; text-decoration:none;">View Repo →</a>
        </div>
    `).join('');
}

/**
 * Section: Research
 */
function renderResearch() {
    const container = document.getElementById('research-grid');
    if (!container) return;
    
    container.innerHTML = CV_DATA.research.map(res => `
        <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <span class="tag" style="background: #eef2f7; color: var(--accent);">Publication</span>
            </div>
            <h3 style="margin-top:15px;">${res.title}</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top:-10px;"><i>${res.subtitle}</i></p>
            <p style="font-size: 0.95rem;">${res.desc}</p>
            <div style="margin-bottom:15px;">
                ${res.tags.map(t => `<span style="font-size:0.75rem; margin-right:5px; color:#888;">#${t}</span>`).join('')}
            </div>
            <a href="${res.link}" target="_blank" style="text-decoration:none; color:var(--accent); font-weight:bold;">View Publication →</a>
        </div>
    `).join('');
}

/**
 * Section: Writing (Updated)
 */
function renderWriting() {
    const container = document.getElementById('writing-list');
    if (!container) return;
    
    container.innerHTML = CV_DATA.writing.map(w => `
        <div class="card">
            <span class="tag">Article</span>
            <h3>${w.title}</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top:-10px;">${w.subtitle}</p>
            <p>${w.desc}</p>
            <a href="${w.link}" target="_blank" style="color:var(--accent); text-decoration:none; font-weight:bold;">Read More →</a>
        </div>
    `).join('');
}

/**
 * Section: Music
 */
function renderMusic() {
    const container = document.getElementById('music-list');
    if (!container) return;
    container.innerHTML = CV_DATA.music.map(m => `
        <div class="card">
            <span class="tag">${m.type}</span>
            <h3>${m.title}</h3>
            <p>${m.desc}</p>
            ${m.link !== "#" ? `<a href="${m.link}" target="_blank" style="color:var(--accent); text-decoration:none; font-weight:bold;">Listen →</a>` : ''}
        </div>
    `).join('');
}