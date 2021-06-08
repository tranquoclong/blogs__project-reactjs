import './Button.css';
import cls from 'classnames';
import Loading from '../Loading';

function AppButton({ 
  children,
  btnType = 'default',
  isSizeLarge,
  isLoading,
  loadingPosition,
  htmlType,
  ...restProps
}) {
  const classes = cls('btn', {
    'btn-category': btnType === 'category',
    'btn-primary': btnType === 'primary',
    'btn-default': btnType === 'default',
    'btn-size-large': isSizeLarge,
  })
  // const classes = ['btn'];

  // switch (btnType) {
  //   case 'category':
  //     classes.push('btn-category');
  //     break;
  //   case 'primary':
  //     classes.push('btn-primary');
  //     break;
  //   default:
  //     classes.push('btn-default');
  //     break;
  // }

  // if (isSizeLarge) {
  //   classes.push('btn-size-large')
  // }
  
  const jsxContent = (
    <>
      {loadingPosition !== 'after' && isLoading && <Loading /> }
      {children}
      {loadingPosition === 'after' && isLoading && <Loading /> }
    </>
  )

  if (htmlType === 'a') {
    return (
      <a className={classes} {...restProps} >{jsxContent}</a>
    )
  }

  return (
    <button className={classes} {...restProps}>{jsxContent}</button>
  )
}

export default AppButton;