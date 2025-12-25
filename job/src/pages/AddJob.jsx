import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [lavel, setLavel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form className='container p-4 flex flex-col w-full items-start gap-3'>

      {/* Job Title */}
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input
          type="text"
          placeholder='Type Here'
          onChange={e => setTitle(e.target.value)}
          value={title}
          required
          className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
        />
      </div>

      {/* Description */}
      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div ref={editorRef}></div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        {/* Category */}
        <div>
          <p className='mb-2'>Job Category</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            onChange={e => setCategory(e.target.value)}
          >
            {JobCategories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <p className='mb-2'>Job Location</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            onChange={e => setLocation(e.target.value)}
          >
            {JobLocations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div>
          <p className='mb-2'>Job Level</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            onChange={e => setLavel(e.target.value)}
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>

      </div>

      {/* Salary */}
      <div>
        <p className='mb-2'>Job Salary</p>
        <input
          min={0}
          className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]'
          onChange={e => setSalary(e.target.value)}
          type="number"
          placeholder='2500'
        />
      </div>

      <button className='w-28 py-3 mt-4 bg-black text-white rounded'>
        Add
      </button>

    </form>
  );
};

export default AddJob;
