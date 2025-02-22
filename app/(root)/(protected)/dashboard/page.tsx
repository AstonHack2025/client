import { Navbar } from "@/components/shared/navbar";
import Dashboard from "../_components/dashboard";

export default function DashboardPage(){
  return (
    <>  
        <Navbar />
        <section className="h-screen">
            <Dashboard />
        </section>
    </>
  )
}
