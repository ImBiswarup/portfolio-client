import React from 'react'
import { FaSchool, FaUniversity, FaJs, FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { GiOpenBook } from 'react-icons/gi';
import { SiExpress, SiTailwindcss, SiMongodb, SiReact } from "react-icons/si";

const About = () => {
  // Sections array: academics + tech stacks
  const sections = [
    {
      title: "Academics",
      items: [
        {
          icon: <FaSchool />,
          title: '10th Boards',
          description: [
            '🏫 Ichapur Northland High School',
            '🗓️ 2013 - 2019',
            '📝 77.71%',
          ],
        },
        {
          icon: <GiOpenBook />,
          title: '12th Boards',
          description: [
            '🏫 Ichapur Northland High School',
            '🗓️ 2019 - 2021',
            '📝 70.04%',
          ],
        },
        {
          icon: <FaUniversity />,
          title: 'College',
          description: [
            '🏫 Regent Education & Research Foundation',
            '🗓️ 2021 - 2025 (B.Tech CSE)',
            '📝 8.12',
          ],
        },
      ],
    },
    {
      title: "Tech Stacks",
      items: [
        { icon: <FaJs />, title: 'JavaScript', description: ['Strong understanding of core concepts and actively improving with hands-on projects.'] },
        { icon: <SiMongodb />, title: 'MongoDB', description: ['Experienced in designing schemas, managing collections, and building full-stack apps using MongoDB.'] },
        { icon: <SiExpress />, title: 'Express JS', description: ['Capable of building REST APIs and handling backend routing and middleware.'] },
        { icon: <FaReact />, title: 'React JS', description: ['Primary frontend framework used in most of my projects with strong component-based development skills.'] },
        { icon: <SiReact />, title: 'React Native', description: ['Beginner experience building mobile apps with React Native and Expo.'] },
        { icon: <FaNodeJs />, title: 'Node JS', description: ['Good grasp of server-side development, building APIs, and integrating databases.'] },
        { icon: <SiTailwindcss />, title: 'Tailwind CSS', description: ['My go-to CSS framework for creating responsive, modern, and clean UI designs.'] },
        { icon: <FaPython />, title: 'Python', description: ['Comfortable with Python for scripting, problem-solving, and exploring backend logic.'] },
        { icon: <SiExpress />, title: 'Next.js', description: ['Building modern full-stack applications with server-side rendering, API routes, and optimized performance.'] },
      ],
    },
  ];

  return (
    <div>
      {sections.map((section, sIndex) => (
        <section key={sIndex} className=" bg-gray-900 text-gray-400 body-font">
          <div className="container px-5 py-12 mx-auto">
            <h1 className="text-4xl font-bold text-center text-white mb-12">
              {section.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-col justify-center">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="p-6 shadow-md rounded transition-all group hover:bg-gray-400"
                >
                  <div className="w-16 h-16 mb-4 mx-auto text-indigo-400 group-hover:text-indigo-700 text-5xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-black text-white text-center">
                    {item.title}
                  </h2>
                  {item.description.map((line, i) => (
                    <p
                      key={i}
                      className="text-gray-400 font-semibold group-hover:text-black text-center"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default About
