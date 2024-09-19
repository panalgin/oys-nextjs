'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { GoogleSignInButton } from "@/components/google-sign-in-button"

interface Task {
  id: string
  title: string
  selectedBy?: User
  dueDate: Date
}

interface User {
  id: string
  name: string
  email: string
}

const mockUsers: User[] = [
  { id: "1", name: "Fatma Topal", email: "fatma@ornek.com" },
  { id: "2", name: "Ayşe Yılmaz", email: "ayse@ornek.com" },
  { id: "3", name: "Mehmet Kaya", email: "mehmet@ornek.com" },
]

const maskName = (name: string) => {
  const parts = name.split(' ')
  return parts.map(part => `${part[0]}${'*'.repeat(part.length - 1)}`).join(' ')
}

const taskTitles = [
  "10 çocuğu pastaneye götürüp pasta yedirmek",
  "5 öğrencinin sinema bileti masrafını karşılamak",
  "15 çocuğa pizza ısmarlamak",
  "Sınıfa 20 adet yeni kitap bağışlamak",
  "10 öğrenciye birer adet bilim seti hediye etmek",
  "Tüm sınıfı lunaparka götürmek",
  "5 öğrenciye birer aylık spor kursu hediye etmek",
  "Sınıfa interaktif bir bilim gösterisi organize etmek",
  "15 çocuğu bowling oynamaya götürmek",
  "Sınıfa 10 adet eğitici oyun seti bağışlamak",
  "20 öğrenciye birer adet kişisel bakım seti hediye etmek",
  "Tüm sınıfı hayvanat bahçesine götürmek",
  "10 çocuğa birer aylık müzik dersi hediye etmek",
  "Sınıfa bir akvaryum ve balıklar hediye etmek",
  "15 öğrenciye birer adet sanat malzemesi seti vermek",
  "Tüm sınıfı bir tiyatro oyununa götürmek",
  "5 çocuğa birer aylık yüzme kursu hediye etmek",
  "Sınıfa 20 adet bilim ve doğa dergisi aboneliği hediye etmek",
  "10 öğrenciye birer adet akıllı saat hediye etmek",
  "Tüm sınıfı bir bilim müzesine götürmek",
]

export default function RewardTasks() {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [isSignedIn, setIsSignedIn] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const { toast } = useToast()

  React.useEffect(() => {
    const now = new Date()
    const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    
    const generatedTasks = taskTitles.map((title, index) => {
      const dueDate = new Date(thirtyDaysLater.getTime() + (Math.random() * 10 - 5) * 24 * 60 * 60 * 1000)
      return {
        id: (index + 1).toString(),
        title,
        dueDate,
        selectedBy: Math.random() > 0.5 ? mockUsers[Math.floor(Math.random() * mockUsers.length)] : undefined
      }
    })

    setTasks(generatedTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime()))
  }, [])

  const toggleTaskSelection = (taskId: string) => {
    if (!isSignedIn || !currentUser) return
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          if (task.selectedBy && task.selectedBy.id !== currentUser.id) {
            // Can't select a task owned by someone else
            toast({
              title: "Görev seçilemedi",
              description: "Bu görev başka bir kullanıcı tarafından seçilmiş.",
              variant: "destructive",
            })
            return task
          }
          return {
            ...task,
            selectedBy: task.selectedBy?.id === currentUser.id ? undefined : currentUser
          }
        }
        return task
      })
    )
    toast({
      title: "Görev güncellendi",
      description: "Görev durumu başarıyla güncellendi.",
    })
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    setCurrentUser(null)
    toast({
      title: "Çıkış yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        {isSignedIn ? (
          <Button onClick={handleSignOut} className="w-full sm:w-auto mb-4">
            Çıkış Yap
          </Button>
        ) : (
          <GoogleSignInButton />
        )}

        {!isSignedIn && (
          <Alert variant="default" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Lütfen görev seçmek için giriş yapın.
            </AlertDescription>
          </Alert>
        )}

        {isSignedIn && currentUser && (
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                <p className="text-sm text-gray-600">{currentUser.email}</p>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4 text-foreground">Ödül Görevleri Listesi</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`cursor-pointer transition-colors ${
              task.selectedBy
                ? task.selectedBy.id === currentUser?.id
                  ? "bg-green-300"
                  : "bg-gray-100 cursor-not-allowed"
                : "hover:bg-muted"
            }`}
            onClick={() => isSignedIn && toggleTaskSelection(task.id)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium leading-tight flex-grow pr-2">
                    {task.title}
                  </p>
                  {isSignedIn && task.selectedBy?.id === currentUser?.id && (
                    <div className="flex space-x-2 flex-shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-red-500 hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleTaskSelection(task.id)
                        }}
                      >
                        <X className="h-4 w-4 text-white" />
                        <span className="sr-only">Görevi İptal Et</span>
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Bitiş Tarihi: {task.dueDate.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              {task.selectedBy ? (
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{task.selectedBy.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {task.selectedBy.id === currentUser?.id ? task.selectedBy.name : maskName(task.selectedBy.name)}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Henüz kimse üstlenmedi</span>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-sm text-muted-foreground">
          {isSignedIn
            ? `${tasks.filter(t => t.selectedBy?.id === currentUser?.id).length} görev sizin tarafınızdan seçildi`
            : "Görev seçmek için giriş yapın"}
        </p>
      </div>
    </div>
  )
}