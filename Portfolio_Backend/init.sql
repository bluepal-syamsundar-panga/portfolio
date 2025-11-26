-- Create portfolio database if it doesn't exist
USE portfolio;

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  link VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample skills
INSERT INTO skills (name) VALUES 
  ('HTML'),
  ('CSS'),
  ('JavaScript'),
  ('React.js'),
  ('Java'),
  ('Spring Boot'),
  ('MySQL'),
  ('Node.js'),
  ('Express'),
  ('Git'),
  ('Docker'),
  ('AWS'),
  ('MongoDB'),
  ('REST APIs'),
  ('Material UI'),
  ('Tailwind CSS');

-- Insert sample projects
INSERT INTO projects (title, description, link) VALUES 
  ('Weather Report Application', 'Real-time weather updates using Java Spring Boot and React with OpenWeather API integration', 'https://github.com/bluepal-syamsundar-panga'),
  ('Employee Leave Management System', 'Full-stack leave management system with Java backend, Oracle database, and HTML/CSS/JS frontend', 'https://github.com/bluepal-syamsundar-panga'),
  ('Oliva Skin & Care', 'React-based skincare app with personalized routines and product catalog', 'http://invroiceolivaclinic.com/'),
  ('Carbia Motors', 'Frontend React app for car listings and dealer information', 'https://carbook-rho.vercel.app/main'),
  ('Real Estate Explorer', 'React-based property listing and filtering application', 'https://frontend-virid-one-37.vercel.app/login');
