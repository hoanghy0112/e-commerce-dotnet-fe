/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { useState } from "react";
import { API_URLS } from '../../config/api-urls';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    };
    

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
      console.log(JSON.stringify(formData));
  try {
    const response = await fetch(`${API_URLS.auth.register}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Registration successful:', result);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};


 return (
    <div className="flex h-screen bg-[url('/backgroundsignup.png')] bg-100%-100% bg-center m-5 rounded-r-lg shadow-lg">
    
    <div style={{
        width: '35%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0 0 0 20px',
       padding: '2rem',
        boxShadow: 'inset -10px 0px 10px -10px rgba(0,0,0,0.2)',
    }}>
        <div style={{
            width: '100%', 
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px 0 0 20px',
        }}></div>
    </div>
    
    {/* Right Section */}
    <div className="w-2/3 flex flex-col justify-center items-center p-8 bg-white rounded-r-lg shadow-lg">
        <h2 className="text-4xl mb-6 font-bold">Sign up</h2>
        <form onSubmit={handleSubmit} className="w-3/5">
            <div className="mb-4">
                <label htmlFor="name" className="font-bold text-lg block mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nguyen Van A"
                    className="w-full p-3 rounded-lg border border-gray-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="font-bold text-lg block mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="username@gmail.com"
                    className="w-full p-3 rounded-lg border border-gray-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="font-bold text-lg block mb-2">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="******"
                    className="w-full p-3 rounded-lg border border-gray-300"
                />
            </div>
            <button type="submit" className="w-full p-3 bg-black text-white rounded-lg font-bold mb-4">Sign up</button>
        </form>
        <div className="text-center text-sm">
            <p>Have an account? <a href="/login" className="text-indigo-500 font-bold">Sign in</a></p>
        </div>
        <div className="flex items-center justify-center my-4">
            <hr className="w-2/5 border-gray-300" />
            <span className="mx-4 text-gray-600">Or</span>
            <hr className="w-2/5 border-gray-300" />
        </div>
        <button className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center font-bold bg-white">
            <img src="/google-icon.png" alt="Google Icon" className="w-5 mr-2" />
            Sign in with Google
        </button>
    </div>
</div>
  );
};

export default RegisterPage;