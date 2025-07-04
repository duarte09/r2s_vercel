"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { validateEmail } from "@/lib/utils";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const router = useRouter();

  const isFormValid =
    formData.email !== "" &&
    formData.password !== "" &&
    validateEmail(formData.email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Preencha um e-mail válido e a senha.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/assets/R2S_logo&text_blue.png"
              alt="Run2Sell Logo"
              width={260}
              height={60}
              className="h-auto w-auto max-w-[260px]"
              priority
            />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="nome@exemplo.com"
                required
                className="h-12 text-base"
              />
            </div>

            <div>
              <Label htmlFor="password" className="mb-2 block">
                Senha
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 text-base pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                  Lembre-se
                </Label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full h-12 text-base flex justify-center"
            >
              {isLoading ? "Conferindo credenciais..." : "Entrar"}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Não possui uma conta?{" "}
              </span>
              <Link
                href="/register"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Crie uma conta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
