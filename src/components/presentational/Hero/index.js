import React from 'react'
import PropTypes from 'prop-types'

const Hero = ({ children }) => {
  return (
    <div>
      <section className="hero is-success">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Shout Social Media</h1>
          </div>
        </div>
      </section>

      <div className="section">{children}</div>
    </div>
  )
}

Hero.propTypes = {
  children: PropTypes.node.isRequired
}

export default Hero
