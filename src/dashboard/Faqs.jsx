



import React, { useEffect, useState } from 'react';

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingId, setEditingId] = useState(null); // الجديد

  useEffect(() => {
    fetch('https://theway4business.27lashabab.com/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setFaqs(data.data.reverse());
        }
      })
      .catch((err) => console.error('فشل تحميل الأسئلة:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) return alert("كل الحقول مطلوبة");

    const token = localStorage.getItem("token");

    if (editingId) {
      // تعديل سؤال موجود
      try {
        const res = await fetch(`https://theway4business.27lashabab.com/api/faqs/${editingId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question, answer }),
        });

        const data = await res.json();
        if (res.ok) {
          setFaqs(prev =>
            prev.map(faq => (faq.id === editingId ? data.data : faq))
          );
          setQuestion('');
          setAnswer('');
          setEditingId(null);
          alert("تم تعديل السؤال بنجاح");
        } else {
          alert("فشل التعديل");
          console.error("فشل التعديل:", data);
        }
      } catch (error) {
        console.error("خطأ أثناء التعديل:", error);
      }
    } else {
      // إضافة سؤال جديد
      try {
        const res = await fetch('https://theway4business.27lashabab.com/api/faqs/create', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question, answer }),
        });

        const data = await res.json();
        if (data?.data) {
          setFaqs((prev) => [data.data, ...prev]);
          setQuestion('');
          setAnswer('');
          alert("تمت إضافة السؤال بنجاح");
        } else {
          console.error("فشل في الإضافة:", data);
        }
      } catch (error) {
        console.error("خطأ أثناء الإرسال:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("هل أنت متأكد من حذف هذا السؤال؟");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://theway4business.27lashabab.com/api/faqs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await res.json();
      if (res.ok) {
        setFaqs(prev => prev.filter(faq => faq.id !== id));
        alert("تم حذف السؤال بنجاح");
      } else {
        alert("فشل في الحذف");
        console.error("خطأ في الحذف:", data);
      }
    } catch (error) {
      console.error("خطأ أثناء الحذف:", error);
    }
  };

  const handleEdit = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditingId(faq.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-black p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">FAQS</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Question"
          className="w-full border px-3 py-2 rounded focus:outline-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <textarea
          placeholder="Answer"
          rows={4}
          className="w-full border px-3 py-2 rounded resize-none focus:outline-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {editingId ? "Save Changes" : "Add New Question"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white shadow p-4 rounded relative">
            <h3 className="text-lg font-bold mb-2 text-blue-700">{faq.question}</h3>
            <p className="text-sm text-gray-800 whitespace-pre-line break-words">{faq.answer}</p>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(faq)}
                className="text-green-600 hover:underline"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="text-red-600 hover:underline"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;



