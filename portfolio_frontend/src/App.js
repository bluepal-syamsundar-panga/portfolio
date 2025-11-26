import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Java Developer'];

  const certificates = [
    {
      id: 1,
      name: 'Cisco Cyber Security',
      image: '/Cisco Certificate.jpeg',
      description: 'In this course, I learned the fundamentals of cybersecurity, including network security, threat detection, and risk mitigation strategies. This certification enhances my ability to secure web applications and protect organizational data, making me a valuable asset in developing secure software solutions.'
    },
    {
      id: 2,
      name: 'Android App Development',
      image: '/Android_App_Development.jpg',
      description: 'This course covered Android app development using Java and Android Studio, focusing on building user interfaces, managing app lifecycles, and integrating APIs. These skills enable me to create robust mobile applications, expanding my expertise in cross-platform development.'
    },
    {
      id: 3,
      name: 'Frontend Development',
      image: '/IBM.jpg',
      description: 'Through IBM\'s frontend development course, I gained proficiency in HTML, CSS, JavaScript, and React.js, mastering responsive web design and dynamic user interfaces. This certification strengthens my ability to build engaging and user-friendly web applications, critical for modern software development.'
    },
    {
      id: 4,
      name: 'Java',
      image: '/Java Certificate.png',
      description: 'This course deepened my knowledge of Java programming, covering core and advanced concepts like object-oriented programming, multithreading, and Spring Boot. These skills are essential for building scalable backend systems, enhancing my versatility as a full-stack developer.'
    },
    {
      id: 5,
      name: 'Full Stack Java Developer',
      image: '/Java Certificate.png',
      description: 'As a Full Stack Java Developer, I\'ve learned to build complete web applications using technologies like React.js, Core Java, Spring Boot, and MySQL. I also gained hands-on experience with tools like Git, Maven, Docker, and Postman, and deployed projects on platforms like Heroku and Vercel.'
    }
  ];

  const projectImages = [
    '/Weather.webp',
    '/Employee.png',
    '/olivaclinic_logo.jpg',
    '/car.png',
    '/Realestate.jpg'
  ];

  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
    
    // Fetch skills
    fetch(`${apiBase}/api/skills`)
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.log('Skills API error:', err));
    
    // Fetch projects
    fetch(`${apiBase}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.log('Projects API error:', err));

    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(roleInterval);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm)
      });
      
      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setContactForm({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('Failed to send message.');
        setTimeout(() => setFormStatus(''), 3000);
      }
    } catch (error) {
      setFormStatus('Failed to send message.');
      setTimeout(() => setFormStatus(''), 3000);
    }
  };

  const toggleResumeModal = () => {
    setIsResumeOpen(!isResumeOpen);
  };

  const openCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  const flipIn = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const roleTypewriter = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: 'auto',
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeInOut', delay: 0.2 }
    },
    exit: { width: 0, opacity: 0, transition: { duration: 0.3 } }
  };

  const modalZoom = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: 'spring', bounce: 0.4 } }
  };

  const pulse = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3, yoyo: Infinity } }
  };

  const bounce = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, type: 'spring', bounce: 0.5 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-inter">
      {/* Navbar - RESPONSIVE */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-black bg-opacity-90 text-white-500 p-2 sm:p-4 fixed w-full top-0 z-20 shadow-2xl"
      >
        <div className="container mx-auto flex justify-between items-center px-2 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, textShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}
            className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight cursor-pointer hover:text-white transition-colors duration-300"
            onClick={toggleResumeModal}
          >
            <span className="hidden sm:inline">Panga Syamsundar Rao</span>
            <span className="sm:hidden text-sm">PSR</span>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
            {['About', 'Skills', 'Projects', 'Certificates', 'Experience', 'Education', 'Contact'].map((item, idx) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-white border-b-2 border-white"
                className="cursor-pointer hover:text-white transition-colors duration-300 font-medium text-xs sm:text-sm lg:text-base"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}
                >
                  {item}
                </motion.div>
              </Link>
            ))}
            <motion.i
              whileHover={{ scale: 1.2, rotate: 360, textShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}
              className="fas fa-user-circle text-2xl lg:text-3xl cursor-pointer hover:text-white"
              onClick={toggleResumeModal}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.i
              whileHover={{ scale: 1.2, rotate: 360, textShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}
              className="fas fa-user-circle text-xl cursor-pointer hover:text-white"
              onClick={toggleResumeModal}
            />
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-lg focus:outline-none"
              whileHover={{ scale: 1.1 }}
            >
              <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black bg-opacity-95 mt-2 rounded-lg overflow-hidden"
            >
              <div className="flex flex-col space-y-2 p-3 sm:p-4">
                {['About', 'Skills', 'Projects', 'Certificates', 'Experience', 'Education', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    to={item.toLowerCase()}
                    smooth={true}
                    duration={500}
                    spy={true}
                    activeClass="text-white border-l-2 border-red-500 pl-2"
                    className="cursor-pointer hover:text-white transition-colors duration-300 font-medium py-2 pl-2 text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* About - RESPONSIVE */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden pt-20 md:pt-0 px-4 sm:px-6">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black to-black-500 opacity-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1], x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto flex flex-col md:flex-row items-center justify-between z-10 gap-6 md:gap-8"
        >
          <div className="w-full md:w-2/3 text-center md:text-left mb-8 md:mb-0">
            <motion.h1
              variants={slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-red-500 leading-tight"
            >
              Welcome to My Portfolio
            </motion.h1>
            <motion.p
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white mb-4 md:mb-6"
            >
              I am a well-organized, energetic, and goal-oriented fresher, possessing a positive attitude, problem-solving,
              and leadership skills with a flair to explore suitable avenues in software development with good knowledge in
              Java, frontend development, C, and Oracle. To work in an organization that provides me with ample
              opportunities to enhance my skills and knowledge while contributing to the growth of the organization.
            </motion.p>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRole}
                variants={roleTypewriter}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-4 md:mt-6 text-xl sm:text-2xl font-semibold text-red-500 overflow-hidden whitespace-nowrap"
              >
                {roles[currentRole]}
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div
            className="w-full md:w-1/3 flex justify-center"
            variants={bounce}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="/syam.webp"
              alt="Panga Syamsundar Rao"
              className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Skills - RESPONSIVE */}
      <section id="skills" className="py-12 md:py-20 bg-black px-4 sm:px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 md:mb-10 text-white-500"
          >
            Skills
          </motion.h2>

          <motion.h6
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-left mb-8 md:mb-10 text-xs sm:text-sm md:text-base text-white-500 leading-relaxed"
          >
            Skills represent the core strengths that define one's ability to perform effectively in various roles. They encompass both technical knowledge and soft abilities such as communication, teamwork, and adaptability. Continuously developing and refining skills is essential for personal growth and staying competitive in an ever-evolving professional landscape
          </motion.h6>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                variants={flipIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
                className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-2xl md:rounded-3xl text-center font-semibold text-xs sm:text-sm md:text-base text-white border border-red-500 shadow-lg"
              >
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects - RESPONSIVE */}
      <section id="projects" className="py-12 md:py-20 bg-black px-4 sm:px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 md:mb-10 text-white-500"
          >
            Projects
          </motion.h2>

          <motion.h6
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-left mb-8 md:mb-10 text-xs sm:text-sm md:text-base text-white-500 leading-relaxed"
          >
            Projects are a reflection of practical skills, creativity, and problem-solving ability. They provide hands-on experience and demonstrate how theoretical knowledge is applied to real-world challenges. Through projects, one can showcase technical expertise, innovation, and the ability to work independently or collaboratively to build meaningful solutions.
          </motion.h6>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                variants={flipIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
                className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-red-500 shadow-lg"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mb-2">{project.title}</h3>
                <img
                  src={projectImages[idx]}
                  alt={project.title}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg mb-4 border border-red-500"
                />
                <p className="text-white text-xs sm:text-sm md:text-base mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-white transition-colors duration-300 font-semibold text-sm"
                >
                  View Project
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Certificates - RESPONSIVE */}
      <section id="certificates" className="py-12 md:py-20 bg-black px-4 sm:px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 md:mb-10 text-white-500"
          >
            Certificates
          </motion.h2>

          <motion.h6
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-left mb-8 md:mb-10 text-xs sm:text-sm md:text-base text-white-500 leading-relaxed"
          >
            Certificates validate one's commitment to learning and professional development. They demonstrate specialized knowledge, skills, and proficiency in specific areas, often reflecting industry standards. Earning certifications showcases dedication, enhances credibility, and adds value in a competitive job market.
          </motion.h6>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                variants={flipIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
                className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-red-500 shadow-lg"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mb-2">{cert.name}</h3>
                <p className="text-xs sm:text-sm md:text-base text-white mb-4">{cert.description}</p>
                <motion.button
                  variants={pulse}
                  initial="rest"
                  whileHover="hover"
                  onClick={() => openCertificateModal(cert)}
                  className="bg-white text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold w-full text-xs sm:text-sm shadow-lg"
                >
                  View Certificate
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience - RESPONSIVE */}
      <section id="experience" className="py-12 md:py-20 bg-black px-4 sm:px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 md:mb-10 text-white-500"
          >
            Experience
          </motion.h2>

          <motion.h6
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-left mb-8 md:mb-10 text-xs sm:text-sm md:text-base text-white-500 leading-relaxed"
          >
            Experience plays a vital role in transforming knowledge into practical skills. It allows individuals to apply what they've learned, adapt to real-world challenges, and grow through continuous learning and problem-solving. Professional experience not only enhances technical expertise but also develops teamwork, communication, and leadership abilities essential for success in any field.
          </motion.h6>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <motion.div
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
              className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-red-500 shadow-lg"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mb-2">Full Stack Developer</h3>
              <p className="text-white text-xs sm:text-sm md:text-base">
                <a
                  href="https://bluepal.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-white hover:underline"
                >
                  Bluepal
                </a> - Present
              </p>
              <p className="text-white text-xs sm:text-sm md:text-base">Working as a Full Stack Developer, contributing to web application development using Java, React, and other modern technologies.</p>
            </motion.div>
            <motion.div
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
              className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-red-500 shadow-lg"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mb-2">Full Stack Java Developer Course</h3>
              <p className="text-white text-xs sm:text-sm md:text-base">Naresh I Technologies, Hyderabad</p>
              <p className="text-white text-xs sm:text-sm md:text-base">I have completed a Full-Stack Development course during which I gained hands-on experience in both frontend and backend technologies. On the backend, I learned C, Core Java, Advanced Java, Spring Boot, Microservices, and Oracle. On the frontend, I worked with HTML, CSS, JavaScript, and React.js.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Education - RESPONSIVE */}
      <section id="education" className="py-12 md:py-20 bg-black px-4 sm:px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 md:mb-10 text-white-500"
          >
            Education
          </motion.h2>

          <motion.h5
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-left mb-8 md:mb-10 text-xs sm:text-sm md:text-base text-white-500 leading-relaxed"
          >
            Education is the cornerstone of personal and professional growth. It shapes critical thinking, nurtures creativity, and builds the foundation for lifelong learning. Through education, individuals gain the knowledge and skills necessary to adapt, innovate, and contribute meaningfully to the world.
          </motion.h5>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                title: 'B.Tech in Computer Science & Engineering',
                details: 'CT University, Punjab : 2020 - 2024',
                description: 'Graduated with a CGPA of 7.2, specializing in software development and computer science principles.'
              },
              {
                title: 'Intermediate (M.P.C)',
                details: 'Sri Chaitanya Junior College, Visakhapatnam : 2018 - 2020',
                description: 'Completed with a CGPA of 8.7, with a focus on Mathematics, Physics, and Chemistry.'
              },
              {
                title: 'Secondary School Certificate (SSC)',
                details: 'Bradlaugh School - 2018',
                description: 'Achieved a CGPA of 9.2, with a strong foundation in core academic subjects.'
              }
            ].map((edu, idx) => (
              <motion.div
                key={idx}
                variants={flipIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
                className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-red-500 shadow-lg"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mb-2">{edu.title}</h3>
                <p className="text-white text-xs sm:text-sm md:text-base">{edu.details}</p>
                <p className="text-white text-xs sm:text-sm md:text-base">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact - RESPONSIVE */}
      <section id="contact" className="py-12 md:py-20 bg-black px-4 sm:px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-10 text-white-500"
          >
            Contact Me
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full md:w-1/2 mb-6 md:mb-0 flex flex-col items-center md:items-start"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4">Contact Form</h3>
              <p className="text-sm sm:text-base md:text-lg text-white-500 mb-2 text-center md:text-left leading-relaxed">
                Feel free to reach out for any queries or opportunities.<br />
                I will get back to you as soon as possible!
              </p>
              <div className="w-20 h-1 bg-red-500 rounded-full mt-2 mb-2"></div>
            </motion.div>
            <motion.div
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full md:w-1/2 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl md:rounded-3xl"
            >
              <form onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <label className="block text-sm sm:text-base md:text-lg mb-1 font-semibold text-gray-500">Name</label>
                  <motion.input
                    type="text"
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 bg-white-800 text-black text-sm"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm sm:text-base md:text-lg mb-1 font-semibold text-gray-500">Email</label>
                  <motion.input
                    type="email"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 bg-white-800 text-black text-sm"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm sm:text-base md:text-lg mb-1 font-semibold text-gray-500">Message</label>
                  <motion.textarea
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 bg-white-800 text-black text-sm"
                    rows="3"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <motion.button
                  variants={pulse}
                  initial="rest"
                  whileHover="hover"
                  type="submit"
                  className="bg-black text-white-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 w-full font-bold shadow-lg text-sm"
                >
                  Send Message
                </motion.button>
                {formStatus && (
                  <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="mt-4 text-center text-red-500 text-sm"
                  >
                    {formStatus}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer - RESPONSIVE */}
      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-black bg-opacity-90 backdrop-blur-xl text-white-500 p-3 sm:p-4 fixed bottom-0 w-full z-20"
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6">
            {[
              { href: 'https://www.linkedin.com/in/panga-syamsundar-rao-39b192226/', icon: 'fab fa-linkedin', label: 'LinkedIn' },
              { href: 'https://www.instagram.com/syam_panga/', icon: 'fab fa-instagram', label: 'Instagram' },
              { href: 'https://wa.me/918919004890', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
              { href: 'https://www.naukri.com/mnjuser/profile', icon: 'fas fa-briefcase', label: 'Naukri' }
            ].map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:text-white transition-all duration-300 text-xs sm:text-sm font-semibold"
                variants={pulse}
                initial="rest"
                whileHover="hover"
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <i className={link.icon}></i>
                <span className="hidden sm:inline">{link.label}</span>
              </motion.a>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs sm:text-base font-semibold text-white-500 text-center"
          >
            Developed by Syam
          </motion.div>
        </div>
      </motion.footer>

      {/* Resume Modal - RESPONSIVE */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              variants={modalZoom}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-gradient-to-br from-black to-black-500 bg-opacity-90 backdrop-blur-xl p-4 sm:p-8 rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-red-500"
            >
              <motion.h2
                variants={slideIn}
                initial="hidden"
                animate="visible"
                className="text-2xl sm:text-3xl font-bold text-red-500 mb-6"
              >
                Resume
              </motion.h2>
              <div className="text-white text-xs sm:text-sm md:text-base">
                <motion.h3
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-xl sm:text-2xl font-semibold mb-2 text-red-500"
                >
                  Panga Syamsundar Rao
                </motion.h3>
                <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mb-4">
                  Phone: +91-8919004890 | Email: syampanga2003@gmail.com
                </motion.p>
                <motion.h4
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-lg sm:text-xl font-semibold mt-4 mb-2 text-red-500"
                >
                  Career Objective
                </motion.h4>
                <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mb-4 leading-relaxed">
                  I am a well-organized, energetic, and goal-oriented fresher, possessing a positive attitude, problem-solving, and leadership skills with a flair to explore suitable avenues in software development with good knowledge in Java, frontend development, C, and Oracle.
                </motion.p>
              </div>
              <motion.button
                variants={pulse}
                initial="rest"
                whileHover="hover"
                onClick={toggleResumeModal}
                className="mt-6 bg-white text-red-500 p-2 sm:p-3 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 w-full font-bold shadow-lg text-sm sm:text-base"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal - RESPONSIVE */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              variants={modalZoom}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-gradient-to-br from-black to-black-500 bg-opacity-90 backdrop-blur-xl p-4 sm:p-8 rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-red-500"
            >
              <motion.h2
                variants={slideIn}
                initial="hidden"
                animate="visible"
                className="text-2xl sm:text-3xl font-bold text-red-500 mb-6"
              >
                {selectedCertificate.name}
              </motion.h2>
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.name}
                className="w-full h-auto object-contain rounded-lg mb-6 border border-red-500"
              />
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-white mb-6 text-xs sm:text-sm md:text-base leading-relaxed"
              >
                {selectedCertificate.description}
              </motion.p>
              <motion.button
                variants={pulse}
                initial="rest"
                whileHover="hover"
                onClick={closeCertificateModal}
                className="bg-black text-black-500 p-2 sm:p-3 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 w-full font-bold shadow-lg text-sm sm:text-base"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default App;
