import React from "react";
import "./TrendCard.css";
import { TrendData } from "../../Data/TrendData";

const TrendCard = () => {
	return (
		<div className="Trend-Card">
			<h3>Xu hướng dành cho bạn</h3>
			{TrendData.map(trend => {
				return (
					<div className="Trend">
						<span>#{trend.name}</span>
						<span>{trend.shares} nghìn lượt chia sẻ</span>
					</div>
				);
			})}
		</div>
	);
};

export default TrendCard;
