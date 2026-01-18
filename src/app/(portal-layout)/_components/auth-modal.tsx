"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Tabs,
  Tab,
} from "@heroui/react";
import { useUserData } from "../../_context/user-data-context";
import { SignupRequest } from "../../services/fake-auth";
import { useTranslations } from "next-intl";

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { login, signup } = useUserData();
  const [loading, setLoading] = useState(false);
  const t = useTranslations();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState<
    SignupRequest & { confirmPassword: string }
  >({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  async function handleLogin() {
    try {
      setLoading(true);
      await login(loginForm.email, loginForm.password);
      onClose();
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup() {
    try {
      // ✅ Confirm password check
      if (signupForm.password !== signupForm.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      setLoading(true);
      await signup(signupForm);
      onClose();
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={open} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody>
          <Tabs fullWidth>

            {/* LOGIN TAB */}
            <Tab title={t("login")}>
              <div className="flex flex-col gap-3">
                <Input
                  label="Email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                />
                <Input
                  label="Password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
                <Button
                  color="primary"
                  isLoading={loading}
                  onPress={handleLogin}
                >
                  {t("login")}
                </Button>
              </div>
            </Tab>

            {/* SIGNUP TAB */}
            <Tab title={t("signup")}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="First Name" onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })} />
                <Input label="Last Name" onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })} />
                <Input label="Email" onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} />
                <Input label="Mobile" onChange={(e) => setSignupForm({ ...signupForm, mobile: e.target.value })} />
                <Input label="Country" onChange={(e) => setSignupForm({ ...signupForm, country: e.target.value })} />
                <Input label="Password" type="password" onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} />
                <Input label="Confirm Password" type="password" onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })} />
              </div>

              <Button
                className="mt-4"
                color="primary"
                fullWidth
                isLoading={loading}
                onPress={handleSignup}
              >
                {t("signup")}
              </Button>
            </Tab>

          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
