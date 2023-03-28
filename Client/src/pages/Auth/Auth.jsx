import React, { useState } from "react";
import { LocalFireDepartment } from "@mui/icons-material";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../action/AuthAction.js";
import { CircularProgress } from "@mui/material";

const Auth = () => {
	const dispatch = useDispatch();
	const loading = useSelector(state => state.authReducer.loading);

	const [isSignUp, setIsSignUp] = useState(true);
	const [confirmPass, setConfirmPass] = useState(true);
	console.log(loading);
	// console.log(loading);
	const [data, setData] = useState({
		firstname: "",
		lastname: "",
		username: "",
		password: "",
		confirmpass: "",
	});

	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (isSignUp) {
			// Gọi signUp từ action
			if (data.password === data.confirmpass) {
				setConfirmPass(true);
				dispatch(signUp(data));
			} else {
				setConfirmPass(false);
			}
		} else {
			// Gọi logIn từ action
			dispatch(logIn(data));
		}
	};

	const resetForm = () => {
		setConfirmPass(true);
		setData({ firstname: "", lastname: "", username: "", password: "", confirmpass: "" });
	};

	return (
		<div className="Auth">
			<div className="Auth-Left">
				<div className="Logo">
					<LocalFireDepartment
						className="Logo"
						style={{ fill: "url(#myGradient)", fontSize: 200 }}
					/>
					<svg width="0" height="0">
						<defs>
							<linearGradient id="myGradient" gradientTransform="rotate(90)">
								<stop offset="5%" stopColor="gold" />
								<stop offset="95%" stopColor="red" />
							</linearGradient>
						</defs>
					</svg>
				</div>
				<div className="Social-Name">
					<h1>Fire</h1>
					<h6>Fire giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</h6>
				</div>
			</div>
			<div className="Auth-Right">
				<form className="Info-Form-SignUp" onSubmit={handleSubmit}>
					<h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
					{isSignUp && (
						<div>
							<input
								type="text"
								placeholder="Họ"
								className="Info-Input"
								name="lastname"
								onChange={handleChange}
								value={data.lastname}
							/>
							<input
								type="text"
								placeholder="Tên"
								className="Info-Input"
								name="firstname"
								onChange={handleChange}
								value={data.firstname}
							/>
						</div>
					)}
					<div>
						<input
							type="text"
							placeholder="Tên đăng nhập"
							className="Info-Input"
							name="username"
							onChange={handleChange}
							value={data.username}
						/>
						<input
							type="password"
							placeholder="Mật khẩu"
							className="Info-Input"
							name="password"
							onChange={handleChange}
							value={data.password}
						/>
						{isSignUp && (
							<input
								type="password"
								placeholder="Xác nhận mật khẩu"
								className="Info-Input"
								name="confirmpass"
								onChange={handleChange}
								value={data.confirmpass}
							/>
						)}
						<span
							style={{
								display: confirmPass ? "none" : "block",
								color: "red",
								fontSize: 13,
								alignSelf: "center",
							}}
						>
							*Xác nhận mật khẩu của bạn không trùng khớp với mật khẩu
						</span>
					</div>

					<div>
						<span
							style={{ alignSelf: "center", cursor: "pointer" }}
							onClick={() => {
								setIsSignUp(prev => !prev);
								resetForm();
							}}
						>
							{isSignUp ? "Bạn đã có tài khoản? Đăng nhập" : "Bạn chưa có tài khoản? Đăng ký"}
						</span>
					</div>

					<button type="submit" className="Button-Main Button-Signup" disabled={loading}>
						{loading ? (
							<CircularProgress style={{ color: "white" }} size="25px" />
						) : isSignUp ? (
							"Đăng ký"
						) : (
							"Đăng nhập"
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Auth;
