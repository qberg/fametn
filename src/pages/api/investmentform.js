import axios from "axios";
import { error } from "console";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePhone = (phone) => {
  const re = /^\d{10}$/; // Example: 10 digit phone number validation
  return re.test(String(phone));
};

const validateAlphanumeric = (input) => {
  const re = /^[a-zA-Z0-9 ]+$/; // Allows alphanumeric characters and spaces
  return re.test(String(input));
};

const validateMaxLength = (input, maxLength = 24, minLength = 3) => {
  return input.length <= maxLength && input.length >= minLength;
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, designation } = req.body;

    let errorMsg = "";
    // Your validation logic goes here
    let error = false;

    if (!validateAlphanumeric(firstName)) {
      return res
        .status(403)
        .json({ error: "First name can only contain alphabets and spaces." });
    }

    if (!validateMaxLength(firstName)) {
      return res
        .status(403)
        .json({ error: "First name must be between 3 and 24 characters." });
    }

    if (!validateAlphanumeric(lastName)) {
      return res
        .status(403)
        .json({ error: "Last name can only contain alphabets and spaces." });
    }

    if (!validateMaxLength(lastName)) {
      return res
        .status(403)
        .json({ error: "Last name must be between 3 and 24 characters." });
    }

    if (!validateEmail(email)) {
      return res
        .status(403)
        .json({ error: "Please enter a valid email address." });
    }

    if (!validateAlphanumeric(designation)) {
      return res
        .status(403)
        .json({ error: "Designation can only contain alphabets and spaces." });
    }

    if (!validateMaxLength(designation)) {
      return res
        .status(403)
        .json({ error: "Designation must be between 3 and 24 characters." });
    }

    // sent to cms
    const path = "ezforms/submit/";
    const url = "https://" + process.env.API_ENDPOINT + path;

    const token = process.env.EZ_FORMS_TOKEN;
    const now = new Date();
    const timeString = now.toLocaleTimeString(); // Returns time string in HH:MM:SS format
    const dateString = now.toLocaleDateString(); // Returns date string in MM/DD/YYYY format
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = {
      form: "investmentform",
      firstName: firstName,
      lastName: lastName,
      email: email,
      designation: designation,
    };

    console.log("url is", url);

    axios
      .post(
        url,
        {
          formData: formData,
        },
        config
      )
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return res
            .status(200)
            .json({ message: "Form submitted successfully", data: req.body });
        } else {
          throw "error";
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(403).json({ error: "Servers are busy!" });
      });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
