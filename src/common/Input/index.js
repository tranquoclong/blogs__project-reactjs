import './Input.css';
import { useEffect, useState } from 'react';
import classnames from 'classnames';

Input.defaultProps = {
  type: 'text'
}

export default function Input({
  type,
  labelText,
  placeholder,
  value,
  onChange,
  errorText,
  isShowErrorText,
}) {
  const [localType, setlocalType] = useState('text');
  const [valueText, setValueText] = useState('');

  useEffect(() => {
    if(value) {
      setValueText(value);
    }
  }, [value])

  useEffect(() => {
    if (type) {
      setlocalType(type);
    }
  }, [type])

  function localOnChange(evt) {
    setValueText(evt.target.value);
    
    if (typeof onChange === 'function') {
      onChange(evt);
    }
  }

  function handleToggleShowPassword() {
    if (localType === 'password') {
      setlocalType('text');
    } else {
      setlocalType('password');
    }
  }

  return (
    <div className={classnames('form-control', {
      'form-control__has-error': errorText
    })}>
      {
        labelText && <label>{ labelText }</label>
      }
      { type === 'password' && (
        <i 
          onClick={handleToggleShowPassword} 
          className={classnames('toggle-password', {
            'ion-eye': localType === 'text',
            'ion-eye-disabled': localType === 'password'
          })}
        />
      ) }
      <input 
        type={localType} 
        value={valueText}
        placeholder={placeholder}
        onChange={localOnChange}
      />
      { 
        isShowErrorText && errorText && 
          <span className="form-control__error-text">{errorText}</span> 
      }
    </div>
  )
}

// Props down
// Function up
// Component con -> KHÔNG ĐƯỢC QUYỀN thay đổi props của thằng cha truyền vào