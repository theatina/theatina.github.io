/**
 * data.js - Central Data Repository for Theatina Kylafi
 * Refined based on Netcompany CV, LinkedIn, and GitHub sources.
 */

const CV_DATA = {
    profile: {
        name: "Theatina Kylafi",
        title: "AI Solutions Engineer | Data Scientist",
        aboutMeSections: [
            "<b>AI Solutions Engineer</b> with a multidisciplinary background in Language Technology, Computer / Data Science, and Business Analysis.",
            "My expertise focuses on the end-to-end design, development, and evaluation of sophisticated AI pipelines, including agentic workflows and Retrieval-Augmented Generation (RAG) systems.",
            "Specializing in the translation of complex organizational requirements into technical blueprints, I leverage my background as an IT Business Analyst to bridge the gap between business value and technical implementation. I am dedicated to establishing rigorous evaluation frameworks and optimizing model performance through data-driven analysis.",
            "My work is rooted in a modern stack, including utilization of LangChain tools, and Azure AI Services to build scalable ETL workflows and intelligent assistants. Outside of engineering, my training as a classical pianist and researcher informs my commitment to precision, structured logic, and creative problem-solving."
        ],
        snapshot: {
            expertise: [
                "GenAI Solution Design", 
                "Agentic Workflows & AI Agents", 
                "RAG System Architecture", 
                "AI Evaluation Frameworks",
                "Requirements Analysis ( BDD / Gherkin )", 
                "ETL Workflow Design"
            ],
            softskills: [
                "Team player", 
                "Critical thinker",
                "Problem solver",
                "Adaptable",
                "Curious", 
                "Creative",
                "Goal setter"
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
                    info: "<b>Legal</b> Tech solution automating requirement analysis and documentation processing using RAG architectures." 
                },
                { 
                    name: "COSMOTE", 
                    info: " <b>Telecommunications</b> tailored AI solution design, focused on data intelligence and automated test case generation." 
                },
                { 
                    name: "IPTO ASSET AI", 
                    info: "<b>Energy</b> sector initiative utilizing AI for asset management and predictive maintenance through intelligent data retrieval and analysis." 
                },
                { 
                    name: "NBG AI Assistant", 
                    info: "<b>FinTech</b> application involving the design of agentic workflows for intelligent banking assistance." 
                }
            ]
        },
        { 
            role: "IT Business Analyst", 
            company: "Software & Product Development", 
            period: "Dec 2022 – Sep 2024", 
            details: [
                "Gathered and documented functional requirements using BDD / Gherkin methodologies for high-profile international clients.",
                "Drafted detailed technical specifications and monitored software project lifecycles to ensure successful delivery.",
                "Conducted User Acceptance Testing (UAT) and provided technical support during complex system onboarding.",
                "Collaborated with cross-functional teams to translate business needs into scalable software solutions."
            ],
            projects: [
                { 
                    name: "OTE", 
                    info: "<b>Telecommunications</b> project focused on requirements analysis and solution design for a large-scale network management system." 
                },
                { 
                    name: "INTERSALONICA", 
                    info: "" 
                },
                { 
                    name: "Philip Morris International", 
                    info: "" 
                },
                { 
                    name: "Vodafone", 
                    info: "" 
                },
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
            name: "Generative AI", 
            items: ["LangGraph", "LangSmith", "Langfuse", "Prompt Flow", "Azure AI Services", "RAG Systems", "Agentic Workflows", "Prompt Engineering", "Evaluation Framework Design"] 
        },
        { 
            name: "Business Analysis | Product Management", 
            items: ["Requirements Analysis", "Solution Design", "BDD / Gherkin", "Agile Product Management", "UAT", "ETL Pipelines", "Jira", "Confluence"] 
        },
        { 
            name: "Data Science | ML | NLP", 
            items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "NLTK", "Rasa", "Word2Vec", "Librosa", "Kaldi", "Praat", "Music21"] 
        },
        {
            name: "Systems Architecture | Software Development",
            items: ["API Design", "Multithreading", "Socket Programming", "Data Structures", "Memory Management"]
        },
        { 
            name: "Programming | Languages", 
            items: ["Python", "C", "C++", "Java", "SQL", "HTML", "PHP", "Assembly", "Bash-Scripting", "Matlab", "LaTeX"] 
        },
        { 
            name: "Tools | IDEs | Operating Systems", 
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
            title: "Stress Detection", 
            tag: "Sentiment Analysis | NLP", 
            desc: "Multi-modal neural architecture for emotional state detection via lexical, syntactic, and emotional feature analysis. Resolves high-variance text classification tasks through hybrid model integration.", 
            tech: ["Sentiment Analysis", "Feature Engineering", "Natural Language Processing", "LSTM", "CNN", "GRU", "BERT"], 
            repo: "https://github.com/theatina/Stress_Detection",
            docs: "https://github.com/theatina/Stress_Detection/blob/main/Report.pdf"
        },
        { 
            title: "distilBERT QnA", 
            tag: "Model Optimization", 
            desc: "Fine-tuned transformer model for Question Answering on the SQuAD 1.1 dataset. Utilizes knowledge distillation to prioritize inference efficiency without sacrificing F1 performance.", 
            tech: ["PyTorch", "Transformers", "BERT", "DistilBERT", "NLP", "Machine Learning"], 
            repo: "https://github.com/theatina/distilBERT_QnA",
            docs: "https://github.com/theatina/distilBERT_QnA/blob/main/Report.pdf"
        },
        { 
            title: "CryptoRecommendation", 
            tag: "Predictive Analytics | Clustering", 
            desc: "Unsupervised clustering pipeline for social sentiment parsing. Employs K-Means feature vectorization to isolate market sentiment clusters from high-noise data. Demonstrates the application of clustering algorithms for actionable insights in volatile domains.", 
            tech: ["K-Means", "Clustering", "Web Scraping", "Recommendation Systems", "C"], 
            repo: "https://github.com/theatina/CryptoRecommendation",
            docs: "https://github.com/theatina/CryptoRecommendation"
        },
        { 
            title: "iJazzARTIST", 
            tag: "Deep Learning | MIR", 
            desc: "Human-computer improvisation agent utilizing RNN architecture for real-time musical spontaneity. Features MIDI synchronization and predictive sequence modeling for collaborative performance.", 
            tech: ["Music Information Retrieval", "Deep Learning", "Human–AI Interaction", "Generative AI", "RNN", "LSTM", "Music21", "Python"],
            repo: "https://github.com/theatina/iJazzARTIST",
            docs: "https://github.com/theatina/iJazzARTIST/blob/master/iJazzARTIST_CTKylafi.pdf"
        },
        { 
            title: "KVDataBase", 
            tag: "Systems Engineering", 
            desc: "High-performance, multithreaded key-value store. Optimized for thread-safe state management and concurrent socket communication in high-throughput environments.", 
            tech: ["Sockets", "Multithreading", "Data Structures", "Python"], 
            repo: "https://github.com/theatina/KVDataBase",
            docs: "https://github.com/theatina/KVDataBase/blob/master/code/docs/M111_Report_CTKylafi_LT1200012.pdf"
        },
        { 
            title: "UniPal", 
            tag: "Conversational AI", 
            desc: "NLU-driven dialogue agent for academic information retrieval. Utilizes a scalable RASA-based intent classification engine to automate institutional knowledge access.", 
            tech: ["Conversational AI", "Chatbot", "Dialogue Systems", "Rasa", "NLU", "Python"], 
            repo: "https://github.com/theatina/UniPal",
            docs: "https://github.com/theatina/UniPal/blob/master/Report.pdf"
        },
        { 
            title: "myOwnServer", 
            tag: "Systems Engineering", 
            desc: "Multithreaded HTTP server and web crawler. Demonstrates proficiency in RFC-compliant request handling, connection multiplexing, and recursive web resource discovery.", 
            tech: ["Socket API", "Data Structures", "C"], 
            repo: "https://github.com/theatina/myOwnServer",
            docs: "https://github.com/theatina/myOwnServer"
        },
        { 
            title: "miniSearch", 
            tag: "Search Engine Simulation", 
            desc: "Search engine implementation featuring custom Trie data structures. Optimized for efficient word frequency indexing and low-latency prefix lookup.", 
            tech: ["Search Indexing", "Algorithm Complexity", "Data Structures", "Trie", "C"], 
            repo: "https://github.com/theatina/miniSearch",
            docs: "https://github.com/theatina/miniSearch"
        },
        { 
            title: "JazzICat", 
            tag: "Real-time Generative AI", 
            desc: "Real-time jazz improvisation accompaniment using Recurrent Neural Networks.", 
            tech: ["Deep Learning", "LSTM", "Human–AI Interaction", "Generative AI", "Python"],
            repo: "https://github.com/theatina/JazzICat",
            docs: "https://github.com/theatina/JazzICat/blob/master/README.md"
        }
    ],

    research: [
        { 
            title: "On the Adaptability of Recurrent Neural Networks for Jazz Interaction", 
            subtitle: "Frontiers in Artificial Intelligence, 2020", 
            desc: "Adaptive sequence modeling via Recurrent Neural Networks. Provides context-aware harmonic generation that adapts to human improvisation patterns in real-time.", 
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