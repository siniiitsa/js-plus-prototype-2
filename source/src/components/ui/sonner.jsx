import { Toaster as Sonner } from "sonner"

// The only surface that toasts is the editor, which is always light chrome (§3.4),
// so the theme is pinned rather than read from a provider. §9.2 styles the toast
// itself, so the CLI's default icons and colour variables are dropped.
const Toaster = ({ ...props }) => {
  return <Sonner theme="light" className="toaster group" {...props} />
}

export { Toaster }
