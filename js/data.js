/**
 * data.js - Central Data Repository for Theatina Kylafi
 * Refined based on Netcompany CV, LinkedIn, and GitHub sources.
 */

const CV_DATA = {
    profile: {
        name: "Theatina Kylafi",
        title: "AI Solutions Engineer | Data Scientist",
        aboutMeSections: [
            "I am an AI Solutions Engineer with a multidisciplinary background in Language Technology, Computer Science, and Business Analysis. My expertise focuses on the end-to-end design, development, and evaluation of sophisticated AI pipelines, including agentic workflows and Retrieval-Augmented Generation (RAG) systems.",
            "Specializing in the translation of complex organizational requirements into technical blueprints, I leverage my background as an IT Business Analyst to bridge the gap between business value and technical implementation. I am dedicated to establishing rigorous evaluation frameworks and optimizing model performance through data-driven analysis.",
            "My work is rooted in a modern stack—utilizing tools like LangGraph, LangSmith, and Azure AI Services—to build scalable ETL workflows and intelligent assistants. Outside of engineering, my training as a classical pianist and researcher informs my commitment to precision, structured logic, and creative problem-solving."
        ],
        snapshot: {
            expertise: [
                "GenAI Solution Design", 
                "Agentic Workflows & AI Agents", 
                "RAG System Architecture", 
                "AI Evaluation Frameworks",
                "Requirements Analysis (BDD/Gherkin)", 
                "ETL Workflow Design"
            ],
            softskills: [
                "Team player", 
                "Curious", 
                "Creative",
                "Critical thinker",
                "Problem solver",
                "Goal setter",
                "Adaptable"
            ],
            languages: [
                "English ( C2 )", 
                "French ( B1 )", 
                "Greek ( Native )"
            ],
            hobbies: [
                "Piano", 
                "Choral Singing (Soprano)", 
                "Psychology", 
                "Books",
                "Photography"
            ]
        },
        contact: {
            email: "ct.kylafi@gmail.com",
            linkedin: "https://linkedin.com/in/theatinakylafi/",
            github: "https://github.com/theatina"
        }
    },

    experience: [
        { 
            role: "AI Solutions Engineer", 
            company: "Data Intelligence and AI Technology", 
            period: "Oct 2024 – Present", 
            details: [
                "Design and develop end-to-end AI solutions, focusing on LLM-based pipelines, agentic approaches, and RAG systems.",
                "Establish technical blueprints and AI evaluation frameworks to ensure measurable organizational value.",
                "Utilize LangGraph, LangSmith, and Prompt Flow for sophisticated model monitoring and observability.",
                "Analyze technical patterns to optimize model performance and data-driven insights."
            ],
            projects: [
                { 
                    name: "NOMOS AI", 
                    info: "Legal Tech solution automating requirement analysis and documentation processing using RAG architectures." 
                },
                { 
                    name: "IPTO ASSET AI", 
                    info: "Energy sector initiative utilizing AI for asset management and operational pattern analysis." 
                },
                { 
                    name: "NBG AI Assistant", 
                    info: "FinTech application involving the design of agentic workflows for intelligent banking assistance on Azure AI." 
                },
                { 
                    name: "HEDNO S.A. AI Agents", 
                    info: "Specialized AI agents for streamlined communication and data retrieval within energy distribution networks." 
                },
                { 
                    name: "COSMOTE", 
                    info: "Tailored AI solution design for telecommunications, focused on data intelligence and automated pattern detection." 
                }
            ]
        },
        { 
            role: "IT Business Analyst", 
            company: "Software & Product Development", 
            period: "Dec 2022 – Sep 2024", 
            details: [
                "Gathered and documented functional requirements using BDD/Gherkin methodologies for high-profile international clients.",
                "Drafted detailed technical specifications and monitored software project lifecycles to ensure successful delivery.",
                "Conducted User Acceptance Testing (UAT) and provided technical support during complex system onboarding.",
                "Collaborated with cross-functional teams to translate business needs into scalable software solutions."
            ],
            projects: [
                { 
                    name: "Philip Morris International", 
                    info: "Requirements gathering and specification drafting for global-scale management systems." 
                },
                { 
                    name: "Vodafone", 
                    info: "Management of BDD workflows and testing for telecommunications software deployment." 
                }
            ]
        },
        { 
            role: "Researcher", 
            company: "Academic Research (NKUA)", 
            period: "Oct 2021 – Feb 2022", 
            details: [
                "Evaluated international accessibility compliance for university digital resources.",
                "Authored comprehensive scientific reports detailing accessibility audit results and recommendations."
            ]
        },
        { 
            role: "Data Scientist / Research Intern", 
            company: "Athena Research Center", 
            period: "Jul 2019 – Jan 2021", 
            details: [
                "Developed Music Information Retrieval (MIR) algorithms and fine-tuned Deep Learning models.",
                "Designed ETL workflows for processing complex musical data and contributed to scientific publications."
            ]
        }
    ],

    skills: [
        { 
            name: "AI & GenAI Solutions", 
            items: ["LangGraph", "LangSmith", "Prompt Flow", "Azure AI Services", "RAG Systems", "AI Agents", "Prompt Engineering"] 
        },
        { 
            name: "Methodology & Business Analysis", 
            items: ["Requirements Analysis", "BDD / Gherkin", "Agile Product Management", "Technical Blueprinting", "UAT", "ETL Pipelines", "Jira", "Confluence", "Power BI"] 
        },
        { 
            name: "Data Science & Machine Learning", 
            items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "NLTK", "Rasa", "Word2Vec", "Librosa", "Kaldi", "Praat", "Music21"] 
        },
        { 
            name: "Programming & Languages", 
            items: ["Python", "C", "C++", "Java", "SQL", "HTML", "PHP", "Assembly", "Bash-Scripting", "Matlab", "LaTeX"] 
        },
        { 
            name: "Tools, IDEs & OS", 
            items: ["Git", "Visual Studio Code", "MySQL Workbench", "MongoDB", "BeautifulSoup", "Windows", "MacOS", "Linux", "Android", "iOS"] 
        }
    ],

    certifications: [
        { 
            title: "IEEE CertifAIEd™ Foundations", 
            issuer: "IEEE Standards Association", 
            date: "04/2025", 
            desc: "AI Ethics Assessment Overview and foundational principles for responsible AI implementation." 
        },
        { 
            title: "watsonx.data Technical Sales Intermediate", 
            issuer: "IBM", 
            date: "10/2024", 
            desc: "Data Governance & AI focusing on Lakehouse architectures and data-driven decision systems." 
        },
        { 
            title: "AWS Academy Cloud Foundations", 
            issuer: "Amazon Web Services", 
            date: "03/2021", 
            desc: "Core concepts of cloud computing, security, and cloud architecture." 
        }
    ],

    education: [
        { 
            degree: "M.Sc. in Language Technology", 
            school: "National & Kapodistrian University of Athens & Athena RC", 
            period: "Pending Thesis Completion", 
            focus: "Natural Language Processing and AI" 
        },
        { 
            degree: "B.Sc. in Computer Science", 
            school: "National & Kapodistrian University of Athens", 
            period: "Graduated July 2020", 
            focus: "Artificial Intelligence and Data Science" 
        },
        { 
            degree: "Classical Piano Degree", 
            school: "National Conservatory of Athens", 
            period: "Graduated 2016", 
            focus: "Performance, Music Theory, and Harmony" 
        }
    ],

    projects: [
        { 
            title: "distilBERT QnA", 
            tag: "NLP", 
            desc: "Fine-tuned transformer model optimized for high-speed Question Answering on the SQuAD dataset.", 
            tech: "PyTorch / Transformers", 
            link: "https://github.com/theatina/distilBERT_QnA" 
        },
        { 
            title: "iJazzARTIST", 
            tag: "Music AI", 
            desc: "Human-computer jazz interaction utilizing RNNs/LSTMs to emulate musical spontaneity in real-time.", 
            tech: "Python / Music21 / MIDI", 
            link: "https://github.com/theatina/iJazzARTIST" 
        }
    ],

    research: [
        { 
            title: "On the Adaptability of Recurrent Neural Networks for Jazz Interaction", 
            subtitle: "Frontiers in Artificial Intelligence, 2020", 
            desc: "Peer-reviewed research exploring musical spontaneity and neural network interaction architectures.", 
            tags: ["RNN", "LSTM", "Music AI", "Deep Learning"], 
            link: "https://doi.org/10.3389/frai.2020.508727" 
        }
    ],

    writing: [
        { 
            title: "title", 
            desc: "description", 
            link: "#" 
        }
    ],

    music: [
        { 
            title: "title", 
            desc: "description", 
            type: "type" 
        }
    ]
};