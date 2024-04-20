"use client";

import React, { useState, useRef } from "react";

import classes from "./LoginForm.module.css";
import * as yup from "yup";
import Swal from "sweetalert2";
import { CSSTransition } from "react-transition-group";
import { loginAction, signUpAction } from "@/actions/userAuth";
import { userLogin as userLoginSchema, userSignup as signupSchema } from "@/lib/formSchemas";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function LogInForm() {
  const [authState, setAuthState] = useState(`Log in`);
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  //
  const [loading, setLoading] = useState(false);

  return (
    <CSSTransition
      classNames={{
        enter: classes.formenter,
        enterActive: classes.formenterActive,
        enterDone: classes.formenterDone,
        exit: classes.formexit,
        exitActive: classes.formexitActive,
        exitDone: classes.formexitDone,
      }}
      timeout={{
        enter: 500,
        exit: 500,
      }}
      in={!inProp}
    >
      <form
        onSubmit={(e) => {
          setLoading(true);
          const form = e.target as HTMLFormElement;

          if (authState == `Log in`) {
            const emailInput = form.elements.namedItem("email") as HTMLInputElement;
            const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
            const email = emailInput.value;
            const password = passwordInput.value;

            try {
              userLoginSchema.validateSync({ email, password }, { abortEarly: false });
            } catch (error: any) {
              e.preventDefault();
              setLoading(false);
              if (error instanceof yup.ValidationError) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error.errors[0] ?? "",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error?.message ?? "",
                });
              }
            }
          } else if (`${authState}`.toLowerCase() == `sign up`.toLowerCase()) {
            const emailInput = form.elements.namedItem("email") as HTMLInputElement;
            const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
            const confirmPasswordInput = form.elements.namedItem(
              "confirm_password"
            ) as HTMLInputElement;
            const lastNameInput = form.elements.namedItem("lname") as HTMLInputElement;
            const firstNameInput = form.elements.namedItem("fname") as HTMLInputElement;
            const phoneNumberInput = form.elements.namedItem("phone") as HTMLInputElement;
            //
            const firstName = firstNameInput.value;
            const lastName = lastNameInput.value;
            const email = emailInput.value;
            const phoneNumber = phoneNumberInput.value;
            const password = passwordInput.value;
            const confirm_password = confirmPasswordInput.value;
            //
            try {
              signupSchema.validateSync(
                { firstName, lastName, phoneNumber, email, password, confirm_password },
                { abortEarly: false }
              );
            } catch (error: any) {
              e.preventDefault();
              setLoading(false);
              if (error instanceof yup.ValidationError) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error.errors[0] ?? "",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error?.message ?? "",
                });
              }
            }
          }
        }}
        action={authState == `Log in` ? loginAction : signUpAction}
        className={`${classes.form_container} ${classes.form} sm:p-4  mt-[4rem] `}
      >
        <div className={classes.center_container}>
          <div className={classes.login_signup}>
            <p
              onClick={() => {
                setAuthState(`Log in`);
                setInProp(false);
              }}
            >
              <span className={`${authState === "Log in" && classes.chosen}`}>log in</span>
            </p>
            <p
              onClick={() => {
                setAuthState(`Sign up`);
                setInProp(true);
              }}
            >
              <span className={`${authState === "Sign up" && classes.chosen}`}>sign up</span>
            </p>
          </div>
        </div>
        <CSSTransition
          classNames={{
            enter: classes.enter,
            enterActive: classes.enterActive,
            enterDone: classes.enterDone,
            exit: classes.exit,
            exitActive: classes.exitActive,
            exitDone: classes.exitDone,
          }}
          nodeRef={nodeRef}
          timeout={{
            enter: 500,
            exit: 500,
          }}
          unmountOnExit
          in={inProp}
        >
          <section ref={nodeRef} className={classes.name_section}>
            <div className={classes.name_container}>
              <input
                name="fname"
                type="name"
                className={classes.name_input}
                placeholder="First Name"
              />
              <hr className={classes.hrPink} />
            </div>
            <div className={classes.name_container}>
              <input
                name="lname"
                type="name"
                className={classes.name_input}
                placeholder="Last Name"
              />
              <hr className={classes.hrPink} />
            </div>
          </section>
        </CSSTransition>
        <div>
          <input
            type="email"
            name="email"
            className={classes.email_input}
            placeholder="Email Address"
          />
          <hr />
        </div>

        <CSSTransition
          classNames={{
            enter: classes.enter,
            enterActive: classes.enterActive,
            enterDone: classes.enterDone,
            exit: classes.exit,
            exitActive: classes.exitActive,
            exitDone: classes.exitDone,
          }}
          timeout={{
            enter: 500,
            exit: 500,
          }}
          unmountOnExit
          in={inProp}
        >
          <div>
            <input
              type="text"
              pattern="[0-9]*"
              name="phone"
              className={classes.name_input}
              placeholder="Phone Number"
              onChange={(event) => {
                event.target.value = event.target.value.replace(/[^0-9]/g, "");
              }}
            />
            <hr />
          </div>
        </CSSTransition>

        <div>
          <input
            name="password"
            type="password"
            className={classes.password_input}
            placeholder="Password"
          />
          <hr />
          <div className={classes.forget_password_container}>
            {authState === `Log in` && <p>forgot your password ?</p>}{" "}
          </div>
        </div>
        <CSSTransition
          classNames={{
            enter: classes.enter,
            enterActive: classes.enterActive,
            enterDone: classes.enterDone,
            exit: classes.exit,
            exitActive: classes.exitActive,
            exitDone: classes.exitDone,
          }}
          timeout={{
            enter: 500,
            exit: 500,
          }}
          unmountOnExit
          in={inProp}
        >
          <div>
            <input
              type="password"
              name="confirm_password"
              className={classes.password_input}
              placeholder="Confirm Password"
            />
            <hr />
          </div>
        </CSSTransition>

        <div className={classes.center_container}>
          <button disabled={loading} type="submit" className={classes.form_button}>
            {loading ? (
              <div className="flex justify-center items-center text-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </div>
            ) : (
              authState
            )}
          </button>
        </div>
      </form>
    </CSSTransition>
  );
}
