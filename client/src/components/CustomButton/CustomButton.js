
import './CustomButton.css';

export default function CustomButton({children,isTransparent,...otherProps}) {
  return (
    <button className={`${isTransparent ? 'transparent':''} btn`} {...otherProps}>
      {children}
    </button>
  )
}
