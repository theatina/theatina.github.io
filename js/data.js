/**
 * CV_DATA: Central Data Repository for Theatina Kylafi
 * This file powers the interactive components of the portfolio.
 */

const CV_DATA = {
    profile: {
        name: "Theatina Kylafi",
        title: "AI Solutions Engineer | Artistic Creator",
        aboutMeSections: [
            "I am an AI Solutions Engineer specializing in production-grade RAG architectures and agentic workflows, currently contributing to GenAI innovation at Netcompany. My work focuses on designing and delivering end-to-end intelligent systems, from data pipelines and ETL processes to model integration and deployment, for complex, real-world use cases.",
            "I have a strong foundation in machine learning and data science, with experience across the full lifecycle of AI systems, including data preprocessing, feature engineering, and scalable architecture design. My background also extends to Music Information Retrieval (MIR), where I explore the intersection of signal processing, machine learning, and musical structure.",
            "My background bridges Language Technology and Generative AI. With an M.Sc. in progress and formal training in classical piano, I operate at the intersection of structured reasoning and creative expression.",
            "Beyond engineering, I engage in research and music. I’m particularly interested in shaping AI systems that are not only powerful, but intuitive, elegant, and human-centered."
        ],        
        location: "Athens, Greece",
        contact: {
            email: "ct.kylafi@gmail.com",
            linkedin: "https://www.linkedin.com/in/theatinakylafi/",
            github: "https://github.com/theatina"
        }
    },
    cv: {
        experience: [
            { 
                role: "AI Solutions Engineer", 
                company: "Netcompany", 
                period: "2022 - Present", 
                details: [
                    "Orchestrating enterprise-level GenAI solutions and multi-agent systems.",
                    "Specializing in RAG optimization and LLMOps frameworks (LangSmith, LangFuse).",
                    "Ensuring production scalability, observability, and rigorous model evaluation."
                ]
            },
            { 
                role: "Researcher (e-Accessibility)", 
                company: "NKUA", 
                period: "2021 - 2022", 
                details: [
                    "Developed technology-driven accessibility solutions for diverse user needs.",
                    "Focused on inclusive UX and linguistic adaptation of digital tools."
                ]
            },
            { 
                role: "Deep Learning Researcher", 
                company: "Athena Research Center (ILSP)", 
                period: "2019 - 2020", 
                details: [
                    "Published research on Recurrent Neural Networks (RNNs) for real-time human-computer jazz interaction. Explored the intersection of LSTM architectures and musical spontaneity to create an intelligent accompanist."
                ]
            }
        ],
        education: [
            { 
                degree: "M.Sc. in Language Technology", 
                school: "National & Kapodistrian University of Athens", 
                period: "In Progress", 
                focus: "Natural Language Processing, Neural Architectures, and Generative AI" 
            },
            { 
                degree: "Classical Piano Degree", 
                school: "National Conservatory", 
                period: "Graduated with Honors", 
                focus: "Classical Performance, Advanced Music Theory, and Composition" 
            },
            { 
                degree: "B.Sc. in Informatics & Telecommunications", 
                school: "NKUA", 
                period: "Graduated 2020", 
                focus: "Artificial Intelligence and Music Information Retrieval (MIR)" 
            }
        ],
        skillCategories: [
            { 
                name: "LLMOps & Orchestration", 
                items: ["LangGraph", "LangChain", "LangFuse", "LangSmith", "Prompt Engineering", "Agentic Workflows"] 
            },
            { 
                name: "Core AI / ML", 
                items: ["Python", "PyTorch", "Transformers (HuggingFace)", "RAG Architectures", "Vector Databases", "Keras"] 
            },
            { 
                name: "Engineering & Cloud", 
                items: ["C++", "SQL", "Git", "Azure AI", "MongoDB", "Linux/Bash", "LaTeX"] 
            },
            { 
                name: "Creative Technology", 
                items: ["Music Information Retrieval", "MIDI Processing", "Neural Music Synthesis", "Digital Audio Workstations"] 
            }
        ]
    },
    projects: [
        { 
            title: "iJazzARTIST", 
            tag: "Research",
            desc: "A real-time intelligent accompanist using LSTMs to respond to human jazz improvisation. Featured in Frontiers in AI.", 
            tech: "Python / RNNs / MIDI", 
            link: "https://github.com/theatina/iJazzARTIST" 
        },
        { 
            title: "Agentic Research Assistant", 
            tag: "GenAI",
            desc: "A multi-agent system designed to scrape, synthesize, and critique academic literature using LangGraph and GPT-4o.", 
            tech: "LangGraph / OpenAI / Tavily", 
            link: "#" 
        },
        { 
            title: "distilBERT QnA", 
            tag: "NLP",
            desc: "Fine-tuned transformer model optimized for high-speed Question Answering on the SQuAD1.1 dataset.", 
            tech: "HuggingFace / PyTorch", 
            link: "https://github.com/theatina/distilBERT_QnA" 
        },
        { 
            title: "CryptoRecommendation", 
            tag: "Data Science",
            desc: "Recommendation system using tweet sentiment analysis to project market trends.", 
            tech: "Python / Twitter API / NLP", 
            link: "https://github.com/theatina/CryptoRecommendation" 
        }
    ],
    research: [
        { 
            title: "On the Adaptability of Recurrent Neural Networks", 
            tag: "Publication",
            subtitle: "Frontiers in Artificial Intelligence",
            desc: "Peer-reviewed research on human-computer jazz interaction using RNNs to emulate musical spontaneity.", 
            tags: ["Neural Networks", "LSTM", "Music AI"],
            link: "https://doi.org/10.3389/frai.2020.508727" 
        },
    ],
    writing: [
        { 
            title: " Title", 
            desc: " Description ", 
            platform: " Platform ", 
            link: "#" 
        }
    ],
    music: [
        { 
            title: " Title ", 
            desc: " Description ", 
            type: "Piano Performance", 
            link: "#" 
        }
    ]
};