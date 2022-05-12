import React from 'react'

const Footer = () => {
  return (
    <footer className="h-10 w-full bg-slate-700">
      {'\u00A9'} 2022 CPL.Risitas{' '}
      <a
        className="[background:linear-gradient(#2563eb,#facc15)] [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
        href="https://skillcrucial.com"
        target="_blank"
        rel="noreferrer"
      >
        SkillCrucial
      </a>
    </footer>
  )
}

Footer.propTypes = {}

export default React.memo(Footer)
