import { Button } from 'antd'
import { Spinner } from 'components/loading/Spinner'
import { useAuthProvider } from 'contexts/AuthContext'
import { ITrip } from 'domain/index'
import { getData } from 'libs/firebase'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const Trip = () => {
  const [loading, setLoading] = useState(false)
  const [trips, setTrips] = useState<ITrip[]>([])
  const { user } = useAuthProvider()

  const fetchData = async () => {
    try {
      if (!user) return
      setLoading(true)
      const data = (await getData(`trips/${user.id}`)) as ITrip[]
      setTrips(data)
    } catch (error: any) {
      toast.error(error.message as string)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user])

  return (
    <div>
      <Spinner loading={loading} />
      <div className="grid grid-cols-5 gap-5">
        {trips?.map?.((trip, index) => {
          return (
            <Button key={index} className="h-20 text-left">
              <h1 className="text-lg text-gray-600">{trip.name}</h1>
              <p className="text-gray-500">{trip.description}</p>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
