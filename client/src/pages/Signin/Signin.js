import SigninSignupLeft from '../../components/SigninSignupLeft/SigninSignupLeft';
import SigninRight from '../../components/SigninRight/SigninRight';

import './Signin.css';

export default function Signin() {
  
  const header='Tekrar Hoşgeldiniz'
  const paragraphs = [
    'Dijital varlıklarınızı güvenle saklayabilmek için en ideal bulut yedekleme platformu.',
    'Şimdi giriş yapın ve dijital varlıklarınızı 9oktas farkıyla saklamaya devam edin.',
    'Hesabınız yok mu ?'
  ]

  return (
    <div className="sign-in-container">
      <div className="sign-in-left">
        <SigninSignupLeft
          header={header}
          paragraphs={paragraphs}
          btnText='KAYIT OL'
          btnLinksTo='signup'
        />
      </div>
      <div className="sign-in-right">
        <SigninRight />
      </div>
    </div>
  )
}
