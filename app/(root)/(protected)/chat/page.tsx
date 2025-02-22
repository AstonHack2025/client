import { Navbar } from "@/components/shared/navbar";
import ChatLayout from "../_components/chat-layout";

export default function Chat(){
  return (
    <div className="h-screen">  
        <Navbar />
        <div className="relative">
          <ChatLayout />
        </div>
    </div>
  )
}


