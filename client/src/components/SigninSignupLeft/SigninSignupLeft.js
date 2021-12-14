import {Link} from 'react-router-dom';

import CustomButton from '../CustomButton/CustomButton';

import './SigninSignupLeft.css'

export default function SigninSignupLeft({header,paragraphs,btnText,btnLinksTo}) {
  return (
    <div className="welcome-wrapper">
      <h2 className="welcome-header">{header}</h2>
      <div className="cizgi" style={{background:'#f8ffff',width:'35%'}}></div>
      { 
        paragraphs && paragraphs.map((paragraph, index)=>{
          return(
            <p key={index} className="welcome-p">
              {paragraph}
            </p>
            
          )
        })
      }
      <Link to={`/${btnLinksTo}`}>
        <CustomButton style={{marginTop:'5%'}} isTransparent >
          {btnText}
        </CustomButton>
      </Link>
    </div>
  )
}
