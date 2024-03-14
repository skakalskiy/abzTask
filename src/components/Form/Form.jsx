import React, { useState } from 'react';
import Title from '../Title/Title';

import './Form.scss';

import successImage from '../../assets/svg/success-image.svg';

const Form = ({ token, position, getUserInstanse }) => {

  const tk = token.token;
  const [pos, setPos] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccessImage, setShowSuccessImage] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('Upload your photo');


  const handleSubmit = (e) => {

    const formData = new FormData();
    formData.append('position_id', pos);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('photo', selectedFile);


    setName('');
    setEmail('');
    setPhone('');
    setPos('');
    setSelectedFile(null);
    setErrors({});

    const validationErrors = {};

    if (!name || name.length < 2 || name.length > 60) {
      validationErrors.name = 'Username should contain 2-60 characters =)';
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      validationErrors.email = 'Please enter a valid email address =)';
    }

    if (!phone || !phone.startsWith('+380') || !/^\+380\d{9}$/.test(phone)) {
      validationErrors.phone = 'Please enter a valid Ukrainian phone number starting with +380 =)';
    }

    if (!pos) {
      validationErrors.position = 'Please select a position=)';
    }

    if (!selectedFile ||!selectedFile.name.toLowerCase().endsWith('.jpg')) {
      validationErrors.photo = 'Please select a photo in JPG format=)';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      body: formData,
      headers: {
        'Token': tk,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success) {
          setShowSuccessImage(true);
          getUserInstanse(data.user_id);
          console.log(data.user_id)
        } else {
          console.log('process server errors')
        }
      })
      .catch(function (error) {
        console.log(' proccess network errors')
      });
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit()
      }}>
        <input required
          className='text'
          type="text"
          name='name'
          placeholder='Your name'
          value={name}
          onChange={e => setName(e.target.value)}

        />
        {errors.name && <p className="error">{errors.name}</p>}
        <input required className='text' type="email" name='email' placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input required className='text last' type="tel" name='phone' placeholder='Phone'
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <p className='num'>+ 38(XXX) XXX-XX-XX</p>
        <h4>
          Select your position
        </h4>
        {
          position &&
          position.positions &&
          position.positions.length > 0 && (
            <>
              {position.positions.map((item) => (
                <div className='flex' key={item.id}>
                  <input
                    className='check'
                    required
                    type='radio'
                    name='position'
                    value={item.id}
                    onChange={() => setPos(item.id)}
                    checked={pos === item.id}
                  />
                  <p className='pos'>{item.name}</p>
                </div>
              ))}
            </>
          )
        }
        {errors.position && <p className="error">{errors.position}</p>}
        <input
          className='text upload'
          type="file"
          name="photo"
          accept="image/*"
          id='uploadBtn'
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
            setUploadedFileName(e.target.files[0] ? e.target.files[0].name : "");
          }}
        />
        <div className='uploadBlock'>
          <label className='uploadLabel' htmlFor="uploadBtn">
            Upload Photo
          </label>
          <p>{uploadedFileName}</p>
        </div>

        {errors.photo && <p className="error">{errors.photo}</p>}
        <button className='submitBtn' type='submit' text='Sign up'>
          Submit
        </button>
      </form >
      {showSuccessImage && (
        <div className='successBlock'>
          <Title title='User successfully registered' />
          <img className='successImg' src={successImage} alt="success" />
        </div>
      )}
    </>

  )
}

export default Form;