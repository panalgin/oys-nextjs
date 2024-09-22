import { Avatar, AvatarFallback } from "@/client/components/ui/avatar"
import { Button } from "@/client/components/ui/button"
import { LogOut } from "lucide-react"
import Image from "next/image"
import { User } from "@/common/user"
import { createMockUser } from '@/client/create-mock-user'

interface AccountPanelProps {
  user: User
  onSignOut: () => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
function getColorFromName(name: string): string {
  const colors = [
    'bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 
    'bg-indigo-400', 'bg-purple-400', 'bg-pink-400'
  ]
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[index % colors.length]
}

export default function AccountPanel({ user, onSignOut }: AccountPanelProps) {
  const defaultUser: User = createMockUser("test@test.com", "Test User", "1234567890")
  const safeUser = user ?? defaultUser
  const initials = getInitials(safeUser.displayName ?? "")
  const avatarColor = getColorFromName(safeUser.displayName ?? "")

  return (
    <div className="w-full bg-gray-600 shadow-md rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Avatar className={`h-10 w-10 ${safeUser.photoURL ? '' : avatarColor}`}>
              {safeUser.photoURL ? (
                <Image 
                  src={safeUser.photoURL} 
                  alt="User Avatar" 
                  width={40} 
                  height={40} 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <AvatarFallback className="text-gray-900 font-medium">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="font-medium text-gray-100">{safeUser.displayName}</div>
            <div className="text-sm text-gray-300">{safeUser.email}</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onSignOut}
            className="text-black border-gray-700"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Oturumu Kapat
          </Button>
        </div>
      </div>
    </div>
  )
}