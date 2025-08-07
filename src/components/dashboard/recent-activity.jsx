"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "Enrolled in Web Development Bootcamp",
    time: "2 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32"
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Created new course: Data Science Basics",
    time: "5 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32"
  },
  {
    id: 3,
    user: "TechCorp Inc.",
    action: "Posted new job: Senior Developer",
    time: "10 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32"
  },
  {
    id: 4,
    user: "Sarah Wilson",
    action: "Completed course: Digital Marketing",
    time: "15 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32"
  },
  {
    id: 5,
    user: "Mike Johnson",
    action: "Applied for Frontend Developer position",
    time: "20 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32"
  }
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
            <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="text-xs text-muted-foreground">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  )
}
