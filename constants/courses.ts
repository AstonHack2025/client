interface Course {
    name: string;
    link: string;
    difficulty: string;
}

interface CourseCategories {
    [key: string]: Course[];
}

const courseCategories: CourseCategories = {
    "Artificial Intelligence": [
        { name: "Getting Started with Artificial Intelligence", link: "https://skills.yourlearning.ibm.com/activity/PLAN-E624C2604060?ngo-id=0302", difficulty: "Beginner" },
        { name: "Artificial Intelligence Fundamentals", link: "https://academic.ibm.com/a2mt/downloads/artificial_intelligence?cardID=115", difficulty: "Beginner" },
        { name: "Fundamentals of Sustainability and Technology", link: "https://academic.ibm.com/a2mt/downloads/artificial_intelligence?cardID=116", difficulty: "Beginner" },
        { name: "Building Trustworthy AI Enterprise Solutions", link: "https://academic.ibm.com/a2mt/downloads/artificial_intelligence?cardID=117", difficulty: "Intermediate" },
        { name: "Building AI Solutions Using Advanced Algorithms and Open Source Frameworks", link: "https://academic.ibm.com/a2mt/downloads/artificial_intelligence?cardID=118", difficulty: "Advanced" },
        { name: "Generative AI in Action", link: "https://academic.ibm.com/a2mt/downloads/artificial_intelligence?cardID=120", difficulty: "Intermediate" },
    ],
    Capstone: [
        { name: "Getting Started with Threat Intelligence and Hunting", link: "https://academic.ibm.com/a2mt/downloads/capstone?cardID=25", difficulty: "Beginner" },
        { name: "Journey to Cloud: Envisioning Your Solution", link: "https://academic.ibm.com/a2mt/downloads/capstone?cardID=26", difficulty: "Advanced" },
        { name: "Getting Started with Artificial Intelligence", link: "https://academic.ibm.com/a2mt/downloads/capstone?cardID=141", difficulty: "Beginner" },
        { name: "Getting Started with Data", link: "https://academic.ibm.com/a2mt/downloads/capstone?cardID=142", difficulty: "Beginner" },
        { name: "Getting Started with Cybersecurity", link: "https://academic.ibm.com/a2mt/downloads/capstone?cardID=143", difficulty: "Beginner" },
    ],
    "Data Science": [
        { name: "Getting Started with Data", link: "https://academic.ibm.com/a2mt/downloads/data_science?cardID=123", difficulty: "Beginner" },
        { name: "Enterprise Data Science in Practice", link: "https://academic.ibm.com/a2mt/downloads/data_science?cardID=62", difficulty: "Intermediate" },
        { name: "Machine Learning for Data Science Projects", link: "https://academic.ibm.com/a2mt/downloads/data_science?cardID=63", difficulty: "Intermediate" },
        { name: "Data Fundamentals", link: "https://academic.ibm.com/a2mt/downloads/data_science?cardID=64", difficulty: "Beginner" },
        { name: "OpenDS4All", link: "https://academic.ibm.com/a2mt/downloads/data_science?cardID=65", difficulty: "Beginner" },
    ],
    "IBM Automation": [
        { name: "IBM Process Mining Collection", link: "https://academic.ibm.com/a2mt/downloads/ibm_automation?cardID=31", difficulty: "Beginner" },
        { name: "IBM Robotic Process Automation - Basic I", link: "https://academic.ibm.com/a2mt/downloads/ibm_automation?cardID=32", difficulty: "Beginner" },
        { name: "IBM Robotic Process Automation - Basic II", link: "https://academic.ibm.com/a2mt/downloads/ibm_automation?cardID=33", difficulty: "Beginner" },
    ],
    "IBM Cloud": [
        { name: "Journey to Cloud: Envisioning Your Solution", link: "https://academic.ibm.com/a2mt/downloads/ibm_cloud?cardID=83", difficulty: "Intermediate" },
        { name: "Cloud Computing Fundamentals", link: "https://academic.ibm.com/a2mt/downloads/ibm_cloud?cardID=85", difficulty: "Beginner" },
        { name: "Journey to Cloud: Orchestrating Your Solution", link: "https://academic.ibm.com/a2mt/downloads/ibm_cloud?cardID=88", difficulty: "Intermediate" },
        { name: "Journey to Cloud: Transforming Your Culture", link: "https://academic.ibm.com/a2mt/downloads/ibm_cloud?cardID=87", difficulty: "Advanced" },
    ],
    "IBM Security": [
        { name: "Getting Started with Cybersecurity", link: "https://academic.ibm.com/a2mt/downloads/ibm_security?cardID=122", difficulty: "Beginner" },
        { name: "Getting Started with Threat Intelligence and Hunting", link: "https://academic.ibm.com/a2mt/downloads/ibm_security?cardID=98", difficulty: "Beginner" },
        { name: "Cybersecurity Fundamentals", link: "https://academic.ibm.com/a2mt/downloads/ibm_security?cardID=99", difficulty: "Beginner" },
        { name: "Enterprise Security in Practice", link: "https://academic.ibm.com/a2mt/downloads/ibm_security?cardID=100", difficulty: "Intermediate" },
        { name: "Security Operations Center in Practice", link: "https://academic.ibm.com/a2mt/downloads/ibm_security?cardID=101", difficulty: "Advanced" },
    ],
    "IBM Z": [
        { name: "Introduction to IBM Z", link: "https://academic.ibm.com/a2mt/downloads/ibm_z?cardID=11", difficulty: "Beginner" },
        { name: "IBM Z System Administrator", link: "https://academic.ibm.com/a2mt/downloads/ibm_z?cardID=12", difficulty: "Beginner" },
        { name: "Architecting Applications with IBM Z", link: "https://academic.ibm.com/a2mt/downloads/ibm_z?cardID=13", difficulty: "Intermediate" },
        { name: "DevOps Transformations for IBM zSystems and CICD pipelines with DBB Git", link: "https://academic.ibm.com/a2mt/downloads/ibm_z?cardID=14", difficulty: "Intermediate" },
        { name: "Application Modernization with IBM z/OS", link: "https://academic.ibm.com/a2mt/downloads/ibm_z?cardID=15", difficulty: "Beginner" },
        { name: "z/OS Introduction", link: "https://academic.ibm.com/a2mt/downloads/ibm_z?cardID=17", difficulty: "Beginner" },
    ],
    "Quantum Computing": [{ name: "IBM Quantum Learning", link: "https://academic.ibm.com/a2mt/downloads/quantum_computing?cardID=48", difficulty: "Beginner" }],
    "Red Hat Academy": [
        { name: "Red Hat System Administration I (RH124)", link: "https://academic.ibm.com/a2mt/downloads/red_hat_academy?cardID=1", difficulty: "Beginner" },
        { name: "Red Hat System Administration II (RH134)", link: "https://academic.ibm.com/a2mt/downloads/red_hat_academy?cardID=2", difficulty: "Intermediate" },
        { name: "Red Hat Enterprise Linux Automation with Ansible (RH294)", link: "https://academic.ibm.com/a2mt/downloads/red_hat_academy?cardID=3", difficulty: "Advanced" },
        { name: "Introduction to OpenShift Applications (DO101)", link: "https://academic.ibm.com/a2mt/downloads/red_hat_academy?cardID=4", difficulty: "Beginner" },
        { name: "Red Hat OpenShift I: Containers & Kubernetes (DO180)", link: "https://academic.ibm.com/a2mt/downloads/red_hat_academy?cardID=5", difficulty: "Intermediate" },
        { name: "Red Hat OpenStack Administration I: Core Operations for Domain Operators (CL110)", link: "https://academic.ibm.com/a2mt/downloads/red_hat_academy?cardID=6", difficulty: "Advanced" },
        { name: "Red Hat Application Development I: Programming in Java EE (AD183)", link: "https://academic.ibm.com/a2mt/downloads/red_hat_academy?cardID=7", difficulty: "Advanced" },
    ],
};

export default courseCategories;