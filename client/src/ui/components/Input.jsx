import React from 'react'

const InputField = ({ label, type, id, placeholder, className, registerOptions, errors }) => {
  return (
    <div className='input-text text-start'>
      <label htmlFor={id} className='form-label'>{label}</label>
      <input 
        type={type} 
        id={id} 
        placeholder={placeholder}
        className={className} 
        {...registerOptions}
      />
      <small>
        {errors?.type === "required" && <span>Campo Obrigatório</span>}
        {errors?.type === "minLength" && <span>Muito pequeno</span>}
        {errors?.type === "noSpecialChars" && <span>Apenas Letras e Números</span>}
        {errors?.type === "hasNumber" && <span>Inclua um número em sua Senha</span>}
        {errors?.type === "hasSpecialChar" && <span>Inclua um caractére especial</span>}
        {errors?.type === "validate" && <span>{errors?.message}</span>}
      </small>
    </div>
  );
};

export default InputField;