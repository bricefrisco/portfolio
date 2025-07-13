import { AuthLayout } from "../catalyst/auth-layout.jsx";
import { Heading } from "../catalyst/heading.jsx";
import { Field, Label } from "../catalyst/fieldset.jsx";
import { Input } from "../catalyst/input.jsx";
import { Strong, Text, TextLink } from "../catalyst/text.jsx";
import { Button } from "../catalyst/button.jsx";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AlertError from "../components/AlertError.jsx";
import pb from "../lib/pocketbase.js";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);

  const redirect = useCallback(() => {
    const redirectPath = localStorage.getItem("redirect");
    if (redirectPath) {
      localStorage.removeItem("redirect");
      navigate(redirectPath);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (pb.authStore.isValid) {
      redirect();
    }
  }, [redirect]);

  const submit = async (e) => {
    e.preventDefault();
    setFailedLogin(false);
    setLoading(true);

    const formData = new FormData(e.target);
    try {
      setLoading(true);
      await pb
        .collection("users")
        .authWithPassword(formData.get("email"), formData.get("password"));
      redirect();
    } catch (error) {
      setFailedLogin(true);
      setLoading(false);
      console.warn(error);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={submit}
        method="POST"
        className="grid w-full max-w-sm grid-cols-1 gap-8"
      >
        <Heading>Sign in to your account</Heading>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input required type="email" name="email" />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input required minLength={8} type="password" name="password" />
          <div className="mt-2 text-right">
            <Text>
              <TextLink href="/reset-password">
                <Strong>Forgot password?</Strong>
              </TextLink>
            </Text>
          </div>
        </Field>
        {failedLogin && <AlertError>Invalid username or password.</AlertError>}
        <Button type="submit" className="w-full" disabled={loading}>
          Login
        </Button>
        <Text>
          Don’t have an account?{" "}
          <TextLink href="/register">
            <Strong>Sign up</Strong>
          </TextLink>
        </Text>
      </form>
    </AuthLayout>
  );
};

export default Login;
