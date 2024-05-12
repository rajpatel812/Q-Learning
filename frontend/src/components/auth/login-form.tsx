"use client"

import { useState ,useEffect} from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { loginValidation } from '@/schemas/UserSchema'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, getUserProfile } from '@/store/slice/authSlice'
import FormMessage from '../ui-component/message'
import { useRouter } from 'next/navigation'
import { Console } from 'console'

interface formValue {
    email: string
    password: string
}

function LoginForm() {
    const { error } = useSelector((state: any) => state.user)
    // console.log(error?.message);

    // const [serror, setError] = useState<string | undefined>()
    // const [success, setSuccess] = useState<string | undefined>()
    // const [isPending, startTransition] = useTransition()
    const dispatch = useDispatch()
    const router = useRouter()

    // status message
    // let state = useSelector((state: any) => state.user)
    const handleSubmit = async (val: formValue) => {
        try {
            // console.log(val);
            const response = await dispatch(userLogin(val))
            const userToken = response.payload.tokens.access
            // console.log(userToken);


            if (response.payload && response.payload.message === "Login success") {
                // Redirect the user to the home page
                const userProfileData = await dispatch(getUserProfile(userToken))
                router.push('/');
            }
        }
        catch (error) {
            throw error
        } finally {
            formik.resetForm()
        }
        // console.log(status);
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidation,
        onSubmit: handleSubmit,
    })

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 ">
                        Don&apos;t have an account?{' '}
                        <Link href='/auth/register' className="font-semibold text-black transition-all duration-200 hover:underline">Create a free account</Link>
                    </p>
                    <form method="POST" onSubmit={formik.handleSubmit} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Email address{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        name='email'
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                    ></input>
                                    {formik.touched.email && formik.errors.email && (
                                        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                                            <span className='font-medium'>{formik.errors.email}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Password{' '}
                                    </label>
                                    <Link href="#" title="" className="text-sm font-semibold text-black hover:underline">
                                        {' '}
                                        Forgot password?{' '}
                                    </Link>
                                </div>
                                <div className="mt-2">
                                    <input
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        name='password'
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                    ></input>
                                    {formik.touched.password && formik.errors.password && (
                                        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                                            <span className='font-medium'>
                                                {formik.errors.password}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </div>
                            {error && <FormMessage serror={error?.message} />}
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gray-800"
                                >
                                    Get started <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-3 space-y-3">
                        <button
                            type="button"
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                        >
                            <span className="mr-2 inline-block">
                                <svg
                                    className="h-6 w-6 text-rose-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                </svg>
                            </span>
                            Sign in with Google
                        </button>
                        <button
                            type="button"
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                        >
                            <span className="mr-2 inline-block">
                                <svg
                                    className="h-6 w-6 text-[#2563EB]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                                </svg>
                            </span>
                            Sign in with Facebook
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm