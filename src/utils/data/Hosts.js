// import { getRandomStatus, getCPUMetrics, getMemoryMetrics } from './helpers.js';

const names = ["Linux: prd-ecom-use1.appd.local","Linux: prd-fncl-use2.appd.local"];

export const HOSTS = names.map((n, i) => {
	return {
		id: i,
		name: n,
		agents: [
			{
				name: "Order-Processing-Service (auto-detected)",
				type: "Tomcat",
				environment: "Production",
				image: "/images/agents/tomcat.png"
			},
			{
				name: "Inventory-Services (auto-detected)",
				type: "JBoss",
				environment: "Production",
				image: "/images/agents/jboss.png"
			},
			{
				name: "Ecommerce-Services (auto-detected)",
				type: "Websphere",
				environment: "Production",
				image: "/images/agents/websphere.png"
			},
			{
				name: "Web-Tier-Services (auto-detected)",
				type: "Tomcat",
				environment: "Production",
				image: "/images/agents/tomcat.png"
			}
		]
	}
});