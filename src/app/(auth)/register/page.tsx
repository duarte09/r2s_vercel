"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Mail, UserRound } from "lucide-react";
import { formatPhoneNumberMask, validateEmail, validatePhone } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [companyName, setCompanyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const isValidPassword = hasMinLength && hasUppercase && hasSymbol;

  const handleStep1 = () => {
    const phoneValid = validatePhone(phone);
    if (companyName && cnpj && fullName && phoneValid) {
      setStep(2);
    }
  };

  const handleRegister = () => {
    if (
      validateEmail(email) &&
      isValidPassword &&
      password === confirmPassword &&
      acceptTerms
    ) {
      setStep(3);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-6 bg-white">
        <div className="w-full max-w-sm mx-auto text-center">
          {step === 1 && (
            <>
              <div className="flex items-center justify-center bg-blue-100 px-6 py-6 w-fit mx-auto mb-4 rounded-xl">
                <UserRound className="h-6 w-6 text-blue-600" />
              </div>

              <h1 className="text-2xl font-semibold mb-6">Crie uma nova conta</h1>

              <div className="space-y-4 text-left text-sm">
                <div>
                  <label className="block text-base font-medium mb-1">
                    Nome da empresa <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Ex: Nova Empresa"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium mb-1">
                    CNPJ <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="00.000.000/0000-00"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    className={cn(
                      "h-12 text-base",
                      cnpj.length > 0 && cnpj.length !== 18 && "border-red-500"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-base font-medium mb-1">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Nome completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium mb-1">
                    Telefone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="(00) 91234-5678"
                    value={phone}
                    onChange={(e) => setPhone(formatPhoneNumberMask(e.target.value))}
                    className={cn(
                      "h-12 text-base",
                      phone.length > 0 && !validatePhone(phone) && "border-red-500"
                    )}
                  />
                </div>
              </div>

              <Button
                onClick={handleStep1}
                className="w-full mt-6 h-12 text-base text-white bg-blue-600 hover:bg-blue-700"
              >
                Avançar 
              </Button>

              <p className="mt-4 text-sm text-muted-foreground">
                Já possui cadastro?{" "}
                <Link href="/" className="text-blue-600 font-medium hover:underline">
                  Faça o Login
                </Link>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center justify-center bg-blue-100 px-6 py-6 w-fit mx-auto mb-4 rounded-xl">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>

              <h1 className="text-2xl font-semibold mb-6">Crie uma nova conta</h1>

              <div className="space-y-4 text-left text-sm">
                <div>
                  <label className="block text-base font-medium mb-1">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="nome@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "h-12 text-base",
                      email.length > 0 && !validateEmail(email) && "border-red-500"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-base font-medium mb-1">
                    Senha <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base mb-2"
                  />
                  <ul className="text-sm space-y-1 pl-1">
                    <li className={cn("flex gap-1", hasMinLength ? "text-green-600" : "text-gray-600")}>
                      <Check size={14} /> Mínimo de 8 caracteres
                    </li>
                    <li className={cn("flex gap-1", hasUppercase ? "text-green-600" : "text-gray-600")}>
                      <Check size={14} /> Letra maiúscula
                    </li>
                    <li className={cn("flex gap-1", hasSymbol ? "text-green-600" : "text-gray-600")}>
                      <Check size={14} /> Um símbolo
                    </li>
                  </ul>
                </div>

                <div>
                  <label className="block text-base font-medium mb-1">
                    Confirme sua senha <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={cn(
                      "h-12 text-base",
                      confirmPassword.length > 0 &&
                        confirmPassword !== password &&
                        "border-red-500"
                    )}
                  />
                </div>

                <div className="flex items-start gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms((prev) => !prev)}
                    className="mt-1"
                  />
                  <span className="text-sm leading-snug">
                    Li e aceito os{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Termos de Uso
                    </a>{" "}
                    e{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Política de Privacidade
                    </a>
                  </span>
                </div>
              </div>

              <Button
                onClick={handleRegister}
                className="w-full mt-6 h-12 text-base text-white bg-blue-600 hover:bg-blue-700"
              >
                Criar conta
              </Button>

              <p className="mt-4 text-sm text-muted-foreground">
                Já possui cadastro?{" "}
                <Link href="/" className="text-blue-600 font-medium hover:underline">
                  Faça o Login
                </Link>
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex items-center justify-center bg-blue-100 px-6 py-6 w-fit mx-auto mb-4 rounded-xl">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-semibold mb-4">Cadastro concluído!</h1>
              <p className="text-base text-gray-600 mb-6">
                Sua conta foi criada com sucesso. Enviamos no seu e-mail um código
                para a verificação da sua conta.
              </p>
              <Button
                asChild
                className="w-full h-12 text-base text-white bg-blue-600 hover:bg-blue-700"
              >
                <Link href="/">Voltar para o Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
