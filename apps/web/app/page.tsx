"use client"
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { SignUp } from "@/components/SignUp";
import { useState } from "react";

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "signin" | "signup">("home");

	  const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ 
				behavior: 'smooth', 
				block: 'start',
				inline: 'nearest'
			});
		}
	};

	const scrollToFeatures = () => scrollToSection('features');
	const scrollToPricing = () => scrollToSection('pricing');

	// if (currentView === "dashboard") {
	// 	return (
	// 	<div className="min-h-screen bg-background text-foreground dark">
	// 		<Dashboard onBackToHome={() => setCurrentView("home")} />
	// 	</div>
	// 	);
	// }

	// if (currentView === "signin") {
	// 	return (
	// 	<div className="min-h-screen bg-background text-foreground dark">
	// 		<SignIn 
	// 		onBackToHome={() => setCurrentView("home")}
	// 		onNavigateToSignUp={() => setCurrentView("signup")}
	// 		onNavigateToDashboard={() => setCurrentView("dashboard")}
	// 		/>
	// 	</div>
	// 	);
	// }

	if (currentView === "signup") {
		return (
		<div className="min-h-screen bg-background text-foreground dark">
			<SignUp 
			onBackToHome={() => setCurrentView("home")}
			onNavigateToSignIn={() => setCurrentView("signin")}
			onNavigateToDashboard={() => setCurrentView("dashboard")}
			/>
		</div>
		);
	}

	return (
		<div className="min-h-screen bg-background text-foreground dark">
			<Header 
				onNavigateToDashboard={() => setCurrentView("dashboard")}
				onNavigateToSignIn={() => setCurrentView("signin")}
				onNavigateToSignUp={() => setCurrentView("signup")}
				onScrollToFeatures={scrollToFeatures}
        		onScrollToPricing={scrollToPricing}
			/>
			<main>
				<Hero 
					onNavigateToDashboard={() => setCurrentView("dashboard")}
					onNavigateToSignUp={() => setCurrentView("signup")}
				/>
				<Features />
				<Pricing onNavigateToSignUp={() => setCurrentView("signup")} />
			</main>
			<Footer />
		</div>
	);
}
