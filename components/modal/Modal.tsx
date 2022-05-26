import ReactDOM from 'react-dom'
import { ModalBackdrop } from './ModalBackdrop'
import { ModalContainer } from './ModalContainer'

export const Modal: React.FC<{}> = ({ children }) => {
  const root = document.getElementById('modal-root')

  if (!root) return null

  return ReactDOM.createPortal(
    <ModalBackdrop>
      <ModalContainer>{children}</ModalContainer>
    </ModalBackdrop>,
    root
  )
}
