import { ChangeEventHandler } from "react";

interface Props {
  name: string;
  value: string;
  label?: string;
  smallLabel?: string;
  placeholder?: string;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function InputText<T>(props: Props) {
  return (
    <>
      {props.label && (
        <>
          <h2>{props.label}</h2>
          {props.smallLabel && (
            <label
              className="text-sm mt-2"
              // errorMsg={props.errorMsg}
              // hint={props.hint}
              // optionalText={props.optionalText}
            >
              {props.smallLabel}
            </label>
          )}
        </>
      )}
      <input
        name={props.name}
        type={props.type || "text"}
        className="border py-2 px-3 my-2 w-80 rounded text-sm"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </>
  );
}
