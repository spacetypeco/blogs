import style from "./Modal.module.css";

export default function Modal({ show, onClose, children }) {
  const classes = show ? "opacity-100" : "opacity-0 pointer-events-none";
  const styles = show
    ? { clipPath: "inset(0 0% 0% 0%)" }
    : { clipPath: "inset(0 100% 0% 0%)" };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-start duration-300 z-50 overflow-auto ${
        !show && "pointer-events-none"
      }`}
      onTouchMove={(e) => e.preventDefault()}
      onClick={(ev) => {
        ev.preventDefault();
        onClose();
      }}
      style={
        {
          // overscrollBehavior: "contain",
          // zIndex: "60",
        }
      }
    >
      <div
        className={`absolute w-full h-full duration-300 ${classes}`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(3px)",

          //   overscrollBehavior: "contain",
        }}
      ></div>
      <div
        className={`h-full site-content overflow-y-scroll duration-300 ${style.maxWidth}`}
        onClick={(ev) => {
          ev.stopPropagation();
        }}
        style={{
          WebkitOverflowScrolling: "touch",
          backgroundColor: "var(--color-bg)",
          //   width: "min(calc(100% - 2em), 96rem)",
          //   height: "min(calc(100% - 4em), 96rem)",
          //   minWidth: "calc(min(100%, 1600px))",
          //   width: "max(95%, 1600px)",
          // maxWidth: "max(95%, 1600px)",
          //   overscrollBehavior: "contain",
          ...styles,
        }}
      >
        {children}
      </div>
    </div>
  );
}
