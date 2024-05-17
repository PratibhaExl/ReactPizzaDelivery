import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
const formSchema=Yup.object({
    fullName: Yup.string()
      .required('Required')
      .matches(/^[a-zA-Z ]+$/,"Only alphabate allow"),
    email: Yup.string()
      .required('Required'),
    mobile: Yup.string()
      .required('Required')
      .matches(/^[6-9][0-9]{9}$/,"Only 10 digit allow start from [6-9]"),
})
export default function Myforms() {
    const formik = useFormik({
        initialValues:{
            fullName:'',
            email:'',
            mobile:''
        },
        validationSchema:formSchema,
        onSubmit:(values)=>{
            console.log(values)
        }
    })
  return (
    <div>
        <h2> My Form</h2>
        <form onSubmit={formik.handleSubmit}>
            <div className='form-group'>
                <label> Full Name</label>
                <input type='text' name="fullName" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.fullName && formik.errors.fullName ? (
                    <div className='alert alert-danger'>{formik.errors.fullName}</div>
                ) : null}
            </div>
            <div className='form-group'>
                <label> Email</label>
                <input type='text' name="email" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? (
                    <div className='alert alert-danger'>{formik.errors.email}</div>
                ) : null}
            </div>
            <div className='form-group'>
                <label> Mobile</label>
                <input type='text' name="mobile" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.mobile && formik.errors.mobile ? (
                    <div className='alert alert-danger'>{formik.errors.mobile}</div>
                ) : null}
            </div>
            <input type='submit' value="Submit" className='btn btn-primary'/>
        </form>
    </div>
  )
}
