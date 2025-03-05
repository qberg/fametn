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

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, phone } = req.body;

    let errorMsg = "";
    // Your validation logic goes here
    let error = false;

    if (!validateEmail(email)) {
      error = true;
      errorMsg = "Invalid email format";
    } else if (!validatePhone(phone)) {
      error = true;
      errorMsg = "Phone number must be 10 digits";
    }

    if (error) {
      return res.status(403).json({ error: errorMsg });
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
      form: "newsletterform",
      email: email,
      phone: phone,
      time: timeString,
      date: dateString,
    };


    axios.post(
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
