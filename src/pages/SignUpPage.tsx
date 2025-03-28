import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "../components/auth-layout"
import { AuthProviderButton } from "../components/auth-providers"

export default function SignUp() {
  return (
    <AuthLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-4 tracking-tight">JOIN KA-CHING</h1>
          <p className="text-lg text-gray-600">Create your Asa Team account</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#f0d264] rounded-full flex items-center justify-center">
            <span className="text-xl font-medium">^,^</span>
          </div>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your full name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a password" required />
          </div>

          <Button className="w-full py-6 mt-4">Create Account</Button>
        </form>

        <div className="mt-6 relative flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600">or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <AuthProviderButton provider="google" label="" />
          <AuthProviderButton provider="microsoft" label="" />
          <AuthProviderButton provider="github" label="" />
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

