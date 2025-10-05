'use client'

import * as React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-gray-300 text-sm font-medium">{label}</label>
      )}
      <select
        className={`bg-gray-900 border border-gray-700 text-gray-200 rounded-md px-3 py-2 text-sm 
          focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
