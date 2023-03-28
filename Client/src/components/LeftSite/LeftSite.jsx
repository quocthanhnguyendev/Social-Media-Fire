import React from "react";
import "./LeftSite.css";
import LogoAndSearch from "../LogoAndSearch/LogoAndSearch";
import TrendCard from "../TrendCard/TrendCard";

const LeftSite = () => {
	return (
		<div className="Left-Site">
			<LogoAndSearch />
			<TrendCard />
		</div>
	);
};

export default LeftSite;
