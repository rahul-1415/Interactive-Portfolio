import { Tags } from '@App/components/Tags'
import { GetProjectsQuery } from '@App/core/graphql/queries.generated'
import styles from './styles.module.css'

type ProjectModalProps = {
  projects: GetProjectsQuery['projects']
}

type StaticProject = {
  title: string
  date: string
  description: string
  points: string[]
  tags: string[]
}

const staticProjects: StaticProject[] = [
  {
    title: 'Forest Monitoring using Hyperspectral Imaging',
    date: 'Nov 2022 - May 2023',
    description: 'This project focuses on utilizing hyperspectral imaging for forest terrain monitoring, aiming to provide detailed insights into forest contents and potential risks. It utilizes the Indian Pines dataset, which captures hyperspectral data from a forested area, and employs a hybrid classification method, including Support Vector Machines (SVM), 2D Convolutional Neural Networks (CNN), 3D CNN, M3D-CNN, SSRN, and a Hybrid model for precise forest analysis.',
    points: [
      'Utilized Indian Pines dataset for hyperspectral imaging.',
      'Employed hybrid classification methods combining SVM, 2D CNN, 3D CNN, M3D-CNN, SSRN, and a Hybrid model.',
      'Provided comprehensive insights including vegetation cover percentage, building presence, and hazard detection.'
    ],
    tags: ['Scikit-Learn', 'Machine Learning', 'TensorFlow', 'Exploratory Data Analysis', 'NumPy', 'Data Science', 'Data Analysis', 'Python', 'Pandas']
  },
  {
    title: 'IoT Device Manager using Blockchain',
    date: 'Jan 2023 - May 2023',
    description: 'This project focuses on establishing a robust and secure framework for the management of IoT devices, underpinned by the principles of data immutability and transparency, all facilitated by the innovative use of blockchain technology.',
    points: [
      'Implemented a blockchain-based solution for IoT device management.',
      'Recorded critical transactions including device registration, management, and ownership transfers.',
      'Developed a user-friendly web application using ReactJS.'
    ],
    tags: ['MetaMask', 'Truffle Framework', 'Ganache', 'Solidity', 'React.js']
  },
  {
    title: 'Web Phishing Detection',
    date: 'Aug 2022 - Nov 2022',
    description: 'The Web Phishing Detection project is a Python-based solution deployed on the IBM Cloud platform, focused on the detection of phishing websites. It incorporates machine learning techniques to enhance accuracy.',
    points: [
      'Trained 10 machine learning models for phishing detection.',
      'Deployed the highest accuracy model on IBM Cloud.',
      'Developed a website interface for user interaction with the phishing detection system.'
    ],
    tags: ['Machine Learning', 'Exploratory Data Analysis', 'Data Science', 'Data Analysis', 'Python']
  },
  {
    title: 'Path Navigation using Deep Q Learning',
    date: 'Jan 2022 - Sep 2022',
    description: 'An application developed using Kivy and PyTorch Framework. The application simulates an autonomous vehicle navigating a map I designed, complete with manually placed obstacles.',
    points: [
      'Used Deep Q Networks (DQNs) with relu activation functions for navigation.',
      'Designed a reward system to improve obstacle avoidance capabilities.',
      'Received approval for publication in ADCOM Volume 133.'
    ],
    tags: ['Machine Learning', 'NumPy', 'Python']
  },
  {
    title: 'Tournament Manager',
    date: 'Jul 2021 - Nov 2021',
    description: 'The Tournament Manager is a Java-based application designed to facilitate the efficient organization of sports tournaments.',
    points: [
      'Designed and configured tournaments for different divisions and sports.',
      'Streamlined team enrollment and player information updates.',
      'Developed using Java and MySQL.'
    ],
    tags: ['Java']
  },
  {
    title: 'Harmful Comments Classifier',
    date: 'Jan 2021 - Apr 2021',
    description: 'The "Harmful Comments Classifier" is a Python-based Natural Language Processing (NLP) project, executed within the Google Colab environment.',
    points: [
      'Developed a deep learning model for classifying comments based on toxicity.',
      'Utilized embedding techniques, bi-directional LSTM, and dense models.',
      'Executed within the Google Colab environment.'
    ],
    tags: ['Machine Learning', 'Exploratory Data Analysis', 'Data Science', 'Data Analysis', 'Python']
  },
  {
    title: 'EATERIO',
    date: 'Jan 2020 - May 2020',
    description: '"EATERIO" is a web application built using HTML, CSS, JavaScript, and MongoDB, designed to facilitate food ordering and management within organizations.',
    points: [
      'Streamlined the food ordering process within organizations.',
      'Developed using HTML, CSS, JavaScript, and MongoDB.',
      'Provided a user-friendly interface for placing and managing food orders.'
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'MongoDB']
  }
]

export const ProjectModal = ({ projects }: ProjectModalProps) => {
  return (
    <section className={styles.projects__container}>
      {projects.length > 0 && projects.map((project, index) => (
        <article key={project.slug || index} className={styles.project__container}>
          <div className={styles.project__header}>
            <h2 className={styles.project__title}>{project.title}</h2>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.project__link}
              >
                GitHub
              </a>
            )}
          </div>
          {project.description && (
            <p className={styles.project__description}>{project.description}</p>
          )}
          {project.stack && project.stack.length > 0 && (
            <Tags tags={project.stack} />
          )}
        </article>
      ))}
      
      {staticProjects.map((project, index) => (
        <article key={`static-${index}`} className={styles.project__container}>
          <div className={styles.project__header}>
            <h2 className={styles.project__title}>{project.title}</h2>
            <p className={styles.project__date}>{project.date}</p>
          </div>
          <p className={styles.project__description}>{project.description}</p>
          <ul className={styles.project__points}>
            {project.points.map((point, pointIndex) => (
              <li key={pointIndex}>{point}</li>
            ))}
          </ul>
          <div className={styles.project__tags}>
            {project.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className={styles.project__tag}>{tag}</span>
            ))}
          </div>
        </article>
      ))}
    </section>
  )
}
