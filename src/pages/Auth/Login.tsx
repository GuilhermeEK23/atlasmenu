import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useAuth } from "@/hooks/useAuth";
import { AuthApiError } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await signIn(email, password);

      navigate("/painel", { replace: true });
    } catch (error: AuthApiError | any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        action=""
        className="flex flex-col gap-4 w-1/3 mt-20"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Senha"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Entrar"}
        </Button>
      </form>

      <Link to="/cadastro" replace className="mt-4 text-blue-500">
        Não tem uma conta? Cadastre-se
      </Link>
    </div>
  );
};

export default Login;
