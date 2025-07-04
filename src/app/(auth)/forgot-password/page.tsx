"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { KeyRound, Mail } from "lucide-react";
import { validateEmail } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const handleSubmit = () => { if (validateEmail(email)) { setEmailSent(true); } };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-6 bg-white">
        <div className="w-full max-w-sm mx-auto text-center">
          {!emailSent ? (
            <>
              <div className="flex items-center justify-start bg-blue-100 px-6 py-6 w-fit mx-auto mb-4 rounded-xl">
                <KeyRound className="h-8 w-8 text-blue-600" />
              </div>

              <h1 className="text-3xl font-semibold mb-4">Esqueceu a senha?</h1>
              <p className="text-base text-gray-600 mb-6">
                Sem problemas. Insira no campo abaixo o e-mail vinculado à sua conta para redefinir a senha.
              </p>

              <Input
                type="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-sm mb-3"
              />

              <div className="flex flex-col items-center mt-6">
                <Button
                  onClick={handleSubmit}
                  className="w-40 h-10 text-sm bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Enviar código
                </Button>

                <Link
                  href="/"
                  className="mt-8 text-sm text-blue-600 hover:underline font-medium text-center"
                >
                  Voltar para o Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-start bg-blue-100 px-6 py-6 w-fit mx-auto mb-4 rounded-xl">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>

              <h1 className="text-3xl font-semibold mb-4">Código enviado!</h1>
              <p className="text-base text-gray-600 mb-6">
                Enviamos as instruções de redefinição de senha para o seu e-mail. Não se esqueça de conferir a caixa de spam.
              </p>

              <div className="flex justify-center mt-3">
                <Link href="/" passHref>
                  <Button className="h-10 text-sm bg-blue-600 hover:bg-blue-700 text-white">
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
