import { AuthLayout } from "../catalyst/auth-layout.jsx";
import { Heading } from "../catalyst/heading.jsx";
import { Field, Label } from "../catalyst/fieldset.jsx";
import { Input } from "../catalyst/input.jsx";
import { Button } from "../catalyst/button.jsx";
import { Strong, Text, TextLink } from "../catalyst/text.jsx";
import pb from "../lib/pocketbase.js";
import { useState } from "react";
import AlertError from "../components/AlertError.jsx";
import AlertSuccess from "../components/AlertSuccess.jsx";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    setError(false);
    setSuccess(false);
    setLoading(true);
    try {
      await pb.collection("users").requestPasswordReset(formData.get("email"));
      setLoading(false);
      setSuccess(true);
    } catch (error) {
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
        <Heading>Reset your password</Heading>
        <Text>
          Enter your email and we’ll send you a link to reset your password.
        </Text>
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" />
        </Field>
        {error && (
          <AlertError>
            An error occurred while sending password reset.
          </AlertError>
        )}
        {success && (
          <AlertSuccess>
            If that email exists, a password reset email has been sent.{" "}
            <TextLink href="/login" className="cursor-pointer">
              Login
            </TextLink>
          </AlertSuccess>
        )}
        <Button type="submit" className="w-full" disabled={loading || success}>
          Reset password
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

export default ResetPassword;
