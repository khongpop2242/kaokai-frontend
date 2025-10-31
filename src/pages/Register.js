import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getApiUrl } from '../config/api';
import './Register.css';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [accept, setAccept]       = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!accept) {
      setError('กรุณายอมรับเงื่อนไขการใช้งาน');
      return;
    }
    if (password.length < 8) {
      setError('รหัสผ่านอย่างน้อย 8 ตัวอักษร');
      return;
    }
    if (password !== confirm) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    setLoading(true);
    try {
      const name = `${firstName} ${lastName}`.trim();
      const apiUrl = getApiUrl('api/auth/register');
      console.log('Register API URL:', apiUrl);
      console.log('Register data:', { name, email, phone: phone || null });
      
      const res = await axios.post(apiUrl, {
        name, email, password, phone: phone || null
      });
      
      console.log('Register response:', res.data);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/profile';
    } catch (err) {
      console.error('Register error:', err);
      console.error('Error response:', err?.response);
      console.error('Error details:', {
        status: err?.response?.status,
        data: err?.response?.data,
        message: err?.message
      });
      
      if (err?.response?.status === 404) {
        setError('ไม่พบ API endpoint ที่ต้องการ กรุณาตรวจสอบการเชื่อมต่อ');
      } else if (err?.response?.status === 409) {
        setError(err?.response?.data?.message || 'อีเมลนี้มีผู้ใช้แล้ว');
      } else if (err?.response?.status === 400) {
        setError(err?.response?.data?.message || 'กรุณากรอกข้อมูลให้ครบถ้วน');
      } else if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network')) {
        setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง');
      } else {
        setError(err?.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* LEFT: big logo image */}
        <div className="register-left">
          {/* ถ้าไฟล์อยู่ใน public ใช้ path แบบนี้ได้เลย */}
          <img
            className="logo-login"
            src="/images/logo-login-kaokai.png"
            alt="Kaokai Furniture"
          />
        </div>

        {/* RIGHT: form */}
        <div className="register-right">
          <h1>สมัครสมาชิก</h1>
          <form onSubmit={onSubmit} className="register-form">
            <label>ชื่อ - นามสกุล</label>
            <div className="name-row">
              <input
                type="text"
                placeholder="ชื่อ"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="นามสกุล"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <label>อีเมล์ผู้ใช้งาน</label>
            <input
              type="email"
              placeholder="อีเมล์ผู้ใช้งาน"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>เบอร์มือถือ</label>
            <input
              type="tel"
              placeholder="หมายเลขโทรศัพท์"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label>รหัสผ่าน</label>
            <input
              type="password"
              placeholder="อย่างน้อย 8 ตัวอักษร"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              placeholder="พิมพ์รหัสผ่านอีกครั้ง"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <div className="terms">
              <label>
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                />
                <span>
                  {' '}
                  ฉันได้อ่านและยอมรับ เงื่อนไขการใช้บริการ และ นโยบายความเป็นส่วนตัว
                </span>
              </label>
            </div>

            {error && <div className="error">{error}</div>}

            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
            </button>

            <div className="login-note">
              หากคุณมีบัญชีอยู่แล้ว สามารถ <Link to="/login">เข้าสู่ระบบ</Link> ได้ที่นี่
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
