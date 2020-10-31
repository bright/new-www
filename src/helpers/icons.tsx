import React from 'react'

export const ArrowLeft = () => (
    <span className="icon">
      <svg className="w-pagination-previous-icon"
           height="12px"
           width="12px"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 12 12"
           transform="translate(0, 1)">
        <path fill="none" stroke="currentColor" fillRule="evenodd" d="M8 10L4 6l4-4"/>
      </svg>
    </span>
)

export const ArrowRight = () => (
    <span className="icon">
        <svg className="w-pagination-next-icon icon-7"
             height="12px"
             width="12px"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 12 12"
             transform="translate(0, 1)">
            <path fill="none" stroke="currentColor" fillRule="evenodd" d="M4 2l4 4-4 4"/>
        </svg>
    </span>
)