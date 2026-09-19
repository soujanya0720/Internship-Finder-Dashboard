/* =========================================
   INTERNSHIP DATA
========================================= */

const internships = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechNova Solutions",
        location: "Bengaluru",
        mode: "Hybrid",
        stipend: 15000,
        duration: "3 Months",
        skills: ["HTML", "CSS", "JavaScript"],
        deadline: "2026-10-05",
        icon: "T",
        description:
            "Work with the development team to build responsive and user-friendly web interfaces. You will work on real-world frontend tasks and improve your understanding of modern web development.",
        eligibility:
            "Students pursuing BE/B.Tech/BCA/MCA or related computer science programs."
    },

    {
        id: 2,
        title: "Python Developer Intern",
        company: "CodeCraft Technologies",
        location: "Remote",
        mode: "Remote",
        stipend: 12000,
        duration: "3 Months",
        skills: ["Python", "Git", "SQL"],
        deadline: "2026-09-28",
        icon: "C",
        description:
            "Assist in developing Python-based applications and APIs. Gain practical experience with Python programming, databases and software development workflows.",
        eligibility:
            "Students with basic Python programming knowledge."
    },

    {
        id: 3,
        title: "UI/UX Design Intern",
        company: "Creative Pixel Studio",
        location: "Mumbai",
        mode: "On-site",
        stipend: 10000,
        duration: "2 Months",
        skills: ["Figma", "UI Design", "UX"],
        deadline: "2026-10-12",
        icon: "P",
        description:
            "Create wireframes, prototypes and user interface designs for web and mobile applications while working with an experienced design team.",
        eligibility:
            "Students interested in UI/UX and digital product design."
    },

    {
        id: 4,
        title: "Java Developer Intern",
        company: "InnovateSoft",
        location: "Pune",
        mode: "Hybrid",
        stipend: 18000,
        duration: "4 Months",
        skills: ["Java", "Spring Boot", "SQL"],
        deadline: "2026-10-20",
        icon: "I",
        description:
            "Work on Java applications and backend services. Learn about object-oriented programming, REST APIs and enterprise application development.",
        eligibility:
            "Students with knowledge of Java and object-oriented programming."
    },

    {
        id: 5,
        title: "Data Analyst Intern",
        company: "DataSphere Analytics",
        location: "Hyderabad",
        mode: "Remote",
        stipend: 14000,
        duration: "3 Months",
        skills: ["Python", "Excel", "SQL"],
        deadline: "2026-10-08",
        icon: "D",
        description:
            "Analyze datasets, prepare reports and identify useful insights using data analysis tools and programming techniques.",
        eligibility:
            "Students interested in data analysis and visualization."
    },

    {
        id: 6,
        title: "Full Stack Developer Intern",
        company: "WebWorks India",
        location: "Bengaluru",
        mode: "On-site",
        stipend: 20000,
        duration: "6 Months",
        skills: ["HTML", "JavaScript", "Node.js"],
        deadline: "2026-11-02",
        icon: "W",
        description:
            "Develop frontend and backend features for web applications. Work with developers to build, test and improve application functionality.",
        eligibility:
            "Students familiar with web development fundamentals."
    },

    {
        id: 7,
        title: "Cloud Computing Intern",
        company: "CloudEdge Systems",
        location: "Chennai",
        mode: "Hybrid",
        stipend: 16000,
        duration: "3 Months",
        skills: ["AWS", "Linux", "Networking"],
        deadline: "2026-10-18",
        icon: "C",
        description:
            "Learn cloud infrastructure concepts and assist with cloud-based development and deployment activities.",
        eligibility:
            "Students interested in cloud computing and DevOps."
    },

    {
        id: 8,
        title: "Software Testing Intern",
        company: "QualityFirst Labs",
        location: "Pune",
        mode: "Remote",
        stipend: 9000,
        duration: "3 Months",
        skills: ["Testing", "Java", "Selenium"],
        deadline: "2026-09-30",
        icon: "Q",
        description:
            "Assist the QA team with software testing, bug reporting and test case preparation while learning software quality practices.",
        eligibility:
            "Students interested in software testing and quality assurance."
    },

    {
        id: 9,
        title: "AI/ML Intern",
        company: "FutureAI Labs",
        location: "Bengaluru",
        mode: "Hybrid",
        stipend: 22000,
        duration: "6 Months",
        skills: ["Python", "Machine Learning", "AI"],
        deadline: "2026-11-15",
        icon: "F",
        description:
            "Work on introductory machine learning projects, data preparation and experimentation with AI models.",
        eligibility:
            "Students with Python and basic machine learning knowledge."
    }
];


/* =========================================
   DOM ELEMENTS
========================================= */

const internshipGrid =
    document.getElementById("internshipGrid");

const recommendedGrid =
    document.getElementById("recommendedGrid");

const savedGrid =
    document.getElementById("savedGrid");

const searchInput =
    document.getElementById("searchInput");

const modeFilter =
    document.getElementById("modeFilter");

const locationFilter =
    document.getElementById("locationFilter");

const skillFilter =
    document.getElementById("skillFilter");

const stipendFilter =
    document.getElementById("stipendFilter");

const sortFilter =
    document.getElementById("sortFilter");

const resultCount =
    document.getElementById("resultCount");

const detailsModal =
    document.getElementById("detailsModal");

const modalContent =
    document.getElementById("modalContent");


/* =========================================
   SAVED INTERNSHIPS
========================================= */

let savedInternships =
    JSON.parse(localStorage.getItem("savedInternships")) || [];


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    populateFilters();

    updateStatistics();

    renderRecommended();

    renderInternships(internships);

    renderSaved();

    updateSavedCount();

    setupNavigation();

    loadTheme();

});


/* =========================================
   FILTER OPTIONS
========================================= */

function populateFilters() {

    const locations = [
        ...new Set(
            internships.map(item => item.location)
        )
    ];

    const skills = [
        ...new Set(
            internships.flatMap(item => item.skills)
        )
    ];

    locations.sort();
    skills.sort();

    locations.forEach(location => {

        const option =
            document.createElement("option");

        option.value = location;
        option.textContent = location;

        locationFilter.appendChild(option);
    });


    skills.forEach(skill => {

        const option =
            document.createElement("option");

        option.value = skill;
        option.textContent = skill;

        skillFilter.appendChild(option);
    });
}


/* =========================================
   CREATE INTERNSHIP CARD
========================================= */

function createCard(internship) {

    const isSaved =
        savedInternships.includes(internship.id);

    const card =
        document.createElement("div");

    card.className = "internship-card";

    card.innerHTML = `

        <div class="card-top">

            <div class="company-logo">
                ${internship.icon}
            </div>

            <button
                class="save-btn ${isSaved ? "saved" : ""}"
                onclick="toggleSave(${internship.id})"
                title="Save internship"
            >
                <i class="${
                    isSaved
                    ? "fa-solid"
                    : "fa-regular"
                } fa-bookmark"></i>
            </button>

        </div>


        <div class="card-company">
            ${internship.company}
        </div>


        <h3 class="card-title">
            ${internship.title}
        </h3>


        <div class="card-tags">

            ${internship.skills
                .map(skill =>
                    `<span class="tag">${skill}</span>`
                )
                .join("")}

        </div>


        <div class="card-info">

            <div class="card-info-row">
                <i class="fa-solid fa-location-dot"></i>
                ${internship.location}
            </div>

            <div class="card-info-row">
                <i class="fa-solid fa-laptop"></i>
                ${internship.mode}
            </div>

            <div class="card-info-row">
                <i class="fa-regular fa-clock"></i>
                ${internship.duration}
            </div>

        </div>


        <div class="card-bottom">

            <div>
                <div class="stipend">
                    ₹${internship.stipend.toLocaleString("en-IN")}/month
                </div>

                <div class="deadline">
                    Deadline: ${formatDate(internship.deadline)}
                </div>
            </div>

            <button
                class="view-btn"
                onclick="openDetails(${internship.id})"
            >
                View
            </button>

        </div>
    `;

    return card;
}


/* =========================================
   RENDER INTERNSHIPS
========================================= */

function renderInternships(data) {

    internshipGrid.innerHTML = "";

    resultCount.textContent =
        `${data.length} internship${data.length !== 1 ? "s" : ""} found`;


    if (data.length === 0) {

        internshipGrid.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-magnifying-glass"></i>

                <h3>No internships found</h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>
        `;

        return;
    }


    data.forEach(internship => {

        internshipGrid.appendChild(
            createCard(internship)
        );

    });
}


/* =========================================
   RECOMMENDED
========================================= */

function renderRecommended() {

    recommendedGrid.innerHTML = "";

    internships
        .slice(0, 3)
        .forEach(internship => {

            recommendedGrid.appendChild(
                createCard(internship)
            );

        });
}


/* =========================================
   SAVED
========================================= */

function renderSaved() {

    savedGrid.innerHTML = "";

    const saved =
        internships.filter(item =>
            savedInternships.includes(item.id)
        );


    if (saved.length === 0) {

        savedGrid.innerHTML = `

            <div class="empty-state">

                <i class="fa-regular fa-bookmark"></i>

                <h3>No saved internships</h3>

                <p>
                    Save interesting internships to find them easily later.
                </p>

            </div>
        `;

        return;
    }


    saved.forEach(internship => {

        savedGrid.appendChild(
            createCard(internship)
        );

    });
}


/* =========================================
   SAVE / UNSAVE
========================================= */

function toggleSave(id) {

    if (savedInternships.includes(id)) {

        savedInternships =
            savedInternships.filter(
                internshipId => internshipId !== id
            );

        showToast("Internship removed from saved list.");

    } else {

        savedInternships.push(id);

        showToast("Internship saved successfully.");

    }


    localStorage.setItem(
        "savedInternships",
        JSON.stringify(savedInternships)
    );


    updateSavedCount();

    updateStatistics();

    applyFilters();

    renderRecommended();

    renderSaved();
}


/* =========================================
   UPDATE SAVED COUNT
========================================= */

function updateSavedCount() {

    const count =
        savedInternships.length;

    document.getElementById(
        "sidebarSavedCount"
    ).textContent = count;
}


/* =========================================
   STATISTICS
========================================= */

function updateStatistics() {

    document.getElementById(
        "totalInternships"
    ).textContent = internships.length;


    const remote =
        internships.filter(
            item => item.mode === "Remote"
        ).length;

    document.getElementById(
        "remoteInternships"
    ).textContent = remote;


    document.getElementById(
        "savedInternships"
    ).textContent =
        savedInternships.length;


    const companies =
        new Set(
            internships.map(item => item.company)
        ).size;

    document.getElementById(
        "totalCompanies"
    ).textContent = companies;
}


/* =========================================
   SEARCH & FILTER
========================================= */

function applyFilters() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const mode =
        modeFilter.value;

    const location =
        locationFilter.value;

    const skill =
        skillFilter.value;

    const minimumStipend =
        Number(stipendFilter.value);


    let filtered =
        internships.filter(item => {

            const matchesSearch =
                item.title
                    .toLowerCase()
                    .includes(search) ||

                item.company
                    .toLowerCase()
                    .includes(search) ||

                item.skills.some(
                    itemSkill =>
                        itemSkill
                            .toLowerCase()
                            .includes(search)
                );


            const matchesMode =
                mode === "all" ||
                item.mode === mode;


            const matchesLocation =
                location === "all" ||
                item.location === location;


            const matchesSkill =
                skill === "all" ||
                item.skills.includes(skill);


            const matchesStipend =
                item.stipend >= minimumStipend;


            return (
                matchesSearch &&
                matchesMode &&
                matchesLocation &&
                matchesSkill &&
                matchesStipend
            );
        });


    filtered =
        sortInternships(filtered);


    renderInternships(filtered);
}


/* =========================================
   SORTING
========================================= */

function sortInternships(data) {

    const sorted = [...data];

    switch (sortFilter.value) {

        case "stipend-high":

            sorted.sort(
                (a, b) =>
                    b.stipend - a.stipend
            );

            break;


        case "stipend-low":

            sorted.sort(
                (a, b) =>
                    a.stipend - b.stipend
            );

            break;


        case "deadline":

            sorted.sort(
                (a, b) =>
                    new Date(a.deadline) -
                    new Date(b.deadline)
            );

            break;


        default:

            sorted.sort(
                (a, b) =>
                    b.id - a.id
            );
    }

    return sorted;
}


/* =========================================
   FILTER EVENTS
========================================= */

searchInput.addEventListener(
    "input",
    applyFilters
);

modeFilter.addEventListener(
    "change",
    applyFilters
);

locationFilter.addEventListener(
    "change",
    applyFilters
);

skillFilter.addEventListener(
    "change",
    applyFilters
);

stipendFilter.addEventListener(
    "change",
    applyFilters
);

sortFilter.addEventListener(
    "change",
    applyFilters
);


/* =========================================
   CLEAR FILTERS
========================================= */

document
    .getElementById("clearFilters")
    .addEventListener("click", () => {

        searchInput.value = "";

        modeFilter.value = "all";

        locationFilter.value = "all";

        skillFilter.value = "all";

        stipendFilter.value = "0";

        sortFilter.value = "latest";

        applyFilters();
    });


/* =========================================
   VIEW DETAILS
========================================= */

function openDetails(id) {

    const internship =
        internships.find(
            item => item.id === id
        );

    if (!internship) return;


    modalContent.innerHTML = `

        <div class="modal-header">

            <div class="modal-logo">
                ${internship.icon}
            </div>

            <div>

                <div class="modal-company">
                    ${internship.company}
                </div>

                <h2>
                    ${internship.title}
                </h2>

            </div>

        </div>


        <div class="modal-tags">

            ${internship.skills
                .map(skill =>
                    `<span class="tag">${skill}</span>`
                )
                .join("")}

        </div>


        <div class="modal-details-grid">

            <div class="modal-detail">

                <span>Location</span>

                <strong>
                    <i class="fa-solid fa-location-dot"></i>
                    ${internship.location}
                </strong>

            </div>


            <div class="modal-detail">

                <span>Work Mode</span>

                <strong>
                    ${internship.mode}
                </strong>

            </div>


            <div class="modal-detail">

                <span>Stipend</span>

                <strong>
                    ₹${internship.stipend.toLocaleString("en-IN")}/month
                </strong>

            </div>


            <div class="modal-detail">

                <span>Duration</span>

                <strong>
                    ${internship.duration}
                </strong>

            </div>


            <div class="modal-detail">

                <span>Application Deadline</span>

                <strong>
                    ${formatDate(internship.deadline)}
                </strong>

            </div>


            <div class="modal-detail">

                <span>Time Remaining</span>

                <strong>
                    ${getDaysRemaining(internship.deadline)}
                </strong>

            </div>

        </div>


        <div class="modal-section">

            <h3>About the Internship</h3>

            <p>
                ${internship.description}
            </p>

        </div>


        <div class="modal-section">

            <h3>Eligibility</h3>

            <p>
                ${internship.eligibility}
            </p>

        </div>


        <button
            class="apply-btn"
            onclick="applyInternship('${internship.title}')"
        >
            Apply for Internship
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </button>
    `;


    detailsModal.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CLOSE MODAL
========================================= */

document
    .getElementById("modalClose")
    .addEventListener("click", closeModal);


detailsModal.addEventListener(
    "click",
    event => {

        if (event.target === detailsModal) {
            closeModal();
        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


function closeModal() {

    detailsModal.classList.remove("active");

    document.body.style.overflow = "";
}


/* =========================================
   APPLY BUTTON
========================================= */

function applyInternship(title) {

    showToast(
        `Application started for ${title}.`
    );

    closeModal();
}


/* =========================================
   DATE FORMAT
========================================= */

function formatDate(date) {

    const formatted =
        new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    return formatted;
}


/* =========================================
   DAYS REMAINING
========================================= */

function getDaysRemaining(date) {

    const deadline =
        new Date(date);

    const today =
        new Date();

    deadline.setHours(23, 59, 59, 999);

    const difference =
        deadline - today;

    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (days < 0) {
        return "Deadline passed";
    }

    if (days === 0) {
        return "Last day";
    }

    if (days === 1) {
        return "1 day left";
    }

    return `${days} days left`;
}


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);
}


/* =========================================
   NAVIGATION
========================================= */

function setupNavigation() {

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll(".page-section");


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const target =
                    link.getAttribute("href");

                sections.forEach(section => {

                    section.classList.add(
                        "hidden-section"
                    );

                });


                const targetSection =
                    document.querySelector(target);

                if (targetSection) {

                    targetSection.classList.remove(
                        "hidden-section"
                    );

                }


                navLinks.forEach(item =>
                    item.classList.remove("active")
                );

                link.classList.add("active");


                updatePageTitle(target);


                document
                    .getElementById("sidebar")
                    .classList.remove("open");
            }
        );

    });
}


/* =========================================
   PAGE TITLE
========================================= */

function updatePageTitle(target) {

    const titles = {

        "#dashboard": "Dashboard",

        "#internships": "Find Internships",

        "#saved": "Saved Internships",

        "#profile": "My Profile",

        "#settings": "Settings"
    };


    document.getElementById(
        "pageTitle"
    ).textContent =
        titles[target] || "Dashboard";
}


/* =========================================
   EXPLORE BUTTON
========================================= */

document
    .getElementById("exploreBtn")
    .addEventListener("click", () => {

        document
            .querySelector('[href="#internships"]')
            .click();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


/* =========================================
   VIEW ALL
========================================= */

document
    .getElementById("viewAllBtn")
    .addEventListener("click", () => {

        document
            .querySelector('[href="#internships"]')
            .click();

    });


/* =========================================
   MOBILE MENU
========================================= */

document
    .getElementById("mobileMenu")
    .addEventListener("click", () => {

        document
            .getElementById("sidebar")
            .classList.toggle("open");

    });


/* =========================================
   FILTER TOGGLE
========================================= */

document
    .getElementById("filterToggle")
    .addEventListener("click", () => {

        document
            .getElementById("filters")
            .classList.toggle("show");

    });


/* =========================================
   DARK MODE
========================================= */

function loadTheme() {

    const theme =
        localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        updateThemeIcons(true);
    }
}


function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );

    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );


    updateThemeIcons(isDark);
}


function updateThemeIcons(isDark) {

    const icon =
        document.querySelector(
            "#themeToggle i"
        );

    if (icon) {

        icon.className =
            isDark
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

    }


    const settingsToggle =
        document.getElementById(
            "settingsThemeToggle"
        );

    if (settingsToggle) {

        settingsToggle.classList.toggle(
            "active",
            isDark
        );

    }
}


document
    .getElementById("themeToggle")
    .addEventListener(
        "click",
        toggleTheme
    );


document
    .getElementById("settingsThemeToggle")
    .addEventListener(
        "click",
        toggleTheme
    );