import { Group, Button as MantineButton } from '@mantine/core';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  icon?: 'download' | 'save' | 'next';
  isDisabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const renderIcon = () => {
    switch (props.icon) {
      case 'download':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
        )
      case 'save':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" /><path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M14 4l0 4l-6 0l0 -4" /></svg>
        )
      case 'next':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-player-track-next"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 5v14l8 -7z" /><path d="M14 5v14l8 -7z" /></svg>
        )
      default:
        return null;
    }
  }

  return (
    <>
      <MantineButton
        rightSection={
          renderIcon()
        }
        onClick={props.onClick}
        disabled={props.isDisabled}
      >
        {props.title}
      </MantineButton>
    </>
  )
}

export default Button