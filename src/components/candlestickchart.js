"use client"

import { useEffect, useRef, useState } from "react"

const CandlestickChart = () => {
  const canvasRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverInfo, setHoverInfo] = useState({ x: 0, y: 0, price: 0, date: "" })
  const animationRef = useRef(null)
  const chartDataRef = useRef({
    data: [],
    movingAverage: [],
    currentIndex: 0,
  })

  // Generate initial random data
  useEffect(() => {
    const generateCandlestickData = (days = 60, startPrice = 100) => {
      const data = []
      let currentPrice = startPrice
      const today = new Date()

      for (let i = 0; i < days; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - (days - i))

        const volatility = Math.random() * 2 + 1 // Random volatility between 1-3%
        const changePercent = Math.random() * volatility * 2 - volatility // Random change between -volatility and +volatility

        const open = currentPrice
        const close = open * (1 + changePercent / 100)
        const high = Math.max(open, close) * (1 + (Math.random() * 0.5) / 100)
        const low = Math.min(open, close) * (1 - (Math.random() * 0.5) / 100)

        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          open,
          high,
          low,
          close,
          color: close >= open ? "#4ade80" : "#ef4444",
        })

        currentPrice = close
      }

      // Calculate 10-day moving average
      const movingAverage = []
      for (let i = 0; i < data.length; i++) {
        if (i < 9) {
          movingAverage.push(null) // Not enough data for 10-day MA
        } else {
          let sum = 0
          for (let j = i - 9; j <= i; j++) {
            sum += data[j].close
          }
          movingAverage.push(sum / 10)
        }
      }

      return { data, movingAverage }
    }

    const { data, movingAverage } = generateCandlestickData()
    chartDataRef.current = {
      data,
      movingAverage,
      currentIndex: 30, // Start with 30 days visible
    }

    drawChart()

    // Start animation
    startAnimation()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const startAnimation = () => {
    let lastUpdateTime = 0
    const fps = 5 // Updates per second

    const animate = (timestamp) => {
      if (!lastUpdateTime || timestamp - lastUpdateTime > 1000 / fps) {
        // Update data every frame
        if (chartDataRef.current.currentIndex < chartDataRef.current.data.length) {
          chartDataRef.current.currentIndex++
          drawChart()
        } else {
          // Reset animation or stop
          chartDataRef.current.currentIndex = 30
        }
        lastUpdateTime = timestamp
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const drawChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const { width, height } = canvas

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw dark background with grid
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = i * (height / 5)
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = i * (width / 6)
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    const { data, movingAverage, currentIndex } = chartDataRef.current
    if (data.length === 0 || currentIndex <= 0) return

    // Get visible data
    const visibleData = data.slice(0, currentIndex)
    const visibleMA = movingAverage.slice(0, currentIndex)

    // Find min and max prices for scaling
    let minPrice = Math.min(...visibleData.map((d) => d.low))
    let maxPrice = Math.max(...visibleData.map((d) => d.high))

    // Add some padding
    const padding = (maxPrice - minPrice) * 0.1
    minPrice -= padding
    maxPrice += padding

    // Calculate scaling factors
    const xScale = width / visibleData.length
    const yScale = height / (maxPrice - minPrice)

    // Draw price scale on the right
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.font = "10px Arial"
    ctx.textAlign = "right"

    for (let i = 0; i <= 5; i++) {
      const price = maxPrice - (i * (maxPrice - minPrice)) / 5
      const y = i * (height / 5)
      ctx.fillText(price.toFixed(2), width - 5, y + 10)
    }

    // Draw date labels on the bottom (show every 10th day)
    ctx.textAlign = "center"
    for (let i = 0; i < visibleData.length; i += 10) {
      const x = i * xScale + xScale / 2
      ctx.fillText(visibleData[i].date, x, height - 5)
    }

    // Draw candlesticks
    for (let i = 0; i < visibleData.length; i++) {
      const candle = visibleData[i]
      const x = i * xScale

      // Calculate y positions
      const openY = height - (candle.open - minPrice) * yScale
      const closeY = height - (candle.close - minPrice) * yScale
      const highY = height - (candle.high - minPrice) * yScale
      const lowY = height - (candle.low - minPrice) * yScale

      // Draw the wick (high to low line)
      ctx.beginPath()
      ctx.strokeStyle = candle.color
      ctx.lineWidth = 1
      ctx.moveTo(x + xScale / 2, highY)
      ctx.lineTo(x + xScale / 2, lowY)
      ctx.stroke()

      // Draw the body (open to close rectangle)
      const candleWidth = Math.max(xScale * 0.8, 1) // Ensure minimum width of 1px
      const bodyHeight = Math.abs(closeY - openY)
      const bodyY = Math.min(openY, closeY)

      ctx.fillStyle = candle.color
      ctx.fillRect(x + (xScale - candleWidth) / 2, bodyY, candleWidth, Math.max(bodyHeight, 1))
    }

    // Draw moving average line
    ctx.beginPath()
    ctx.strokeStyle = "#60a5fa"
    ctx.lineWidth = 2

    let firstValidMA = false
    for (let i = 0; i < visibleMA.length; i++) {
      if (visibleMA[i] !== null) {
        const x = i * xScale + xScale / 2
        const y = height - (visibleMA[i] - minPrice) * yScale

        if (!firstValidMA) {
          ctx.moveTo(x, y)
          firstValidMA = true
        } else {
          ctx.lineTo(x, y)
        }
      }
    }
    ctx.stroke()

    // Draw hover info if hovering
    if (isHovering) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = 1
      ctx.roundRect(hoverInfo.x + 10, hoverInfo.y - 40, 120, 35, 5)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = "#0f172a"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "left"
      ctx.fillText(`Price: $${hoverInfo.price.toFixed(2)}`, hoverInfo.x + 15, hoverInfo.y - 22)
      ctx.fillText(`Date: ${hoverInfo.date}`, hoverInfo.x + 15, hoverInfo.y - 8)
    }
  }

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const { data, currentIndex } = chartDataRef.current
    const visibleData = data.slice(0, currentIndex)

    // Find the closest data point
    const xScale = canvas.width / visibleData.length
    const dataIndex = Math.min(Math.floor(x / xScale), visibleData.length - 1)

    if (dataIndex >= 0 && dataIndex < visibleData.length) {
      setIsHovering(true)
      setHoverInfo({
        x,
        y,
        price: visibleData[dataIndex].close,
        date: visibleData[dataIndex].date,
      })
      drawChart()
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    drawChart()
  }

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        className="w-full h-auto rounded-lg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <div className="absolute top-2 left-2 bg-[#0f172a]/80 text-white text-xs px-2 py-1 rounded">AAPL</div>
      <div className="absolute bottom-2 right-2 flex items-center gap-3 text-xs">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-[#4ade80] mr-1"></span>
          <span className="text-gray-600">Bullish</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-[#ef4444] mr-1"></span>
          <span className="text-gray-600">Bearish</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-1 bg-[#60a5fa] mr-1"></span>
          <span className="text-gray-600">10-day MA</span>
        </div>
      </div>
    </div>
  )
}

export default CandlestickChart

