import { AuthLayout } from "../catalyst/auth-layout.jsx";
import { Heading } from "../catalyst/heading.jsx";
import { Field, Label } from "../catalyst/fieldset.jsx";
import { Input } from "../catalyst/input.jsx";
import { Strong, Text, TextLink } from "../catalyst/text.jsx";
import { Button } from "../catalyst/button.jsx";
import pb from "../lib/pocketbase.js";

const Login = () => {
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(formData.get("email"), formData.get("password"));
      console.log(authData);
    } catch (error) {
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
              <TextLink href="/password-reset">
                <Strong>Forgot password?</Strong>
              </TextLink>
            </Text>
          </div>
        </Field>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Text>
          Don’t have an account?{" "}
          <TextLink href="#">
            <Strong>Sign up</Strong>
          </TextLink>
        </Text>
      </form>
    </AuthLayout>
  );
};

export default Login;
