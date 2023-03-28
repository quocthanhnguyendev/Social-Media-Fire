import React from "react";
import "./TopBar.css";
import LogoAndSearch from "../LogoAndSearch/LogoAndSearch";
import Navbars from "../Navbars/Navbars";

const TopBar = () => {
	return (
		<div className="TopBar">
			<div>
				<LogoAndSearch />
			</div>
			<div>
				<Navbars />
			</div>
		</div>
	);
};

export default TopBar;
