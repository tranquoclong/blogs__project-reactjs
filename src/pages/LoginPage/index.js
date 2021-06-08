import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { notification } from "antd";
import { actLoginAsync } from "../../store/auth/actions";
import { Trans, Plural } from "@lingui/macro";
import { t } from "@lingui/macro";
import { useNotAuthenticated } from "../../hooks/useNotAuthenticated";

// Không cho phép người dùng quay lại trang login Nếu người dùng đã đăng nhập
// Tự xây dựng một hooks cho riêng mình
// hooks -> là một function -> (custom hooks)
// -> Có thể sử dụng được những hooks khác ở trong custom hooks của mình

export default function LoginPage() {
  const isLogin = useNotAuthenticated();

  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!formData.username || !formData.password) {
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    dispatch(actLoginAsync(formData)).then((res) => {
      if (res.ok) {
        // Thành công
        history.push("/");
      } else {
        notification.error({
          message: "Oops!",
          description: "Đăng nhập thất bại",
        });
      }

      setLoading(false);
    });
  }

  function handleChange(key) {
    return (evt) => {
      setFormData({
        ...formData,
        [key]: evt.target.value,
      });
    };
  }

  if (isLogin) {
    return null;
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="breadcrumb-outer text-center bg-red">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Login/Register Page</h2>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/">Shop</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Login/Register Page
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      {/* BreadCrumb Ends */}

      <section className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="login-form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="form-title">
                        <h2>
                          <Trans>Đăng nhập</Trans>
                        </h2>
                        <p>Register if you don't have an account.</p>
                      </div>
                    </div>
                    <div className="form-group col-xs-12">
                      <label>{<Trans>Tên đăng nhập</Trans>}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name1"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange("username")}
                      />
                    </div>
                    <div className="form-group col-xs-12">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="email1"
                        placeholder="Enter correct password"
                        value={formData.password}
                        onChange={handleChange("password")}
                      />
                    </div>
                    <div className="col-xs-12">
                      <div className="comment-btn mar-bottom-20">
                        <button className="btn-blog" isLoading={loading}>
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12">
                      <div className="checkbox-outer pull-left">
                        <input
                          type="checkbox"
                          name="vehicle2"
                          defaultValue="Car"
                        />{" "}
                        Remember Me?
                      </div>
                      <div className="login-accounts pull-right">
                        <a href="forgot-password.html" className="forgotpw">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="register-form">
                <form>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="form-title">
                        <h2>Register</h2>
                        <p>Enter your details to be a member.</p>
                      </div>
                    </div>
                    <div className="form-group col-xs-12">
                      <label>Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="form-group col-xs-12">
                      <label>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="abc@xyz.com"
                      />
                    </div>
                    <div className="form-group col-xs-12">
                      <label>Phone Number:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="date1"
                        placeholder="Select Date"
                      />
                    </div>
                    <div className="form-group col-xs-6">
                      <label>Select Password :</label>
                      <input
                        type="password"
                        className="form-control"
                        id="date"
                        placeholder="Enter Password"
                      />
                    </div>
                    <div className="form-group col-xs-6 col-left-padding">
                      <label>Confirm Password :</label>
                      <input
                        type="password"
                        className="form-control"
                        id="phnumber"
                        placeholder="Re-enter Password"
                      />
                    </div>
                    <div className="col-xs-12">
                      <div className="checkbox-outer">
                        <input
                          type="checkbox"
                          name="vehicle2"
                          defaultValue="Car"
                        />{" "}
                        I agree to the <a href="#">terms and conditions.</a>
                      </div>
                    </div>
                    <div className="col-xs-12">
                      <div className="comment-btn mar-top-30">
                        <a href="#" className="btn-blog">
                          Register Now
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
