import * as React from "react"

function SvgComponent({ className, ...props}) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 830 810"
        className={className}
        {...props}
    >
      <path
        d="M741 170v22q0 56-14 113t-41 111-69 101-94 82-119 55-144 20q-72 0-137-20T0 598q19 3 40 3 60 0 114-20t97-53q-56-1-99-34t-60-84q16 3 32 3 22 0 45-5-29-6-54-21t-43-37-28-50-11-59v-2q36 21 77 22-35-23-55-60t-21-81q0-23 6-45t17-41q63 78 153 125t196 52q-2-9-3-19t-1-19q0-35 14-66t36-54 54-37 65-13q37 0 69 14t55 40q57-12 108-41-10 29-29 53t-46 40q51-6 97-26-34 52-84 87z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgComponent
