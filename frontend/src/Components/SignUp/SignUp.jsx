import { useParams } from 'react-router-dom';
import Registration_Form from './Forms/Registration_Form';
import Login_Form from './Forms/Login_Form';
import background_img from '../../assets/Main/background.png';
import Info_panel from './Addons/Info_panel';
//!!! npm install @mui/material @emotion/react @emotion/styled  npm install react-hook-form

export default function SignUp() {
  const { action } = useParams();

  const isLogin = action === 'login'; // http://localhost:3000/signup/login => isLogin = true | http://localhost:3000/signup/register => isLogin = false

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-light_background bg-blend-darken"
      style={{ backgroundImage: `url(${background_img})` }}
    >
      <div className="login_main_area flex h-[90vh] w-[75vw] items-center justify-center rounded-[53px] bg-light_very_gray">
        <div className="login_main_area flex h-[90vh] w-[75vw] rounded-[53px] bg-light_very_gray">
          <div className="flex flex-1 items-center justify-center">
            {isLogin ? <Login_Form /> : <Registration_Form />}
          </div>
          <Info_panel />
        </div>
      </div>
    </div>
  );
}
