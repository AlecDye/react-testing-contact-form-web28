import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm";

test("Renders App without crashing", () => {
  render(<App />);
});

// inputs need "id" prop
test("Rendering form inputs", () => {
  const { getByLabelText } = render(<ContactForm />);
  getByLabelText(/first name/i);
  getByLabelText(/last name/i);
  getByLabelText(/email/i);
  getByLabelText(/message/i);
});

// email had placeholder in label not input
test("Rendering form placeholders", () => {
  const { getByLabelText } = render(<ContactForm />);
  const firstNameInput = getByLabelText(/first name/i);
  const lastNameInput = getByLabelText(/last name/i);
  const emailInput = getByLabelText(/email/i);
  const messageInput = getByLabelText(/message/i);

  expect(firstNameInput).toHaveAttribute("placeholder");
  expect(lastNameInput).toHaveAttribute("placeholder");
  expect(emailInput).toHaveAttribute("placeholder");
  expect(messageInput).toHaveAttribute("placeholder");
});

test("Validating inputs", () => {
  const { getByLabelText } = render(<ContactForm />);
  const firstNameInput = getByLabelText(/first name/i);
  const lastNameInput = getByLabelText(/last name/i);
  const emailInput = getByLabelText(/email/i);
  const messageInput = getByLabelText(/message/i);

  expect(firstNameInput).toHaveAttribute("type");
  expect(lastNameInput).toHaveAttribute("type");
  expect(emailInput).toHaveAttribute("type");
  expect(messageInput).toHaveAttribute("type");
});

test("Sending user data", async () => {
  const { getByLabelText, getByTestId } = render(<ContactForm />);

  const firstNameInput = getByLabelText(/first name/i);
  const lastNameInput = getByLabelText(/last name/i);
  const emailInput = getByLabelText(/email/i);
  const messageInput = getByLabelText(/message/i);

  fireEvent.change(firstNameInput, { target: { value: "Alec" } });
  fireEvent.change(lastNameInput, { target: { value: "Dye" } });
  fireEvent.change(emailInput, { target: { value: "Alec@email.com" } });
  fireEvent.change(messageInput, { target: { value: "Here's Alec" } });

  expect(firstNameInput.value).toBe("Alec");
  expect(lastNameInput.value).toBe("Dye");
  expect(emailInput.value).toBe("Alec@email.com");
  expect(messageInput.value).toBe("Here's Alec");

  // no text "submit", button is an input
  await act(async () => {
    fireEvent.click(getByTestId(/button/i));
    // await waitForElement(() => getByTestId(/data-preview/i));
  });
});
