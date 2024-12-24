'use client'
import {signout} from '../../app/login/actions'

export default function SignOutButton() {
    return (
        <form>
            <button
                formAction={signout}
                className="bg-gradient-to-r form-purple-500 to-pink-500 text-white py-2 px-4 rounded-xl
                        hover:form-purple-500 hover:to-pink-800 transition duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Sign Out
            </button>       
        </form>
    )
}