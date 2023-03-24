import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "_store";

export { Nav };

function Nav() {
	const authUser = useSelector((x) => x.auth.user);
	const dispatch = useDispatch();
	const Logout = () => dispatch(logout());

	// only show nav when logged in
	if (!authUser) return null;

	return (
		<nav className="navbar navbar-expand navbar-dark bg-dark">
			<div className="navbar-nav">
				<NavLink to="/" className="nav-item nav-link">
					Home
				</NavLink>
				<NavLink to="/cards" className="nav-item nav-link">
					Cards
				</NavLink>
				<NavLink to="/cards/new" className="nav-item nav-link">
					Create Card
				</NavLink>
				<button onClick={Logout} className="btn btn-link nav-item nav-link">
					Logout
				</button>
			</div>
		</nav>
	);
}
