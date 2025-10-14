import "./Components.css";

export default function InputField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="input-field">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ""}
      />
    </div>
  );
}
