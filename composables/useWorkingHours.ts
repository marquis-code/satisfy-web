import { ref } from 'vue'

interface DaySchedule {
  isOpen: boolean
  openingTime: string
  closingTime: string
}

type WeekSchedule = {
  [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: DaySchedule
}

export function useWorkingHours() {
  const schedule = ref<WeekSchedule>({
    monday: { isOpen: true, openingTime: '09:00', closingTime: '21:00' },
    tuesday: { isOpen: true, openingTime: '09:00', closingTime: '21:00' },
    wednesday: { isOpen: true, openingTime: '09:00', closingTime: '21:00' },
    thursday: { isOpen: true, openingTime: '09:00', closingTime: '21:00' },
    friday: { isOpen: true, openingTime: '09:00', closingTime: '21:00' },
    saturday: { isOpen: true, openingTime: '09:00', closingTime: '21:00' },
    sunday: { isOpen: true, openingTime: '09:00', closingTime: '21:00' }
  })

  const originalSchedule = ref<WeekSchedule>({...schedule.value})

  const updateSchedule = () => {
    // In a real app, this would send data to the server
    return new Promise<void>(resolve => {
      setTimeout(() => {
        originalSchedule.value = JSON.parse(JSON.stringify(schedule.value))
        resolve()
      }, 500)
    })
  }

  const discardChanges = () => {
    schedule.value = JSON.parse(JSON.stringify(originalSchedule.value))
  }

  return {
    schedule,
    updateSchedule,
    discardChanges
  }
}