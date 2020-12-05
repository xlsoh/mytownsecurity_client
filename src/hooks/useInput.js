import { useState } from 'react';

export default (defaultvalue) => {
  const [value, setValue] = useState(defaultvalue);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };
  return { value, onChange, setValue };
};
