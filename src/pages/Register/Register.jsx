import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { API } from '../../utils/config';
import { toast } from 'react-toastify';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
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

    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
    const res = await API.post('/signup', { 
      name: values.username,
      email: values.email,
      key: values.password,
      secret: 'MySecret1',
    });

    console.log(res.data.data);
    localStorage.setItem('key', res.data.data.key);
    localStorage.setItem('secret', res.data.data.secret);
    setAuth(true);
    toast.success('Sign Up successful!');
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
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Sign up</h2>

          <label htmlFor="username" className="text-sm text-gray-700 mb-1">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-3 px-4 w-full mb-5"
            required
          />
          <label htmlFor="email" className="text-sm text-gray-700 mb-1">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            defaultValue={values.email}
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


<label htmlFor="confirmPassword" className="text-sm text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
            className={`border rounded-lg py-3 px-4 w-full mb-5 ${
              values.password !== values.confirmPassword && values.confirmPassword
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            required
          />

          {error && <p className="text-red-600 text-sm mb-5">{error}</p>}

          <button
            type="submit"
            className="py-3 w-full bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition mb-4"
          >
            Submit
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Already signed up?{' '}
          <Link to="/signin" className="text-purple-700 hover:underline">
            Go to sign in.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
