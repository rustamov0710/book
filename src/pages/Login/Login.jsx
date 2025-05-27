import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { API } from '../../utils/config';
import { toast } from 'react-toastify';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {  
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/signup', { 
        name: values.username,
        key: values.password,
        secret: 'MySecret1',
      });

      console.log(res.data.data);
       localStorage.setItem('key', res.data.data.key);
    localStorage.setItem('secret', res.data.data.secret);
      setAuth(true);
      toast.success('Sign In successful!');
      navigate('/');
    } catch (err) {
      console.log(err);
      setError('Username or password is incorrect! Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[430px] bg-white rounded-xl shadow-lg px-7 py-12">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Sign in</h2>

          <label htmlFor="username" className="text-sm text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-3 px-4 w-full mb-5"
            required
          />

                   <label htmlFor="password" className="text-sm text-gray-700 mb-1">Password</label>
         <div className="relative mb-5">
           <input
             type={showPassword ? "text" : "password"}
             id="password"
             placeholder="Enter your password"
             value={values.password}
             onChange={handleChange}
             className="border border-gray-300 rounded-lg py-3 px-4 w-full pr-10"
             required
           />
           <button
             type="button"
             onClick={() => setShowPassword((prev) => !prev)}
             className="absolute right-3 top-4 text-gray-500 text-xl"
           >
             {showPassword ? <AiOutlineEyeInvisible />
          : <AiOutlineEye />
         }
           </button>
         </div>

          {error && <p className="text-red-600 text-sm mb-5">{error}</p>}

          <button
            type="submit"
            className="py-3 w-full bg-purple-800 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition mb-4"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Not signed up yet?{' '}
          <Link to="/signup" className="text-purple-700 hover:underline">
            Go to sign up.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
