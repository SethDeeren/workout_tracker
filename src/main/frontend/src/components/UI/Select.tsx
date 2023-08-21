import { useState } from "react";
import styles from "../styles/UI/Select.module.css";

type SelectOption = {
  label: string;
  value: any;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

export default function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  function selectOption(option: SelectOption) {
    onChange(option);
    setIsOpen(false);
  }

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      {value === undefined && <span className={styles.value}>Exercise Type</span>}
      {value !== undefined && <span className={styles.value}>{value?.label}</span>}
      {/* <button className={styles["clear-btn"]}>&times;</button>
      <div className={styles.divider}></div> */}
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
            }}
            key={option.label}
            className={styles.option}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
