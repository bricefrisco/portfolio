import { AuthLayout } from "../catalyst/auth-layout.jsx";
import { Heading } from "../catalyst/heading.jsx";
import { Field, Label } from "../catalyst/fieldset.jsx";
import { Input } from "../catalyst/input.jsx";
import { Strong, Text, TextLink } from "../catalyst/text.jsx";
import { Button } from "../catalyst/button.jsx";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Alert from "../components/Alert.jsx";
import pb from "../lib/pocketbase.js";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [failedRegistration, setFailedRegistration] = useState("");

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
    setFailedRegistration("");
    setLoading(true);

    const formData = new FormData(e.target);
    try {
      setLoading(true);

      await pb.collection("users").create({
        email: formData.get("email"),
        password: formData.get("password"),
        passwordConfirm: formData.get("password"),
      });

      await pb
        .collection("users")
        .authWithPassword(formData.get("email"), formData.get("password"));
      redirect();
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.email?.code === "validation_not_unique") {
        setFailedRegistration("Email already registered!");
      } else {
        setFailedRegistration("Error occurred during registration.");
      }
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={submit}
        method="POST"
        className="grid w-full max-w-sm grid-cols-1 gap-8"
      >
        <Heading>Create your account</Heading>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input required type="email" name="email" />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input required minLength={8} type="password" name="password" />
        </Field>
        {failedRegistration && <Alert>{failedRegistration}</Alert>}
        <Button type="submit" className="w-full" disabled={loading}>
          Create account
        </Button>
        <Text>
          Already have an account?{" "}
          <TextLink href="/login">
            <Strong>Sign in</Strong>
          </TextLink>
        </Text>
      </form>
    </AuthLayout>
  );
};

export default Login;
