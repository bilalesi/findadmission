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
        d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15z"
        fill="#3B5998"
      />
      <path
        d="M18.77 15.587h-2.676v9.806H12.04v-9.806H10.11v-3.446h1.929v-2.23c0-1.595.758-4.092 4.091-4.092l3.004.013v3.345h-2.18c-.357 0-.86.178-.86.94v2.027h3.031l-.354 3.443z"
        fill="#fff"
      />
    </svg>
  )
}

export default SvgComponent
