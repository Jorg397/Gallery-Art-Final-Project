function InputField({
  className,
  inputClass,
  spanText,
  type,
  accept,
  placeholder,
  name,
  selectFile,
  register,
  registerMessage,
  patternValue,
  patternMessage = "",
  errors,
  disabled,
  value,
}) {
  const pattern = patternValue ? new RegExp(patternValue, "i") : patternValue;

  return (
    <div className={className}>
      <span className="text-base font-semibold">{spanText}</span>
      <input
        className={inputClass}
        type={type}
        accept={accept}
        placeholder={placeholder}
        onInput={selectFile}
        name={name}
        disabled={disabled}
        value={value}
        {...register(name, {
          required: {
            value: true,
            message: registerMessage,
          },
          pattern: {
            value: pattern,
            message: patternMessage,
          },
        })}
      />
      {errors[name] && (
        <p className="text-red-800 font-bold">{errors[name].message}</p>
      )}
    </div>
  );
}

export default InputField;
