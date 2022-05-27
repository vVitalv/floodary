import React from 'react'

const Footer = () => {
  return (
    <footer className="flex items-center px-4 w-full bg-slate-700 text-gray-400 text-sm font-medium">
      <span>{'\u00A9'} 2022 CPL.Risitas </span>
      <a
        className="ml-2 bg-gradient-to-b from-blue-500 to-yellow-500 [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
        href="https://skillcrucial.com"
        target="_blank"
        rel="noreferrer"
      >
        SkillCrucial
      </a>
    </footer>
  )
}

export default Footer
