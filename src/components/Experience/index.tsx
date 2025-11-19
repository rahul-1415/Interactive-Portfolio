import { Html, Sky } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { ModalProvider } from '@App/core/context/ModalContext'
import { Lights } from '../Lights'
import { Islands } from './Islands'
import { Ocean } from './Ocean'
import { Ship } from './Ship'

export const Experience = () => {
  return (
    <>
      <color args={['blue']} attach='background' />

      <Sky sunPosition={[1, 2, 3]} />

      <Physics>
        <Lights />

        <ModalProvider>
          <Html fullscreen>
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                padding: '0.75rem 1rem',
                background: 'rgba(0, 0, 0, 0.45)',
                color: '#f5f1e6',
                fontFamily: '"Gochi Hand", cursive',
                fontSize: '1.1rem',
                borderRadius: '12px',
                maxWidth: '320px',
                lineHeight: '1.4rem',
                pointerEvents: 'none',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)'
              }}
            >
              To move the ship: <br></br>
              W / ↑ to sail forward <br></br>
              A / ← to steer left <br></br>
              D / → to steer right 
            </div>
          </Html>

          <Islands />

          <Ship />

          <Ocean />
        </ModalProvider>
      </Physics>
    </>
  )
}
