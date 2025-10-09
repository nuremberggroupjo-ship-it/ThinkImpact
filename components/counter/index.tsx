"use client"

import React, { useEffect, useState } from "react"

type Stat = {
  label: string
  count: number
  suffix?: string
}

type StatCardProps = Stat

const StatCard = ({ label, count, suffix = "" }: StatCardProps) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const duration = 1000
    const stepTime = Math.max(Math.floor(duration / count), 10)

    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + 1
        if (next >= count) {
          clearInterval(timer)
          return count
        }
        return next
      })
    }, stepTime)

    return () => clearInterval(timer)
  }, [count])

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center border rounded-lg shadow-sm transition-all hover:shadow-md bg-white">
      <dd className="text-5xl font-extrabold leading-none text-[#00ADEE]">
        {current.toLocaleString()}
        {suffix}
      </dd>
      <dt className="mt-3 text-lg font-medium leading-6 text-[#125892]">
        {label}
      </dt>
    </div>
  )
}

export const Counter = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-12 px-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
