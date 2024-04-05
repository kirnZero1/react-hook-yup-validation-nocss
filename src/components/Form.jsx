import { useForm } from 'react-hook-form'
import React from 'react'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

function Form() {

    const schema = yup.object().shape({
        fullName: yup.string().required("Please input your Full Name.").min(4).max(40),
        email: yup.string().email().required("Please input your Valid Email address"),
        age: yup.number().typeError("Age must be a number").positive().integer().min(18, "Age must be 18 and Above.").required("Please input your Age."),
        password: yup.string().min(8,"Password must be at 8 characters").max(20).required("Please input your Password")
                    .matches(/[!@#$%^&*,.":{}|<>]/,"Password must contain at least one symbol")
                    .matches(/[0-9]/, "Password must contain at least one number")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords don't match").required("Please input your Confirm Password")
    })
    const { register, handleSubmit, formState: {errors},} = useForm(
        {resolver: yupResolver(schema),}
    );   

    const onSubmit = (data) => {
        console.log(data)
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
           <label>Full Name:  </label><input type="text" placeholder="Full Name..." {...register("fullName")}/><br /><p>{errors.fullName?.message}</p><br />
            <label>Email:  </label><input type="text" placeholder="Email..." {...register("email")} /><br /><p>{errors.email?.message}</p><br />
            <label>Age:  </label><input type="number"  placeholder="Age..." {...register("age")} /><br />{errors.age?.message}<br />
            <label>Password:   </label><input type="password" placeholder="Password..." {...register("password")} /><br />{errors.password?.message}<br />
            <label>Confirm Password:   </label><input type="password" placeholder="Confirm Password..." {...register("confirmPassword")} /><br />{errors.confirmPassword?.message}<br />
            <input type="submit" />
        </form>
    </div>
  )
}

export default Form