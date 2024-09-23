import Select from 'react-select';

const SelectField = ({ options, defaultValue, placeholder, onChange }) => {
  return (
    <Select
        className='fs-5'
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
        styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? 'grey' : 'black',
              padding: '2px',
            }),
        }}
    />
  );
};

export default SelectField;