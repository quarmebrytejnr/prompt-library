import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import growthClubLogo from '@/assets/images/growth_club.png';
import { useNavigate, Link } from 'wouter';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [, navigate] = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // In a real implementation, this would be a fetch call to your backend
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }
      
      // Redirect to login on successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setAuthError(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex-shrink-0 flex items-center">
                <img src={growthClubLogo} alt="Publicis West Africa" className="h-10 w-auto" />
              </a>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0], 
            opacity: [0.4, 0.5, 0.4] 
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#5683f7]/30 to-[#ac73d4]/30 blur-xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0], 
            opacity: [0.4, 0.6, 0.4] 
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-[#eb20a9]/30 to-[#ffd311]/30 blur-xl"
        />
      </div>
      
      {/* Signup Form */}
      <div className="container max-w-md mx-auto px-6 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/70">Join the AI Prompt Library community</p>
          </div>
          
          {authError && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 text-white rounded-lg p-3 text-sm">
              {authError}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                {...register('name')}
                className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#0ee0d8]/50`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#0ee0d8]/50`}
                placeholder="name@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`w-full bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#0ee0d8]/50`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-white/80 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={`w-full bg-white/5 border ${errors.confirmPassword ? 'border-red-500/50' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#0ee0d8]/50`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-white/20 rounded bg-white/5 focus:ring-3 focus:ring-[#0ee0d8]/50"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-white/70">
                    I agree to the <a href="/terms" className="text-[#0ee0d8] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#0ee0d8] hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#0ee0d8] to-[#5683f7] text-white py-3 rounded-lg font-medium hover:shadow-lg transition duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-white/60 text-sm">
              Already have an account?{' '}
              <Link href="/login">
                <a className="text-[#0ee0d8] hover:underline">Sign in</a>
              </Link>
            </p>
          </div>
        </motion.div>
        
        <div className="text-center mt-8">
          <Link href="/">
            <a className="text-white/50 text-sm hover:text-white transition-colors">
              ← Back to home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
} 