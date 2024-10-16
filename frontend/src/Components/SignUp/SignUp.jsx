import { useParams } from "react-router-dom";
import Registration_Form from "./Forms/Registration_Form";
import Login_Form from "./Forms/Login_Form";
import background_img from "../../assets/Main/background.png";
import Info_panel from "./Addons/Info_panel";
//!!! npm install @mui/material @emotion/react @emotion/styled  npm install react-hook-form

export default function SignUp() {
  const { action } = useParams();

  const isLogin = action === "login"; // http://localhost:3000/signup/login => isLogin = true | http://localhost:3000/signup/register => isLogin = false

  return (
    <div
      className="bg-light_background min-h-screen flex justify-center items-center bg-blend-darken"
      style={{ backgroundImage: `url(${background_img})` }}
    >
      <div className="login_main_area bg-light_very_gray flex justify-center items-center rounded-[53px] w-[75vw] h-[90vh]">
        <div className="login_main_area bg-light_very_gray flex rounded-[53px] w-[75vw] h-[90vh]">
          <div className="flex-1 flex justify-center items-center">
            {isLogin ? <Login_Form /> : <Registration_Form />}
          </div>
          <Info_panel/>
        </div>
      </div>
    </div>
  );
}
