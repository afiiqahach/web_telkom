'use client';
import Image from "next/image";
import { useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi apakah kata sandi dan konfirmasi kata sandi cocok
        if (password !== confirmPassword) {
            setError("Password and confirm password do not match.");
            return;
        }

        // Buat user dengan email dan password
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update profile dengan username
            await updateProfile(user, {
                displayName: username,
            });

            // Kirim email verifikasi
            await sendEmailVerification(user);

             // Simpan informasi pengguna ke Firestore
             await setDoc(doc(db, "arina", user.uid), {
                username: username,
                email: email,
                createdAt: new Date(),  // Tanggal pembuatan akun
            });

            setSuccess("Sign up successful! Verification email sent.");
            setError(""); // Reset error message

            setTimeout(() => {
                router.push("/")
            }, 1000)
        } catch (error) {
            // Use general Error type
            if (error instanceof Error) {
                setError(error.message); // Access the error message safely
            } else {
                setError("An unexpected error occurred."); // Handle unexpected error
            }
            setSuccess(""); // Reset success message
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-200">
            <div className="bg-white p-10 rounded-lg shadow-lg w-[420px]">
                <h2 className="text-center text-3xl font-semibold mb-4">Create an account</h2>
                <p className="text-center text-gray-500 mb-6">Connect with our server</p>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Username Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Your Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <Image
                                src={showPassword ? '/img/eye-closed.png' : '/img/eye-open.png'}
                                alt="Show/Hide Password"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Your Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Image
                                src={showConfirmPassword ? '/img/eye-closed.png' : '/img/eye-open.png'}
                                alt="Show/Hide Confirm Password"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>

                    {/* Sign-up Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
