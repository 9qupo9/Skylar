import { useEffect, useRef, useState } from "react"

const rouletteItems = [
  { id: 1, type: "box", value: "2.00" },
  { id: 2, type: "coin", value: "0.02" },
  { id: 3, type: "box", value: "2.00" },
  { id: 4, type: "coin", value: "0.02" },
  { id: 5, type: "coin", value: "0.02" },
  { id: 6, type: "coin", value: "0.02" },
  { id: 7, type: "box", value: "2.00" },
  { id: 8, type: "coin", value: "0.02" },
  { id: 9, type: "box", value: "2.00" },
  { id: 10, type: "box", value: "2.00" },
  { id: 11, type: "coin", value: "0.02" },
  { id: 12, type: "box", value: "2.00" },
  { id: 13, type: "coin", value: "0.02" },
  { id: 14, type: "coin", value: "0.02" },
  { id: 15, type: "coin", value: "0.02" },
  { id: 16, type: "box", value: "2.00" },
  { id: 17, type: "coin", value: "0.02" },
  { id: 18, type: "box", value: "2.00" },
  { id: 19, type: "box", value: "2.00" },
  { id: 20, type: "coin", value: "0.02" },
  { id: 21, type: "box", value: "2.00" },
]

export function RouletteWheel({ isSpinning, onResultConfirmed, onWinningItem, wheelCount = 1 }) {
  const wheelRefs = useRef([])
  const [winningItems, setWinningItems] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [isWaitingConfirmation, setIsWaitingConfirmation] = useState(false)

  useEffect(() => {
    if (isSpinning) {
      setShowResult(false)
      setIsWaitingConfirmation(false)
      setWinningItems([])

      const selectedItems = []
      const cardWidth = 88
      const containerWidth = 400
      const centerOffset = containerWidth / 2 - cardWidth / 2
      const fullRotations = 3

      for (let wheelIndex = 0; wheelIndex < wheelCount; wheelIndex++) {
        const wheelRef = wheelRefs.current[wheelIndex]
        if (wheelRef) {
          const randomIndex = Math.floor(Math.random() * rouletteItems.length)
          const selectedItem = rouletteItems[randomIndex]
          selectedItems.push(selectedItem)

          wheelRef.style.transition = ""
          wheelRef.style.transform = "translateX(0)"
          wheelRef.classList.remove("roulette-container")

          wheelRef.offsetHeight

          const finalPosition = -(randomIndex * cardWidth + fullRotations * rouletteItems.length * cardWidth - centerOffset)

          setTimeout(() => {
            if (wheelRef) {
              wheelRef.style.transition = "transform 5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              wheelRef.style.transform = `translateX(${finalPosition}px)`
            }
          }, 50 + wheelIndex * 200)

          if (onWinningItem) {
            setTimeout(() => {
              onWinningItem(selectedItem)
            }, 5050 + wheelIndex * 200)
          }
        }
      }

      setTimeout(() => {
        setWinningItems(selectedItems)
        setShowResult(true)
        setIsWaitingConfirmation(true)
      }, 5000 + (wheelCount - 1) * 200)
    }
  }, [isSpinning, wheelCount])

  const handleConfirmResult = () => {
    setShowResult(false)
    setIsWaitingConfirmation(false)
    setWinningItems([])

    wheelRefs.current.forEach(wheelRef => {
      if (wheelRef) {
        wheelRef.style.transition = ""
        wheelRef.style.transform = "translateX(0)"
        wheelRef.classList.add("roulette-container")
      }
    })

    if (onResultConfirmed) {
      onResultConfirmed()
    }
  }

  // Стили
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: wheelCount > 1 ? '12px' : '0'
  }

  const rouletteContainerStyles = {
    position: 'relative',
    borderRadius: '12px',
    border: 'none',
    background: 'transparent',
    padding: '16px',
    marginBottom: wheelCount > 1 ? '16px' : '0'
  }

  const wheelContainerStyles = {
    position: 'relative',
    height: '80px',
    overflow: 'hidden',
    width: '100%'
  }

  const wheelStyles = {
    display: 'flex',
    gap: '8px',
    width: 'max-content'
  }

  // Индикаторы теперь внутри wheelContainerStyles
  const indicatorStyles = {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 20,
    width: '50px',
    height: '50px',
    backgroundImage: `url(${process.env.PUBLIC_URL}/String.png)`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const bottomIndicatorStyles = {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-52%) rotate(180deg)',
    zIndex: 20,
    width: '50px',
    height: '50px',
    backgroundImage: `url(${process.env.PUBLIC_URL}/String.png)`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }

  const getItemStyles = (isCoin) => ({
    flexShrink: 0,
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    border: isCoin ? '2px solid rgba(139, 92, 246, 0.5)' : '2px solid rgba(139, 92, 246, 0.3)',
    background: isCoin ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    transition: 'all 0.3s ease',
    color: '#8B5CF6'
  })

  const gradientLeftStyles = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '16px',
    width: '64px',
    background: 'linear-gradient(to right, rgba(26, 31, 46, 0.5), transparent)',
    pointerEvents: 'none',
    zIndex: 10
  }

  const gradientRightStyles = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: '16px',
    width: '64px',
    background: 'linear-gradient(to left, rgba(26, 31, 46, 0.5), transparent)',
    pointerEvents: 'none',
    zIndex: 10
  }

  return (
    <div style={containerStyles}>
      <style>{`
        .roulette-container {
          animation: roulette-loop 30s linear infinite;
        }
        @keyframes roulette-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${rouletteItems.length * 88}px); }
        }
      `}</style>

      {Array.from({ length: wheelCount }, (_, wheelIndex) => (
        <div key={wheelIndex} style={{ position: 'relative' }}>
          <div style={rouletteContainerStyles}>
            <div style={wheelContainerStyles}>
              {/* индикаторы */}
              <div style={indicatorStyles}></div>
              <div style={bottomIndicatorStyles}></div>

              <div
                ref={el => wheelRefs.current[wheelIndex] = el}
                className={!isSpinning && !isWaitingConfirmation ? "roulette-container" : ""}
                style={wheelStyles}
              >
                {Array.from({ length: 6 }, (_, setIndex) =>
                  rouletteItems.map((item, itemIndex) => {
                    const isCoin = item.type === 'coin'
                    return (
                      <div
                        key={`${item.id}-${setIndex}-${itemIndex}-${wheelIndex}`}
                        style={getItemStyles(isCoin)}
                      >
                        {isCoin ? (
                          <img src="/Money.png" alt="Coin" style={{ width: '60px', height: '60px' }} />
                        ) : (
                          <img src="/Box.png" alt="Box" style={{ width: '60px', height: '60px' }} />
                        )}
                        <span style={{ fontSize: '12px', fontWeight: '600' }}>{item.value}</span>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            <div style={gradientLeftStyles}></div>
            <div style={gradientRightStyles}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

