"use client";

export default function InputField(props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        key={props.name}
        className="border-2 border-gray-300 rounded p-2 bg-white focus:border-yellow-700 focus:outline-none focus:ring-yellow-700"
        name={props.name}
        type={props.type}
        id={props.id}
        defaultValue={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
    </div>
  );
}
