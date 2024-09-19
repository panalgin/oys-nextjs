import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { auth, googleProvider } from "@/lib/firebase"
import { signInWithPopup } from "firebase/auth"
import { useToast } from "@/components/ui/use-toast"

export function GoogleSignInButton() {
  const { toast } = useToast()

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      toast({
        title: "Giriş başarılı",
        description: `Hoş geldiniz, ${user.displayName}!`,
      })
    } catch (error) {
      toast({
        title: "Giriş başarısız",
        description: `Giriş yapılırken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
        variant: "destructive",
      })
    }
  }

  return (
    <Button onClick={handleSignIn} className="w-full">
      <FcGoogle className="mr-2 h-4 w-4" />
      Google ile Giriş Yap
    </Button>
  )
}