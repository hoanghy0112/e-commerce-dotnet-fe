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
    <div style={{
    display: 'flex',
    height: '100vh',
    backgroundImage: `url("/backgroundsignup.png")`,
    backgroundSize: '100% 100%',
     backgroundPosition: 'center',
     margin: '20px',
    borderRadius: '0 20px 20px 0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}}>
    {/* Left Section */}
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
            backgroundImage: 'url("/path/to/left-image.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px 0 0 20px',
        }}></div>
    </div>
    
    <div style={{
        width: '65%', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '0 20px 20px 0', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Sign up</h2>
        <form onSubmit={handleSubmit} style={{ width: '80%' }}>
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nguyen Van A"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="username@gmail.com"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="password" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="******"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
            </div>
            <button type="submit" style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '1rem',
            }}>
                Sign up
            </button>
        </form>
        <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
            <p>Have an account? <a href="/login" style={{ color: '#667EEA', textDecoration: 'none', fontWeight: 'bold' }}>Sign in</a></p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
            <hr style={{ width: '40%', border: 'none', borderTop: '1px solid #ddd' }} />
            <span style={{ margin: '0 1rem', color: '#666' }}>Or</span>
            <hr style={{ width: '40%', border: 'none', borderTop: '1px solid #ddd' }} />
        </div>
        <button style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#fff',
            fontWeight: 'bold',
        }}>
            <img src="/google-icon.png" alt="Google Icon" style={{ width: '20px', marginRight: '0.5rem' }} />
            Sign in with Google
        </button>
    </div>
</div>
  );
};

export default RegisterPage;