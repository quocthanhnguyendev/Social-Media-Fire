import { LocalFireDepartment, Search } from "@mui/icons-material";
import React from "react";
import "./LogoAndSearch.css";

const LogoAndSearch = () => {
	return (
		<div className="Logo-Search">
			<LocalFireDepartment className="Logo-Item" style={{ fill: "url(#myGradient)" }} />
			<svg width="0" height="0">
				<defs>
					<linearGradient id="myGradient" gradientTransform="rotate(90)">
						<stop offset="5%" stopColor="gold" />
						<stop offset="95%" stopColor="red" />
					</linearGradient>
				</defs>
			</svg>

			<div className="Search">
				<input type={Text} placeholder="Tìm kiếm trên Fire" />
				<div className="Search-Icon">
					<Search style={{ fill: "url(#myGradient)" }} className="Search-Item" />
				</div>
			</div>
		</div>
	);
};

export default LogoAndSearch;
