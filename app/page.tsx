"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Sphere, Box, Text } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  Shield,
  MessageCircle,
  ShoppingCart,
  Star,
  Zap,
  Play,
  Code,
  Database,
  Cpu,
} from "lucide-react"
import type * as THREE from "three"

// Enhanced floating particles with different sizes and colors
function FloatingParticles() {
  const particlesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
      particlesRef.current.rotation.x += 0.0005
      particlesRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002
        child.position.x += Math.cos(state.clock.elapsedTime * 1.5 + i) * 0.001
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {[...Array(30)].map((_, i) => (
        <Float key={i} speed={1 + Math.random() * 2} rotationIntensity={0.5} floatIntensity={0.8}>
          <Sphere
            position={[(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15]}
            args={[0.015 + Math.random() * 0.04]}
          >
            <meshStandardMaterial
              color={Math.random() > 0.6 ? "#ffffff" : Math.random() > 0.3 ? "#888888" : "#444444"}
              emissive={Math.random() > 0.7 ? "#333333" : "#111111"}
              metalness={0.9}
              roughness={0.1}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

// Floating data streams
function DataStreams() {
  const streamsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (streamsRef.current) {
      streamsRef.current.children.forEach((child, i) => {
        child.position.z = ((state.clock.elapsedTime * 2 + i) % 20) - 10
        child.rotation.y = state.clock.elapsedTime * 0.5
      })
    }
  })

  return (
    <group ref={streamsRef}>
      {[...Array(12)].map((_, i) => (
        <Box key={i} position={[(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 10, -10]} args={[0.05, 0.05, 2]}>
          <meshStandardMaterial
            color="#555555"
            emissive="#222222"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </Box>
      ))}
    </group>
  )
}

// Enhanced floating robot with more details
function FloatingRobot() {
  const robotRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (robotRef.current) {
      robotRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={robotRef}>
        {/* Main body with glow effect */}
        <Box position={[0, 0, 0]} args={[0.8, 1.2, 0.6]}>
          <meshStandardMaterial
            color="#1a1a1a"
            emissive="#0a0a0a"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </Box>

        {/* Head with enhanced materials */}
        <Sphere position={[0, 0.8, 0]} args={[0.3]}>
          <meshStandardMaterial
            color="#2a2a2a"
            emissive="#0f0f0f"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={1.5}
          />
        </Sphere>

        {/* Glowing eyes */}
        <Sphere position={[-0.1, 0.85, 0.25]} args={[0.03]}>
          <meshStandardMaterial color="#00ffff" emissive="#00cccc" />
        </Sphere>
        <Sphere position={[0.1, 0.85, 0.25]} args={[0.03]}>
          <meshStandardMaterial color="#00ffff" emissive="#00cccc" />
        </Sphere>

        {/* Arms with joints */}
        <Box position={[-0.6, 0.1, 0]} args={[0.2, 0.8, 0.2]}>
          <meshStandardMaterial color="#1a1a1a" emissive="#0a0a0a" metalness={0.8} roughness={0.2} />
        </Box>
        <Box position={[0.6, 0.1, 0]} args={[0.2, 0.8, 0.2]}>
          <meshStandardMaterial color="#1a1a1a" emissive="#0a0a0a" metalness={0.8} roughness={0.2} />
        </Box>

        {/* Shoulder joints */}
        <Sphere position={[-0.5, 0.5, 0]} args={[0.1]}>
          <meshStandardMaterial color="#333333" emissive="#111111" metalness={0.9} />
        </Sphere>
        <Sphere position={[0.5, 0.5, 0]} args={[0.1]}>
          <meshStandardMaterial color="#333333" emissive="#111111" metalness={0.9} />
        </Sphere>

        {/* Chest panel */}
        <Box position={[0, 0.2, 0.31]} args={[0.4, 0.6, 0.02]}>
          <meshStandardMaterial color="#333333" emissive="#111111" metalness={0.7} />
        </Box>
      </group>
    </Float>
  )
}

// Enhanced crypto chart with animated bars and floating text
function CryptoChart() {
  const chartRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (chartRef.current) {
      chartRef.current.children.forEach((child, i) => {
        if (child.type === "Mesh") {
          child.scale.y = 1 + Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.3
          // Fix: Check if material and emissive exist before calling setHex
          if (child.material && child.material.emissive) {
            const color = Math.sin(state.clock.elapsedTime + i) > 0 ? 0x002200 : 0x220000
            child.material.emissive.setHex(color)
          }
        }
      })
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={chartRef} position={[2.5, 0, -1.5]}>
        {[...Array(8)].map((_, i) => (
          <Box key={i} position={[i * 0.3, Math.sin(i) * 0.3, 0]} args={[0.08, 0.8 + Math.sin(i) * 0.3, 0.08]}>
            <meshStandardMaterial
              color="#333333"
              emissive="#111111"
              metalness={0.8}
              roughness={0.2}
              envMapIntensity={1}
            />
          </Box>
        ))}

        {/* Floating percentage indicators */}
        <Text position={[1, 2, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
          +127%
        </Text>
        <Text position={[3, 1.5, 0]} fontSize={0.15} color="#00ff00" anchorX="center" anchorY="middle">
          BTC
        </Text>
      </group>
    </Float>
  )
}

// Holographic rings
function HolographicRings() {
  const ringsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.2
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.3
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={ringsRef} position={[-4, 0, -3]}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0, 0, i * 0.5]}>
          <torusGeometry args={[1 + i * 0.3, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#666666"
            emissive="#222222"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.4 - i * 0.1}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}

// Enhanced geometric shapes with more variety
function FloatingGeometry() {
  return (
    <group>
      <Float speed={0.8} rotationIntensity={0.6} floatIntensity={0.4}>
        <Box position={[-3, 1.5, -2]} args={[0.3, 0.3, 0.3]}>
          <meshStandardMaterial color="#2a2a2a" emissive="#0f0f0f" wireframe metalness={0.9} />
        </Box>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere position={[3, -0.5, -1.5]} args={[0.2]}>
          <meshStandardMaterial color="#1a1a1a" emissive="#0a0a0a" wireframe metalness={0.8} />
        </Sphere>
      </Float>

      <Float speed={0.6} rotationIntensity={0.4} floatIntensity={0.3}>
        <Box position={[-2.5, -1.5, 0.5]} args={[0.2, 0.6, 0.2]}>
          <meshStandardMaterial color="#333333" emissive="#111111" metalness={0.7} roughness={0.3} />
        </Box>
      </Float>

      {/* Additional geometric shapes */}
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={0.6}>
        <mesh position={[4, 2, -2]}>
          <octahedronGeometry args={[0.2]} />
          <meshStandardMaterial color="#444444" emissive="#111111" metalness={0.8} wireframe />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh position={[-4, -1, 1]}>
          <tetrahedronGeometry args={[0.25]} />
          <meshStandardMaterial color="#555555" emissive="#111111" metalness={0.9} />
        </mesh>
      </Float>
    </group>
  )
}

// Button particle effect component
function ButtonParticles({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded pointer-events-none">
      {isHovered &&
        [...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`,
            }}
          />
        ))}
    </div>
  )
}

// Enhanced button component with particle effects
function EnhancedButton({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "lg"
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick()

    // Create click particles
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newParticles = [...Array(8)].map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
    }))

    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1000)
  }

  return (
    <Button
      className={`relative overflow-hidden ${className}`}
      variant={variant}
      size={size}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
      <ButtonParticles isHovered={isHovered} />

      {/* Click particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full animate-ping pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            animationDuration: "0.6s",
          }}
        />
      ))}

      {/* Shimmer effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-500 ${
          isHovered ? "opacity-20" : ""
        }`}
        style={{
          transform: "translateX(-100%)",
          animation: isHovered ? "shimmer 1.5s infinite" : "none",
        }}
      />
    </Button>
  )
}

// Fade in animation hook
function useFadeIn(delay = 0) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return isVisible
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-gradient-to-b from-gray-600 to-gray-800 text-gray-100 font-mono text-2xl px-4 py-3 rounded border border-gray-600 min-w-[70px] shadow-lg animate-pulse relative overflow-hidden">
            {value.toString().padStart(2, "0")}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse" />
          </div>
          <div className="text-gray-300 text-sm mt-2 uppercase tracking-wider">{unit}</div>
        </div>
      ))}
    </div>
  )
}

// WhatsApp floating button component with enhanced effects
function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Tenho interesse no The Best Trader. Gostaria de saber mais sobre o desconto especial!",
    )
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511999999999&text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="relative">
        <EnhancedButton
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl animate-bounce hover:animate-none transition-all duration-300 hover:scale-110 group relative overflow-hidden"
          size="lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />

          {/* Pulsing ring effect */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-green-400 transition-all duration-1000 ${
              isHovered ? "scale-150 opacity-0" : "scale-100 opacity-50"
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full border-2 border-green-300 transition-all duration-1000 delay-200 ${
              isHovered ? "scale-200 opacity-0" : "scale-100 opacity-30"
            }`}
          />

          {/* Notification badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            1
          </div>
        </EnhancedButton>

        {/* Tooltip */}
        <div
          className={`absolute bottom-full right-0 mb-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-opacity duration-300 shadow-lg ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          Fale conosco no WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </div>
  )
}

export default function TradingBotSalesPage() {
  const headerVisible = useFadeIn(0)
  const videoVisible = useFadeIn(500)
  const timerVisible = useFadeIn(1000)
  const productVisible = useFadeIn(1500)
  const pricingVisible = useFadeIn(2000)
  const featuresVisible = useFadeIn(2500)

  const checkoutUrl = "https://pay.hotmart.com/X101145286C"

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(55,65,81,0.15),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(31,41,55,0.15),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(75,85,99,0.05),transparent_70%)]" />

      {/* Animated tech grid pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(156,163,175,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(156,163,175,0.1)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
      </div>

      {/* Moving diagonal lines */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(156,163,175,0.1)_49%,rgba(156,163,175,0.1)_51%,transparent_52%)] bg-[size:100px_100px] animate-pulse" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-12 pb-8">
        <div className="container mx-auto px-4 text-center">
          <Badge
            className={`bg-gray-600 text-white font-semibold mb-6 px-4 py-2 border border-gray-500 transition-all duration-1000 animate-pulse relative overflow-hidden ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            LANÇAMENTO EXCLUSIVO - ACESSO LIMITADO
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse" />
          </Badge>

          <h1
            className={`font-['Orbitron'] text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent mb-8 transition-all duration-1000 delay-200 animate-pulse ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            THE BEST TRADER
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-100 mb-6 transition-all duration-1000 delay-400 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Sistema de Trading Automatizado com Inteligência Artificial
          </p>

          <p
            className={`text-lg md:text-xl text-gray-300 font-light transition-all duration-1000 delay-600 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Automatize suas operações e maximize resultados com tecnologia de ponta
          </p>
        </div>
      </header>

      {/* Enhanced Video Hero Section with more 3D Effects */}
      <section
        className={`relative h-[650px] mb-16 transition-all duration-1000 ${videoVisible ? "opacity-100" : "opacity-0"}`}
      >
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden rounded-lg mx-4">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/placeholder.svg?height=650&width=1200&text=Advanced+Trading+Technology"
          >
            <source src="/placeholder.mp4" type="video/mp4" />
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <Play className="w-24 h-24 text-gray-400 opacity-50" />
            </div>
          </video>

          {/* Enhanced overlay with animated effects */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 to-transparent animate-pulse" />
        </div>

        {/* Enhanced 3D Elements over video */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
            <Environment preset="night" />
            <ambientLight intensity={0.1} />
            <pointLight position={[8, 8, 8]} color="#ffffff" intensity={0.8} />
            <pointLight position={[-8, -8, 8]} color="#666666" intensity={0.5} />
            <pointLight position={[0, 8, -8]} color="#444444" intensity={0.3} />

            <FloatingRobot />
            <CryptoChart />
            <FloatingParticles />
            <DataStreams />
            <HolographicRings />
            <FloatingGeometry />

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
          </Canvas>
        </div>

        {/* Content over video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10 max-w-4xl px-4">
            <h2 className="font-['Orbitron'] text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-2xl animate-pulse">
              TECNOLOGIA AVANÇADA DE IA
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-lg font-light">
              Sistema automatizado de alta performance para negociação de criptomoedas
            </p>
            <EnhancedButton
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold text-xl px-12 py-6 rounded border border-gray-600 shadow-2xl transition-all duration-300 hover:scale-105 pointer-events-auto animate-pulse"
              onClick={() => window.open(checkoutUrl, "_blank")}
            >
              <Zap className="w-6 h-6 mr-3" />
              ACESSAR SISTEMA
            </EnhancedButton>
          </div>
        </div>
      </section>

      {/* Urgency Timer */}
      <section
        className={`container mx-auto px-4 mb-16 transition-all duration-1000 ${timerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <Card className="bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 shadow-2xl animate-pulse relative overflow-hidden">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-200 mb-6 font-['Orbitron']">OFERTA EXPIRA EM:</h3>
            <CountdownTimer />
            <p className="text-gray-400 mt-6 font-light">Licenças limitadas disponíveis neste preço</p>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 animate-pulse" />
        </Card>
      </section>

      {/* Product Description */}
      <section
        className={`container mx-auto px-4 mb-16 transition-all duration-1000 ${productVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-10 rounded-lg border border-gray-600 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
              <div className="text-center">
                <Cpu className="w-20 h-20 text-gray-300 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl font-bold text-gray-200 mb-4 font-['Orbitron']">Sistema de IA Avançado</h3>
                <p className="text-gray-400 font-light">
                  Algoritmos de machine learning para análise de mercado em tempo real
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 animate-pulse" />
            </div>
          </div>

          <div>
            <h2 className="font-['Orbitron'] text-4xl font-bold text-gray-200 mb-8">TECNOLOGIA DE PONTA</h2>

            <div className="space-y-6">
              {[
                "Código fonte completo com controle total",
                "Inteligência artificial para análise de mercado",
                "Execução local com máxima segurança",
                "Integração direta com API da Binance",
                "Estratégias otimizadas e personalizáveis",
                "Interface profissional de terminal",
                "Suporte técnico e atualizações incluídas",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-500 hover:translate-x-2 hover:text-gray-100`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="text-gray-200 w-6 h-6 flex-shrink-0 animate-pulse" />
                  <span className="text-gray-300 font-light">{benefit}</span>
                </div>
              ))}
            </div>

            <EnhancedButton
              className="mt-8 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold text-lg px-8 py-4 rounded border border-gray-600 transition-all duration-300 hover:scale-105 animate-pulse"
              onClick={() => window.open(checkoutUrl, "_blank")}
            >
              <Star className="w-5 h-5 mr-2" />
              INICIAR AGORA
            </EnhancedButton>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className={`container mx-auto px-4 mb-16 transition-all duration-1000 ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 max-w-3xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
          <CardContent className="p-10 text-center">
            <Badge className="bg-gray-600 text-white mb-6 px-4 py-2 border border-gray-500 animate-pulse relative overflow-hidden">
              OFERTA LIMITADA
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
            </Badge>

            <h3 className="font-['Orbitron'] text-4xl font-bold text-gray-200 mb-8">ACESSO COMPLETO AO SISTEMA</h3>

            <div className="mb-8">
              <div className="text-gray-500 text-xl line-through mb-3">De: R$ 129,90</div>
              <div className="text-6xl font-bold text-white mb-3 font-['Orbitron'] animate-pulse">R$ 89,90</div>
              <div className="text-gray-400 font-light">Preço promocional por tempo limitado</div>
            </div>

            <div className="space-y-4">
              <EnhancedButton
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold text-lg py-6 rounded border border-gray-600 shadow-lg transition-all duration-300 hover:scale-105 animate-pulse"
                onClick={() => window.open(checkoutUrl, "_blank")}
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                ADQUIRIR SISTEMA - R$ 89,90
              </EnhancedButton>

              <div className="text-gray-500 text-sm font-light">OU</div>

              <EnhancedButton
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-semibold text-lg py-6 rounded transition-all duration-300 hover:scale-105 bg-transparent"
                onClick={() => window.open(checkoutUrl, "_blank")}
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                CONTATO PARA DESCONTO ESPECIAL
              </EnhancedButton>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Garantia 7 dias
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Acesso imediato
              </div>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 animate-pulse" />
        </Card>
      </section>

      {/* Features Grid */}
      <section
        className={`container mx-auto px-4 mb-16 transition-all duration-1000 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="font-['Orbitron'] text-4xl font-bold text-center text-gray-200 mb-12">RECURSOS INCLUÍDOS</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Código Fonte Completo", desc: "Acesso total ao código Python com IA integrada", icon: Code },
            { title: "Documentação Técnica", desc: "Manual completo de instalação e configuração", icon: Database },
            { title: "Estratégias Otimizadas", desc: "Algoritmos de trading já configurados", icon: Cpu },
            { title: "Suporte Técnico", desc: "Grupo exclusivo para suporte e dúvidas", icon: MessageCircle },
            { title: "Atualizações Gratuitas", desc: "Novas versões e melhorias sem custo adicional", icon: Zap },
            { title: "Recursos Exclusivos", desc: "Documentação avançada e materiais extras", icon: Star },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 hover:border-gray-500 transition-all duration-500 hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl relative overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => window.open(checkoutUrl, "_blank")}
            >
              <CardContent className="p-8 text-center">
                <feature.icon className="w-12 h-12 text-gray-300 mx-auto mb-6 animate-pulse" />
                <h4 className="font-bold text-gray-200 mb-3 text-lg">{feature.title}</h4>
                <p className="text-gray-400 text-sm font-light">{feature.desc}</p>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 transition-opacity duration-500" />
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <EnhancedButton
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold text-xl px-16 py-6 rounded border border-gray-600 shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
            onClick={() => window.open(checkoutUrl, "_blank")}
          >
            <Zap className="w-6 h-6 mr-3" />
            ACESSAR TODOS OS RECURSOS
          </EnhancedButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300 mb-6 font-light">© 2024 The Best Trader. Todos os direitos reservados.</p>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500 mb-8">
            <span>Pagamento 100% Seguro</span>
            <span>•</span>
            <span>Suporte Técnico 24/7</span>
            <span>•</span>
            <span>Garantia de 7 dias</span>
          </div>

          <EnhancedButton
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold px-10 py-4 rounded border border-gray-600 transition-all duration-300 hover:scale-105"
            onClick={() => window.open(checkoutUrl, "_blank")}
          >
            ADQUIRIR SISTEMA AGORA
          </EnhancedButton>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}
