"use client"

const AuthProviderButton = ({ provider, label, onClick }) => {
  const providerIcons = {
    google: "google.png",
    github: "github.png",
  }

  const providerLabels = {
    google: "Google",
    github: "Github",
  }

  return (
    <button
      className="w-full py-4 px-4 flex items-center justify-center gap-3 text-base font-medium border-2 rounded-lg hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <img
        src={providerIcons[provider] || "coin.png"}
        alt={`${providerLabels[provider]} logo`}
        width={24}
        height={24}
      />
      {label ? label : `Sign In With ${providerLabels[provider]}`}
    </button>
  )
}

const AuthProviders = () => {
  const handleProviderSignIn = (provider) => {
    console.log(`Sign in with ${provider}`)
    // Implement your authentication logic here
  }

  return (
    <div className="space-y-4">
      <AuthProviderButton provider="google" onClick={() => handleProviderSignIn("google")} />
      <AuthProviderButton provider="github" onClick={() => handleProviderSignIn("github")} />
    </div>
  )
}

export { AuthProviders, AuthProviderButton }

