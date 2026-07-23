const STORAGE_KEY = "touzi-profile-data-v6";
const LANG_KEY = "touzi-profile-lang";
const THEME_KEY = "touzi-profile-theme";
const SESSION_KEY = "touzi-admin-session";
const ADMIN_USER = "touzi";
const ADMIN_PASS = "w3455853417";

let profileData = loadData();
let currentLang = localStorage.getItem(LANG_KEY) || "zh";
let currentTheme = localStorage.getItem(THEME_KEY) || "light";

const uiText = {
    zh: {
        overview: "个人概览",
        education: "教育经历",
        internships: "实习经历",
        projects: "项目经验",
        awards: "奖项与荣誉",
        skills: "专业技能",
        stack: "技术栈",
        researchProjects: "科研项目",
        horizontalProjects: "横向项目",
        empty: "暂无显示内容",
        saved: "已保存",
        loginError: "账号或密码不正确",
        importError: "导入失败，请检查 JSON 文件",
        confirmReset: "确定恢复默认内容吗？当前本机修改会被清除。",
        language: "English",
        admin: "控制面板",
        themeLight: "夜间",
        themeDark: "日间",
        show: "显示",
        zhLabel: "中文",
        enLabel: "English"
    },
    en: {
        overview: "Overview",
        education: "Education",
        internships: "Internships",
        projects: "Project Experience",
        awards: "Awards",
        skills: "Skills",
        stack: "Tech Stack",
        researchProjects: "Research Projects",
        horizontalProjects: "Engineering Projects",
        empty: "No visible items yet",
        saved: "Saved",
        loginError: "Incorrect username or password",
        importError: "Import failed. Please check the JSON file.",
        confirmReset: "Restore default content? Local changes will be cleared.",
        language: "中文",
        admin: "Control Panel",
        themeLight: "Dark",
        themeDark: "Light",
        show: "Visible",
        zhLabel: "中文",
        enLabel: "English"
    }
};

window.addEventListener("DOMContentLoaded", () => {
    bindControls();
    bindAdmin();
    renderPage();
    if (isAdmin()) openAdminDrawer();
});

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return cloneData(DEFAULT_PROFILE_DATA);
    try {
        return mergeDefaults(JSON.parse(saved), cloneData(DEFAULT_PROFILE_DATA));
    } catch {
        return cloneData(DEFAULT_PROFILE_DATA);
    }
}

function cloneData(data) {
    return JSON.parse(JSON.stringify(data));
}

function mergeDefaults(saved, defaults) {
    return { ...defaults, ...saved };
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
}

function t(key) {
    return uiText[currentLang][key] || key;
}

function pick(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
        return value[currentLang] || value.zh || value.en || "";
    }
    return value || "";
}

function renderPage() {
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    document.title = `${pick(profileData.profile.name)} - ${currentLang === "zh" ? "个人主页" : "Homepage"}`;
    document.body.dataset.theme = currentTheme;
    document.getElementById("profileName").textContent = pick(profileData.profile.name);
    document.getElementById("profileRole").textContent = pick(profileData.profile.role);
    document.getElementById("profileSummary").textContent = pick(profileData.profile.summary);
    document.getElementById("langToggle").textContent = t("language");
    document.getElementById("themeToggle").textContent = currentTheme === "dark" ? t("themeDark") : t("themeLight");
    document.getElementById("adminOpen").textContent = t("admin");
    renderContacts();
    renderSchool();
    renderProjects();
    renderTimeline("internshipList", profileData.internships, item => `
        <div class="entry-title">
            <h3>${escapeHtml(pick(item.company))}</h3>
            <span>${escapeHtml(pick(item.time))}</span>
        </div>
        <p class="entry-summary">${escapeHtml(pick(item.role))}</p>
        ${renderPoints(item.points)}
    `);
    renderTimeline("educationList", profileData.education, item => `
        <div class="entry-title">
            <h3>${escapeHtml(pick(item.school))}</h3>
            <span>${escapeHtml(pick(item.time))}</span>
        </div>
        <p class="entry-summary">${escapeHtml(pick(item.major))} · ${escapeHtml(pick(item.degree))}</p>
        <p>${escapeHtml(pick(item.details))}</p>
    `);
    renderAwards();
    renderSkills();
    translateHeadings();
}

function renderContacts() {
    document.getElementById("profileContacts").innerHTML = profileData.profile.contacts.map(contact => `
        <div class="contact-line">
            <span>${escapeHtml(contact.icon)}</span>
            <strong>${escapeHtml(pick(contact.value))}</strong>
        </div>
    `).join("");
}

function renderSchool() {
    const schools = profileData.profile.schools || (profileData.profile.school ? [profileData.profile.school] : []);
    document.getElementById("profileSchool").innerHTML = schools.map(school => `
        <div class="school-line">
            <strong>${escapeHtml(pick(school.name))}</strong>
            <span>${escapeHtml(pick(school.detail))}</span>
        </div>
    `).join("");
}

function translateHeadings() {
    ["overview", "projects", "internships", "education", "awards", "skills"].forEach(id => {
        const heading = document.querySelector(`#${id} h2`);
        if (heading) heading.textContent = t(id);
    });
}

function renderTimeline(targetId, items, template) {
    const visible = items.filter(item => item.visible);
    document.getElementById(targetId).innerHTML = visible.length
        ? visible.map(item => `<article class="resume-entry">${template(item)}</article>`).join("")
        : `<p class="empty">${t("empty")}</p>`;
}

function renderProjects() {
    const visible = profileData.projects.filter(item => item.visible);
    if (!visible.length) {
        document.getElementById("projectList").innerHTML = `<p class="empty">${t("empty")}</p>`;
        return;
    }
    const groups = [
        { type: "research", title: t("researchProjects") },
        { type: "horizontal", title: t("horizontalProjects") }
    ];
    document.getElementById("projectList").innerHTML = groups.map(group => {
        const items = visible.filter(item => (item.type || "horizontal") === group.type);
        if (!items.length) return "";
        return `
            <section class="project-group">
                <h3>${group.title}</h3>
                ${items.map(item => `
            <article class="project-entry">
                <div class="entry-title">
                    <h3>${escapeHtml(pick(item.title))}</h3>
                    <span>${escapeHtml(pick(item.time))}</span>
                </div>
                <p class="entry-summary">${escapeHtml(pick(item.summary))}</p>
                <p class="tech-stack">${t("stack")}: ${escapeHtml(pick(item.stack))}</p>
                ${renderPoints(item.points)}
            </article>
                `).join("")}
            </section>
        `;
    }).join("");
}

function renderAwards() {
    const visible = profileData.awards.filter(item => item.visible);
    document.getElementById("awardList").innerHTML = visible.length
        ? visible.map(item => `<li>${escapeHtml(pick(item.text))}</li>`).join("")
        : `<li class="empty">${t("empty")}</li>`;
}

function renderSkills() {
    const visible = profileData.skills.filter(item => item.visible);
    document.getElementById("skillList").innerHTML = visible.length
        ? visible.map(item => `
            <article class="skill-entry">
                <h3>${escapeHtml(pick(item.title))}</h3>
                <p>${escapeHtml(pick(item.text))}</p>
            </article>
        `).join("")
        : `<p class="empty">${t("empty")}</p>`;
}

function renderPoints(points) {
    const list = pick(points);
    if (!Array.isArray(list) || !list.length) return "";
    return `<ul class="point-list">${list.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul>`;
}

function bindControls() {
    document.body.dataset.theme = currentTheme;
    document.getElementById("themeToggle").addEventListener("click", () => {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, currentTheme);
        renderPage();
    });
    document.getElementById("langToggle").addEventListener("click", () => {
        currentLang = currentLang === "zh" ? "en" : "zh";
        localStorage.setItem(LANG_KEY, currentLang);
        renderPage();
        if (isAdmin()) renderAdmin();
    });
    document.getElementById("adminOpen").addEventListener("click", () => {
        isAdmin() ? openAdminDrawer() : openModal("loginModal");
    });
}

function bindAdmin() {
    document.querySelectorAll("[data-close]").forEach(button => {
        button.addEventListener("click", () => closeModal(button.dataset.close));
    });
    document.getElementById("loginForm").addEventListener("submit", event => {
        event.preventDefault();
        const user = document.getElementById("adminUser").value.trim();
        const pass = document.getElementById("adminPass").value;
        if (user === ADMIN_USER && pass === ADMIN_PASS) {
            sessionStorage.setItem(SESSION_KEY, "1");
            document.getElementById("loginMessage").textContent = "";
            closeModal("loginModal");
            openAdminDrawer();
        } else {
            document.getElementById("loginMessage").textContent = t("loginError");
        }
    });
    document.getElementById("adminClose").addEventListener("click", closeAdminDrawer);
    document.getElementById("logoutAdmin").addEventListener("click", () => {
        sessionStorage.removeItem(SESSION_KEY);
        closeAdminDrawer();
    });
    document.getElementById("resetData").addEventListener("click", () => {
        if (!confirm(t("confirmReset"))) return;
        profileData = cloneData(DEFAULT_PROFILE_DATA);
        saveData();
        renderPage();
        renderAdmin();
    });
    document.getElementById("exportData").addEventListener("click", exportProfileData);
    document.getElementById("importData").addEventListener("change", importProfileData);
}

function isAdmin() {
    return sessionStorage.getItem(SESSION_KEY) === "1";
}

function openModal(id) {
    document.getElementById(id).setAttribute("aria-hidden", "false");
}

function closeModal(id) {
    document.getElementById(id).setAttribute("aria-hidden", "true");
}

function openAdminDrawer() {
    renderAdmin();
    document.getElementById("adminDrawer").setAttribute("aria-hidden", "false");
}

function closeAdminDrawer() {
    document.getElementById("adminDrawer").setAttribute("aria-hidden", "true");
}

function renderAdmin() {
    const sections = [
        { key: "education", title: "教育经历 / Education", items: profileData.education, fields: ["school", "major", "degree", "time", "details"] },
        { key: "internships", title: "实习经历 / Internships", items: profileData.internships, fields: ["company", "role", "time", "points"] },
        { key: "projects", title: "项目经验 / Projects", items: profileData.projects, fields: ["type", "title", "time", "stack", "summary", "points"] },
        { key: "awards", title: "奖项荣誉 / Awards", items: profileData.awards, fields: ["text"] },
        { key: "skills", title: "专业技能 / Skills", items: profileData.skills, fields: ["title", "text"] }
    ];
    document.getElementById("adminSections").innerHTML = sections.map(section => `
        <section class="admin-section">
            <h3>${section.title}</h3>
            ${section.items.map((item, index) => renderAdminItem(section, item, index)).join("")}
        </section>
    `).join("");
    bindAdminInputs();
}

function renderAdminItem(section, item, index) {
    const label = pick(item.title || item.school || item.company || item.text) || `${section.title} ${index + 1}`;
    return `
        <article class="admin-item" data-section="${section.key}" data-index="${index}">
            <div class="admin-item-title">
                <strong>${escapeHtml(label)}</strong>
                <label class="toggle">
                    <input type="checkbox" data-field="visible" ${item.visible ? "checked" : ""} />
                    <span>${t("show")}</span>
                </label>
            </div>
            <div class="field-list">
                ${section.fields.map(field => renderField(field, item[field])).join("")}
            </div>
            <p class="save-hint">${t("saved")}</p>
        </article>
    `;
}

function renderField(field, value) {
    if (typeof value === "string") {
        return `<label>${field}<textarea data-field="${field}">${escapeHtml(value)}</textarea></label>`;
    }
    if (value && typeof value === "object" && "zh" in value && Array.isArray(value.zh)) {
        return `
            <label>${field} ${t("zhLabel")}<textarea data-lang="zh" data-field="${field}">${escapeHtml(value.zh.join("\n"))}</textarea></label>
            <label>${field} ${t("enLabel")}<textarea data-lang="en" data-field="${field}">${escapeHtml((value.en || []).join("\n"))}</textarea></label>
        `;
    }
    if (value && typeof value === "object" && ("zh" in value || "en" in value)) {
        return `
            <label>${field} ${t("zhLabel")}<textarea data-lang="zh" data-field="${field}">${escapeHtml(value.zh || "")}</textarea></label>
            <label>${field} ${t("enLabel")}<textarea data-lang="en" data-field="${field}">${escapeHtml(value.en || "")}</textarea></label>
        `;
    }
    return "";
}

function bindAdminInputs() {
    document.querySelectorAll(".admin-item").forEach(card => {
        const sectionKey = card.dataset.section;
        const index = Number(card.dataset.index);
        const item = profileData[sectionKey][index];
        card.querySelector("[data-field='visible']").addEventListener("change", event => {
            item.visible = event.target.checked;
            saveAndRefresh(card);
        });
        card.querySelectorAll("textarea").forEach(input => {
            input.addEventListener("input", () => {
                const field = input.dataset.field;
                const lang = input.dataset.lang;
                if (!lang) {
                    item[field] = input.value.trim();
                } else if (Array.isArray(item[field][lang])) {
                    item[field][lang] = input.value.split("\n").map(line => line.trim()).filter(Boolean);
                } else {
                    item[field][lang] = input.value;
                }
                saveAndRefresh(card);
            });
        });
    });
}

function saveAndRefresh(card) {
    saveData();
    renderPage();
    const hint = card.querySelector(".save-hint");
    hint.classList.add("show");
    window.clearTimeout(card._hintTimer);
    card._hintTimer = window.setTimeout(() => hint.classList.remove("show"), 900);
}

function exportProfileData() {
    const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "touzi-profile-data.json";
    link.click();
    URL.revokeObjectURL(url);
}

function importProfileData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            profileData = mergeDefaults(JSON.parse(reader.result), cloneData(DEFAULT_PROFILE_DATA));
            saveData();
            renderPage();
            renderAdmin();
        } catch {
            alert(t("importError"));
        }
        event.target.value = "";
    };
    reader.readAsText(file);
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
