import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("signin");

  const handleSignUpSuccess = () => {
    setActiveTab("signin");
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Connexion</TabsTrigger>
          <TabsTrigger value="signup">Inscription</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>

        <TabsContent value="signup">
          <SignUpForm onSuccess={handleSignUpSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
}