const SocialIcons = () => (
    <div className="social-icons">
        <a href="https://github.com/wolfblunt" title="GitHub" target="_blank">
            <i className="fab fa-github"></i>
        </a>
        <a href="https://x.com/_wolfblunt" title="X (formerly Twitter)" target="_blank">
            <i className="fab fa-x-twitter"></i>
        </a>
        <a href="https://linkedin.com/in/aman-khandelwal-01a50612a" title="LinkedIn" target="_blank">
            <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://medium.com/@wolfblunt" title="Medium" target="_blank">
            <i className="fab fa-medium"></i>
        </a>
        <a href="https://www.instagram.com/wolfblunt" title="Instagram" target="_blank">
            <i className="fab fa-instagram"></i>
        </a>
    </div>
);

const SectionHeader = ({ title, index }) => (
    <div className="section-header" data-index={index}>
        <h2>{title}</h2>
    </div>
);

const SkillTag = ({ skill }) => <span className="skill-tag">{skill}</span>;

const SkillCategory = ({ category, skills }) => (
    <div className="skill-category">
        <h3 className="category-title">{category}</h3>
        <div className="category-skills">
            {skills.map((skill, index) => (
                <SkillTag key={index} skill={skill} />
            ))}
        </div>
    </div>
);

const SkillsSection = ({ skillCategories }) => (
    <section className="section">
        <SectionHeader title="Skills" index={2} />
        <div className="skills-container">
            {Object.entries(skillCategories).map(([category, skills], index) => (
                <SkillCategory key={index} category={category} skills={skills} />
            ))}
        </div>
    </section>
);

const ExperienceItem = ({ title, company, date, description }) => (
    <div className="experience-item">
        <div className="experience-header">
            <div className="experience-company-name">{company}</div>
            <div className="experience-date">{date}</div>
        </div>
        <div className="experience-title">
            <em>{title}</em>
        </div>
        <p className="experience-content">
        {Array.isArray(description) ? (
              description.map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))
            ) : (
              description
            )}
        </p>
    </div>
);

const ProjectCard = ({ title, description, tags, github, status }) => (
    <div className="project-card">
        <div className="project-content">
            <div className="project-title">
                {title}
                {status && <span className="project-status skill-tag">{status}</span>}
            </div>
            <div className="project-description">{description}</div>
            <div className="project-tags">
                {tags.map((tag, index) => (
                    <span key={index} className="skill-tag-project">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
        {github && (
            <div className="project-links">
                <a href={github.url} className="btn github-btn" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i> GitHub
                </a>
            </div>
        )}
    </div>
);

const TechnicalInfoDisplay = ({ occupation, location, career_overview }) => (
    <div className="technical-info-display">
        <div className="terminal-header">
            <div className="terminal-button red"></div>
            <div className="terminal-button yellow"></div>
            <div className="terminal-button green"></div>
        </div>
        <div className="terminal-body">
            <p><span className="command">$ more aman.json</span></p>
            <pre className="json-output">
{`{
 "name": "Aman Khandelwal",
 "career_overview": ${JSON.stringify(career_overview)},
 "occupation": ${JSON.stringify(occupation)},
 "location": "${location}"
}`}
            </pre>
            <p><span className="command">$ echo $CodingProfiles</span></p>
            <p className="skill-output">- <a href="https://leetcode.com/u/amanKhandelwal/">Leetcode </a><br></br>
            - <a href="https://www.geeksforgeeks.org/user/amankhandelwal/?utm_source=geeksforgeeks&utm_medium=my_profile&utm_campaign=auth_user">GeeksForGeeks </a> <br></br>
            - <a href="https://www.naukri.com/code360/profile/wolfblunt">Coding Ninjas </a>
            </p>
        </div>
    </div>
);

const TechyDownloadButton = ({ url }) => {
    const [isTyping, setIsTyping] = React.useState(false);
    const [isDownloading, setIsDownloading] = React.useState(false);
    const [typedText, setTypedText] = React.useState("");
    const fullText = "./download_resume.sh";
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsTyping(true);
                }
            },
            { threshold: 0.5 }
        );

        const container = document.querySelector(".techy-download-container");
        if (container) observer.observe(container);

        return () => {
            if (container) observer.unobserve(container);
        };
    }, []);

    React.useEffect(() => {
        if (isTyping && typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [isTyping, typedText]);

    const handleClick = (e) => {
        e.preventDefault();
        setIsDownloading(true);
        // Simulate download process
        setTimeout(() => {
            setIsDownloading(false);
            window.open(url, '_blank');
        }, 2000);
    };

    return (
        <div className="techy-download-container">
            <div className="command-prompt">
                $ <span className="command-text">{typedText}</span>
                {isTyping && typedText.length < fullText.length && <span className="cursor"></span>}
            </div>
            <a href={url} className="techy-download-button" onClick={handleClick}>
                {isDownloading ? "Downloading..." : "Download Resume"}
            </a>
        </div>
    );
};

const TechnicalNameDisplay = ({ name }) => {
    const [visibleChars, setVisibleChars] = React.useState(0);
    const [showCursor, setShowCursor] = React.useState(false);

    React.useEffect(() => {
        if (visibleChars < name.length) {
            const typingTimer = setTimeout(() => {
                setVisibleChars((prev) => prev + 1);
            }, 120);
            return () => clearTimeout(typingTimer);
        } else {
            setShowCursor(true);
        }
    }, [name, visibleChars]);

    return (
        <div className="name-display">
            {name.split("").map((char, index) => (
                <span key={index} className={`name-char ${index < visibleChars ? "visible" : ""}`} style={char === " " ? { marginRight: "0.3em" } : {}}>
                    {char}
                </span>
            ))}
            {showCursor && <span className="name-underscore"></span>}
        </div>
    );
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            textAlign: 'center',
            padding: '10px 0',
            fontSize: '0.8em',
            color: '#999',
            backgroundColor: 'transparent'
        }}>
            &copy; {currentYear} {' '}
            <a 
                href="/"
                style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3498db'}
                onMouseLeave={(e) => e.target.style.color = '#999'}
            >
                Aman Khandelwal
            </a>
        </footer>
    );
};

const App = () => {
    const personalInfo = {
					career_overview: "Wizard of Code",
                    occupation: ["Software Developer", "Learner Extraordinaire"],
                    location: "Hyderabad, India"
                };

    const skillCategories = {
        Languages: ["Python", "C++", "JavaScript", "C", "Java"],
        Frontend: ["HTML/CSS", "React", "Bootstrap"],
        Backend: ["Flask", "FastAPI", "NodeJS"],
        Databases: ["MySQL", "MongoDB"],
        "Cloud & DevOps": ["Docker", "Git", "CI/CD", "SonarQube"],
		"Machine Learning & AI" : ["PyTorch", "Numpy", "Pandas", "Matplotlib/Seaborn"],
    };
    const workExperience = [
        {
            title: "Full Stack Engineer",
            company: "IHub-Data",
            date: "June '24 - Present",
            description: ["- Designed and maintained scalable server-side architecture, managed databases, optimized queries, and ensured data integrity.",
            "- Built robust RESTful APIs, implemented secure authentication and authorization systems, and optimized performance."],
        },
        {
            title: "Backend Software Engineer",
            company: "Knimbus",
            date: "March '22 - May '23",
            description: ["- Led Perl API development to enhance data acquisition, increasing retrieval speed by 30% and cutting manual extraction efforts by 50%.", 
            "- End-to-end owner, responsible for implementing code optimization strategies leading to a 20% enhancement in overall system efficiency.",
            "- Implemented an internal feature to log all service failures and bugs, resulting in a 70% decrease in recurrent issues and ensuring smoother user experiences."],
        },
        {
            title: "Software Developement Engineer",
            company: "Knowledge Lens",
            date: "June '20 - March '21",
            description: ["- Engineered a scalable scheduling pipeline using Python.",
            "- Developed Report Plugin with upload/download, boosting user efficiency by 50% and reducing report generation/access time by 40%.",
            "- Improved the application’s scalability and achieved a significant reduction in API response time by approximately 40%.",
            "-Authored clean, clear, and thoroughly tested code for various services."],
        }
    ];

    React.useEffect(() => {
        const sections = document.querySelectorAll(".section");
        const sectionHeaders = document.querySelectorAll(".section-header");
        const totalSections = sections.length;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;

                let progress = 0;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    // Calculate progress within the current section
                    progress = (scrollPosition - sectionTop) / (sectionHeight - windowHeight);
                    progress = Math.max(0, Math.min(1, progress));
                } else if (scrollPosition >= sectionBottom) {
                    // If we've scrolled past this section, set progress to 100%
                    progress = 1;
                }

                // Calculate the translateX based on the progress
                const translateX = progress * 100;
                sectionHeaders[index].style.setProperty("--translateX", `${translateX}%`);
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial call to set positions

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const projects = [
        {
            title: "Peer To Peer Group Based File Sharing System",
            description: "Built a group based file sharing system where users can share, download files from the group they belong to. Download should be parallel with multiple pieces from multiple peers.",
            tags: ["C++", "SHA1", "Networking", "Sockets", "Multi-Threading"],
            github: { url: "https://github.com/wolfblunt/Peer-to-Peer-Group-Based-File-Sharing-System" },
            status: "Completed",
        },
		{
            title: "File Explorer Application",
            description: "Built a fully functional File Explorer Application, with a restricted feature set in Normal Mode and Command Mode",
            tags: ["C++", "UNIX", "Signal.h", "Terminos.h"],
            github: { url: "https://github.com/wolfblunt/File-Explorer-Application", stars: 1 },
            status: "Completed"
        },
        {
            title: "Notes Backend Assignment",
            description: "Built a secure and scalable RESTful API that allows users to create, read, update, and delete notes. The application should also allow users to share their notes with other users and search for notes based on keywords.",
            tags: ["Python", "Flask", "MongoDB", "Git", "RestAPI"],
            github: { url: "https://github.com/wolfblunt/NotesBackendAssignment", stars: 0 },
            status: "Completed"
        },
        {
            title: "Relational Database Engine",
            description: "Implemented a relational database from the ground up that supports essential SQL operations such as INSERT, PRINT, JOIN, GROUP BY, and EXTERNAL SORT, ensuring data persistence.",
            tags: ["C++"],
            github: { url: "https://github.com/wolfblunt/Relational-Database-Engine", stars: 0 },
            status: "Completed"
        },
        {
            title: "Deep Image Prior",
            description: "Restoring images with the power of deep neural networks. This project leverages the inherent structure of DNNs to perform image restoration tasks, offering a novel alternative to traditional data-driven approaches like denoising and inpainting.",
            tags: ["Keras", "Pandas", "Numpy", "Tensorflow", "PIL"],
            github: { url: "https://github.com/wolfblunt/Deep-Image-Prior", stars: 0 },
            status: "Completed"
        },
        {
            title: "Style Transfer",
            description: "Implement a Style Transfer Algorithm using deep learning techniques.",
            tags: ["Tensorflow", "Pillow", "Pandas", "matplotlib"],
            github: { url: "https://github.com/wolfblunt/StyleTransfer" },
            status: "Completed",
        },
        {
            title: "Medical Keyword Extraction",
            description: "Develop a domain-specific NLP system for medical transcriptions by fine-tuning a pre-trained language model and evaluating against a baseline.",
            tags: ["Torch", "Numpy", "Pandas", "Transformers", "NLTK", "KeyBERT"],
            github: { url: "https://github.com/wolfblunt/MedicalKeywordExtraction" },
            status: "Completed",
        }
    ];

    return (
                    <div className="container" style={{
						position: 'relative',
						minHeight: '100vh',
						paddingBottom: '120px'  // Adjust this value based on your footer's height
					}}>
						{/* <BlogLink /> */}
                        <header className="header">
                            <TechnicalNameDisplay name="Aman Khandelwal" />
                            <p className="subtitle">Software Engineer</p>
                            <SocialIcons />
                        </header>

                        <div className="unnamed-section">
                            <TechnicalInfoDisplay {...personalInfo} />
                        </div>

                        <section className="section">
                            <SectionHeader title="About" index={0} />
                            <div className="about-content">
                                <p>
                                I am a dedicated and skilled software engineer with a Master of Technology in Computer Science and Engineering from IIIT Hyderabad. My academic journey included rigorous coursework in Advanced Data Structures and Algorithms, Natural Language Processing, Statistical Methods in Machine Learning, Distributed Systems, and Cognitive Neuroscience, equipping me with a strong foundation in both theoretical and practical aspects of computer science.
                                <br></br>
                                <br></br>
                                My professional expertise spans server-side development, database management, and API development. I excel in designing and maintaining scalable, reliable, and secure server-side architectures, creating and optimizing databases, and building robust RESTful and GraphQL APIs. I am also proficient in implementing secure authentication and authorization systems and optimizing performance bottlenecks.
                                <br></br>
                                <br></br>
                                Beyond my professional life, I am an avid cricket enthusiast, love traveling, enjoy watching movies, and have a passion for cooking. My academic achievements include qualifying for GATE with a 97 percentile among 1 lakh students, reflecting my dedication and commitment to excellence.
                                </p>
                            </div>
                            <TechyDownloadButton url="https://drive.google.com/file/d/1osOZVvWtLNTc4l-dLJ7m2624gHESWVl0/view?usp=sharing" />
                        </section>

                        <SkillsSection skillCategories={skillCategories} />

                        <section className="section">
                            <SectionHeader title="Work Experience" index={2} />
                                {workExperience.map((exp, index) => (
                                    <ExperienceItem key={index} {...exp} />
                            ))}
                        </section>


                        <section className="section">
                            <SectionHeader title="Projects" index={3} />
                            <div className="projects-grid">
                                {projects.map((project, index) => (
                                    <ProjectCard key={index} {...project} />
                                ))}
                            </div>
                        </section>
						
						<Footer />
                    </div>
                );
            };

            ReactDOM.render(<App />, document.getElementById("root"));