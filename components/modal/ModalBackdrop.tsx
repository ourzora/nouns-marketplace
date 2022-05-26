export const ModalBackdrop: React.FC = ({ children }) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 10000,
    }}
  >
    {children}
  </div>
)
