import airforceBg from '@/../public/AirForceBg.jpeg'
import Image from 'next/image'

export default function LoginBackground() {
  return (
    <Image
      alt=""
      src={airforceBg}
      placeholder="blur"
      quality={100}
      fill
    />
  )
}
