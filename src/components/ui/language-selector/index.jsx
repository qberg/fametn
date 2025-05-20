import { LanguagesIcon, ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./styles.module.css";

const strings = {
  lang: {
    en: "EN",
    ta: "த",
  },
};

const colorVariants = {
  default: {
    text: "#000000",
  },
  secondary: {
    text: "#ffffff",
  },
};

const LanguageSelector = ({ variant = "default" }) => {
  const router = useRouter();
  const { locale } = router;
  const [lang, setLang] = useState(locale);

  const switchLocale = (event) => {
    const targetLanguage = event.target.value;
    const { pathname, asPath, query } = router;
    setLang(targetLanguage);
    router.push({ pathname, query }, asPath, { locale: targetLanguage });
  };

  const colors = colorVariants[variant] || colorVariants.default;

  // Custom select wrapper style to position the chevron
  const selectWrapperStyle = {
    position: "relative",
    display: "inline-block",
  };

  // Hide the default dropdown arrow
  const selectStyle = {
    cursor: "pointer",
    color: colors.text,
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    paddingRight: "1.5rem", // Make room for the custom chevron
    backgroundColor: "transparent",
    border: "none",
  };

  const optionStyle = {
    color: colors.text,
  };

  // Style for positioning the chevron
  const chevronStyle = {
    position: "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none", // Make sure clicks pass through to the select
    color: colors.text,
  };

  return (
    <div className={styles.selector}>
      <LanguagesIcon color={colors.text} />
      <div style={selectWrapperStyle}>
        <select
          value={lang}
          onChange={switchLocale}
          className="ms-2"
          style={selectStyle}
        >
          <option value="en" style={optionStyle}>
            {strings.lang.en}
          </option>
          <option value="ta" style={optionStyle}>
            {strings.lang.ta}
          </option>
        </select>
        <ChevronDown style={chevronStyle} size={22} color={colors.text} />
      </div>
    </div>
  );
};

export default LanguageSelector;
