interface ButtonProps {
  children: any;
  rounded?: boolean;
  roundedClass?: string;
  border?: boolean;
  borderClass?: string;
  onClick?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
  classes?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const extraClasses = [
    props.roundedClass ||
      (props.rounded || props.rounded == undefined ? "rounded-md" : ""),
    props.borderClass ||
      (props.border || props.border == undefined ? "border" : ""),
    props.classes || "bg-secondary bg-mint-hover",
  ].join(" ");

  return (
    <button
      className={`py-2 px-8 ${extraClasses}`}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
