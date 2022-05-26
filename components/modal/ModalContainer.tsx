import { vars } from '@zoralabs/zord'

export const ModalContainer: React.FC = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: vars.color.background.primary,
      padding: vars.space.x4,
      borderRadius: vars.size.x1,
    }}
  >
    {children}
  </div>
)
