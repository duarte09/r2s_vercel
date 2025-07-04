# R2S Frontend Next

Projeto frontend da plataforma Run2Sell utilizando:

- [Next.js](https://nextjs.org) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (componentes acessíveis e personalizáveis)
- [Radix UI](https://www.radix-ui.com/) (base comportamental dos componentes interativos)
- [Lucide React](https://lucide.dev/) (ícones de código aberto)
- [Zod](https://zod.dev/) (validação de schemas com TypeScript)
- [Evolution](https://doc.evolution-api.com/v2/pt/get-started/introduction) (api para fazer integração com o whatsapp)

## 🚀 Como rodar

1. Instale as dependências:
   ```bash
   yarn install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   ```
3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## ✨ Tecnologias

- Next.js (App Router)
- React
- Tailwind CSS

## 📁 Estrutura do Projeto

```
src/
  app/                 # Rotas e páginas (Next App Router)
  components/          # Componentes reutilizáveis e visuais
    ui/                # Componentes base (shadcn)
    pageComponents/    # Componentes maiores que montam uma pagina maior
    layout/            # Header, Footer, etc
  store/               # Redux (slices, api, persist, etc)
    services/          # Classes/objetos que encapsulam a lógica para interagir com API's
    slices/            # Divisor de estado em modulos menores 
  interfaces/          # Tipos globais
```

## 🧩 Componentes Reutilizáveis

- **Button** – botão customizável com variantes, tamanhos e loading
- **Input** – campo de texto com estilos consistentes e integração com formulário
- **Select** – dropdown acessível com opções customizadas
- **Switch** – controle de ativação/desativação
- **Checkbox** – seleção múltipla com acessibilidade
- **RadioGroup** – seleção única com agrupamento visual
- **Form / FormItem / FormLabel / FormControl / FormMessage** – estrutura integrada com `react-hook-form`
- **Alert** – mensagens de erro ou status com ícones
- **Tooltip** – dicas contextuais em hover/focus
- **Card** – bloco visual para conteúdo
- **Avatar** – imagem de usuário com fallback
- **Skeleton** – loading visual com placeholder
- **Progress** – barra de progresso animada
- **Accordion** – seções expandíveis

## ✏️ Paleta de cores do sistema

- **Cor primária**: #0046ff - Azul
- **Cor secundária**: #000000 - Preto
- **Cor terciária**: #f4f4f4 - Branco

## 💡 Boas práticas

- Componentes desacoplados e documentados
- Uso de Tailwind para estilização rápida e responsiva
- Navegação declarativa com `<Link>`
- Foco em acessibilidade e UX

## 📝 Como contribuir

1. Clone o repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha nova feature'`
4. Push na branch: `git push origin minha-feature`
5. Abra um Pull Request