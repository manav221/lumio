import useAuth from '../hooks/useAuth';
import FieldError from '../../../shared/components/ui/FieldError'
import FormErrorBanner from '../../../shared/components/ui/FormErrorBanner';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, onLogin, isSubmitting, error, handleChange } = useAuth();
    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">

            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl shadow-orange-500/10 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome <span className="text-orange-500">Back</span>
                    </h1>
                    <p className="text-neutral-400 text-sm">
                        Please sign in to your account
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit(onLogin)}>
                    <FormErrorBanner err={error} />

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="user-id"
                            className="block text-sm font-medium text-neutral-300 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            {...register("userId")}
                            onChange={handleChange}
                            id="user-id"
                            type="text"
                            placeholder="enter your email or username"
                            className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        />
                        <FieldError error={error} field={"userId"} />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-neutral-300 mb-2"
                        >
                            Password
                        </label>
                        <input
                            {...register("password")}
                            onChange={handleChange}
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        />
                        <FieldError error={error} field={"password"} />
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-orange-500 focus:ring-orange-500 accent-orange-500"
                            />
                            Remember me
                        </label>
                        <a
                            href="#"
                            className="text-orange-500 hover:text-orange-400 transition"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold shadow-lg shadow-orange-500/10 transition-all duration-200 active:scale-[0.98]"
                    >
                        {isSubmitting ? "Logging..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-neutral-800" />
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">
                        or
                    </span>
                    <div className="flex-1 h-px bg-neutral-800" />
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-orange-500 hover:bg-neutral-900 text-neutral-200 text-sm transition">
                        Google
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-orange-500 hover:bg-neutral-900 text-neutral-200 text-sm transition">
                        GitHub
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-neutral-400 mt-6">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="text-orange-500 hover:text-orange-400 font-medium transition">
                        register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login