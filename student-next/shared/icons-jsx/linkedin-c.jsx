import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={30}
      height={30}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 0c8.285 0 15 6.716 15 15 0 8.284-6.715 15-15 15S0 23.284 0 15C0 6.716 6.715 0 15 0z"
        fill="#0E76A8"
      />
      <path
        d="M8.452 20.61h2.81v-9.362h-2.81v9.362zm10.943-9.686c-1.363 0-2.583.498-3.448 1.596v-1.303h-2.82v9.393h2.82v-5.08c0-1.073.983-2.12 2.215-2.12 1.232 0 1.536 1.047 1.536 2.094v5.105h2.809v-5.314c0-3.69-1.748-4.371-3.112-4.371zm-9.551-.611a1.407 1.407 0 10-.001-2.814 1.407 1.407 0 000 2.814z"
        fill="#fff"
      />
    </svg>
  )
}

export default SvgComponent
