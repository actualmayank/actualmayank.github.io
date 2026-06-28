import { ButtonHTMLAttributes } from "react";

export function WindowButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`win-button ${props.className ?? ""}`} />;
}
