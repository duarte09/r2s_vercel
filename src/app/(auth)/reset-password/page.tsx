"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound, CheckCircle, Check } from "lucide-react";
import Link from "next/link";
import { getPasswordValidation } from "@/lib/utils";
import clsx from "clsx";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { hasMinLength, hasUppercase, hasSymbol, isValid: isValidPassword } = getPasswordValidation(newPassword);
  const handleSubmit = () => {
    if (isValidPassword && newPassword === confirmPassword) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-6 bg-white">
        <div className="w-full max-w-sm mx-auto text-center">
          {!isSuccess ? (
            <>
              <div className="flex items-center justify-start bg-blue-100 px-6 py-6 w-fit mx-auto mb-4 rounded-xl">
                <KeyRound className="h-8 w-8 text-blue-600" />
              </div>

              <h1 className="text-2xl font-semibold mb-6">Redefina sua senha</h1>

              <div className="text-left mb-4">
                <label className="text-base font-medium block mb-1">
                  Nova senha <span className="text-red-500">*</span>
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-10 text-base pr-10"
                />

                <ul className="text-sm mt-3 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check size={16} className={clsx("transition", hasMinLength ? "text-green-600" : "text-gray-400")} />
                    <span className={hasMinLength ? "text-green-600" : "text-gray-600"}>
                      Mínimo de 8 caracteres
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className={clsx("transition", hasUppercase ? "text-green-600" : "text-gray-400")} />
                    <span className={hasUppercase ? "text-green-600" : "text-gray-600"}>
                      Ao menos uma letra maiúscula
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className={clsx("transition", hasSymbol ? "text-green-600" : "text-gray-400")} />
                    <span className={hasSymbol ? "text-green-600" : "text-gray-600"}>
                      Ao menos um símbolo
                    </span>
                  </li>
                </ul>
              </div>

              <div className="text-left mb-6">
                <label className="text-base font-medium block mb-1">
                  Confirme sua nova senha <span className="text-red-500">*</span>
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 text-base"
                />
              </div>

              <Button onClick={handleSubmit} className="w-full h-10 text-base bg-blue-600 hover:bg-blue-700 text-white">
                Redefinir senha
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-start bg-blue-100 px-6 py-6 w-fit mx-auto mb-4 rounded-xl">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>

              <h1 className="text-2xl font-semibold mb-4">Tudo pronto!</h1>
              <p className="text-base text-gray-600 mb-6">
                Sua senha foi redefinida com sucesso. Utilize sua nova senha para acessar a plataforma.
              </p>

              <div className="flex justify-center">
                <Link href="/">
                  <Button className="h-10 text-base bg-blue-600 hover:bg-blue-700 text-white">
                    Voltar para o Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
