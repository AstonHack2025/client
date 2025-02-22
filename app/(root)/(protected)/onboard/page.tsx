"use client";
// import AcademicsForm from "../_components/academics-form";
import PersonalInfoForm from "../_components/Personal-info";
import { useState } from "react";


export default function OnboardPage() {
    const [stage, setStage] = useState(0);
    
  return (
    <>
      <section className="h-screen flex items-center justify-center">
        {/* {stage === 0 && <AcademicsForm />} */}
        {stage === 0 && <PersonalInfoForm />} 
        {/* {stage === 2 && <InterestsForm />} */}
      </section>
    </>
  );
}
