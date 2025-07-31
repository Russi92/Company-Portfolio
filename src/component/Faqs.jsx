

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get('https://theway4business.27lashabab.com/api/faqs');
        setFaqs(res.data.data.reverse());
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 p-4">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white-300 drop-shadow-lg mb-6 tracking-wide">FAQS</h2>

      {faqs.map((faq, index) => (
        <div key={faq.id} className="border-b border-gray-300 py-4">
          <button
            className="w-full flex justify-between items-center text-left text-lg font-semibold text-while (condition) {
                
            }"
            onClick={() => toggleDropdown(index)}
          >
            {faq.question}
            <span className="text-white text-xl">
              {openIndex === index ? '-' : '+'}
            </span>
          </button>

          {openIndex === index && (
            <div className="mt-2 text-gray-200 text-sm">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faqs;
