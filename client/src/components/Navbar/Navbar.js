import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

import CustomButton from '../CustomButton/CustomButton';

import './Navbar.css';

export default function Navbar() {

  const { logout, error, isPending}  = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        {
          !user ?
            <>
              <li><Link to="/signup">Üye Ol</Link></li>
              <li><Link to="/signin">Giriş Yap</Link></li>
            </>
          :
            <>
              <li>
                {isPending ?
                <CustomButton disabled>yükleniyor...</CustomButton>
              :
                <CustomButton onClick={logout}>Çıkış</CustomButton>
              }
              </li> 
            </>
        }
        {error && <p>{error}</p>}
      </ul>
    </div>
  )
}
