import React from 'react';
import logoImage from '../../images/logo.svg';
import BackToTop from '../../images/Back to top button.svg';
import './Footer.scss'

export const Footer = () => {
  return (
    <div className="footer">
      <div>
          <img src={logoImage} alt="logo"/>
      </div>
      <div className="footer__nav">
        <div className="footer__list">
          <a href="src/components#">Github</a>
        </div>
        <div>Contacts</div>
        <div>Rights</div>
      </div>

      <div>
        <button>
          <img src={BackToTop} alt="Back to top"/>
        </button>
      </div>
    </div>
  )
}
