document.addEventListener('DOMContentLoaded', () => {
    renderWhoami();
    
    const navButtons = document.querySelectorAll('nav button');
    const cvGroup = document.getElementById('cv-group');
    const cvSubSections = ['experience-sub', 'skills-sub', 'certifications-sub', 'education-sub'];

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.section;
            const isCvSub = target.endsWith('-sub');
            const isCvParent = target === 'cv';

            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (isCvParent) {
                cvGroup.classList.toggle('expanded'); 
            } else if (!isCvSub) {
                cvGroup.classList.remove('expanded'); // Close if clicking other sections
            }

            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            const displayId = (isCvSub || isCvParent) ? 'cv' : target;
            const targetSec = document.getElementById(displayId);
            
            if (targetSec) {
                targetSec.classList.add('active');
                if (displayId === 'cv') {
                    renderMasterCv();
                    if (isCvSub) {
                        setTimeout(() => {
                            const subElement = document.getElementById(target);
                            if (subElement) {
                                subElement.scrollIntoView({ behavior: 'smooth' });
                                // TRIGGER HIGHLIGHT
                                highlightRegion(subElement);
                            }
                        }, 150);
                    }
                }
            }

            if (!isCvSub && !isCvParent) {
                const funcName = `render${target.charAt(0).toUpperCase() + target.slice(1).toLowerCase()}`;
                if (typeof window[funcName] === 'function') window[funcName]();
            }
        });
    });
});

/**
 * Highlights a specific region with a pulse effect
 */
function highlightRegion(element) {
    element.classList.remove('region-highlight');
    void element.offsetWidth; // Trigger reflow to restart animation
    element.classList.add('region-highlight');
    // Optional: remove after animation
    setTimeout(() => element.classList.remove('region-highlight'), 2000);
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

/**
 * RENDER SKILLS
 * Removed the "onclick" and "active" logic to keep it static.
 */
function renderSkills(id) {
    const container = document.getElementById(id);
    container.innerHTML = "<h2>Technical Stack</h2>";
    container.innerHTML += CV_DATA.skills.map(s => `
        <div class="cv-item static">
            <div class="cv-header" style="cursor: default;">
                <strong>${s.name}</strong>
            </div>
            <div class="cv-body">
                <div class="tag-cloud">
                    ${s.items.map(i => `<span class="tag">${i}</span>`).join(' ')}
                </div>
            </div>
        </div>
    `).join('');
}

function renderCertifications(id) {
    document.getElementById(id).innerHTML = "<h3>Certifications</h3><div class='grid'>" + CV_DATA.certifications.map(c => `
        <div class="card"><span class="tag">${c.issuer}</span><h4>${c.title}</h4><small>${c.date}</small><p>${c.desc}</p></div>`).join('') + "</div>";
}

function renderEducation(id) {
    document.getElementById(id).innerHTML = "<h3>Education</h3>" + CV_DATA.education.map(e => `
        <div class="cv-item" onclick="this.classList.toggle('active')"><div class="cv-header"><div><strong>${e.degree}</strong><small>${e.school} • ${e.period}</small></div><div class="icon">▼</div></div><div class="cv-body"><p><span class="cv-focus-label"><strong>Focus:</strong></span> ${e.focus}</p></div></div>`).join('');
}

// ... other renderers (Projects, Research, etc.) use the standard mapping logic
function renderProjects() { 
    document.getElementById('project-grid').innerHTML = CV_DATA.projects.map(p => `
        <div class="card">
            <span class="tag">${p.tag}</span>
            <h4>${p.title}</h4>
            <p>${p.desc}</p>
            
            <div class="tech-tags" style="margin-top: 10px;">
                ${p.tech.map(t => `<span class="tag-tech">${t}</span>`).join('')}
            </div>
            
            <div class="card-footer" style="display: flex; gap: 15px;">
                <a href="${p.repo}" target="_blank"><i class="fa fa-github"></i> Repository</a>
                <a href="${p.docs}" target="_blank"><i class="fa fa-book"></i> Docs</a>
            </div>
        </div>`).join(''); 
}

function renderResearch() { 
    const container = document.getElementById('research-grid');
    container.classList.remove('grid'); // Ensure it doesn't use column-based grid layout
    
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