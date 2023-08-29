import { useEffect } from "react"

export default function OnboardSubscription() {
  useEffect(()=> {
    console.log('not subscribed');
  }, [])
  return (
    <div>OnboardSubscription</div>
  )
}
