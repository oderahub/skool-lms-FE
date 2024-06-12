
interface MainButtonProps {
    button_text: string;
    customClassName?: string;
    disableHover?: boolean;
    onClick?: () => void;
  }
  export default function MainButton(props: MainButtonProps) {
    const buttonClass = `main-btn-component bg-green-600 ${
      props.disableHover ? '' : 'hover:bg-green-500'
    } w-full px-4 py-3 text-center text-white text-sm rounded-lg ${props.customClassName || ''}`;

    const cursorStyle = props.disableHover ? 'default' : 'cursor-pointer';

    return (
      <button type="submit" className={buttonClass}  style={{ cursor: cursorStyle, pointerEvents: props.disableHover ? 'none' : 'auto' }} onClick={props.onClick}>
        {props.button_text}
      </button>
    );
  }