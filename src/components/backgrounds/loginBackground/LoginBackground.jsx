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
      style={{
        objectFit: 'cover',
        position: 'absolute',
        zIndex: '-1',
        // width: '750px',
        // height: '1190px',
        right: '0',
      }}
    />
  )
}
