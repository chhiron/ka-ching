const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f9f7f2]">
      {/* Background circles - using investment/finance themed colors */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[#85bb65] opacity-80 z-0"></div>
      <div className="absolute top-[10%] right-[5%] w-[200px] h-[200px] rounded-full bg-[#f8d231] opacity-80 z-0"></div>
      <div className="absolute bottom-[5%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#e07a5f] opacity-80 z-0"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-[#b7b5a8] opacity-50 z-0"></div>
      <div className="absolute top-[40%] left-[15%] w-[100px] h-[100px] rounded-full bg-[#b7b5a8] opacity-50 z-0"></div>
      <div className="absolute bottom-[30%] right-[20%] w-[150px] h-[150px] rounded-full bg-[#85bb65] opacity-50 z-0"></div>

      {/* Content */}
      <div className="z-10">{children}</div>
    </div>
  )
}

export default AuthLayout

