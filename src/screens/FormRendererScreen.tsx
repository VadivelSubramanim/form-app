
import { useState, useEffect } from 'react';
import { Form } from '@formio/react';
import { Link } from 'react-router-dom';

const FormRendererScreen = () => {
  const [schema, setSchema] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedSchema = localStorage.getItem('formioSchema');
    if (savedSchema) {
      try {
        setSchema(JSON.parse(savedSchema));
      } catch (e) {
        setError('Error parsing form schema. Please save a valid schema in the builder.');
      }
    } else {
      setError('No form schema found. Please create and save a form in the builder.');
    }
    setLoading(false);
  }, []);

  const handleFormChange = (changed: any, formData: any) => {
    console.log('Field Changed:', { 
      key: changed.changed.component.key, 
      value: changed.changed.value, 
      formData 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-2xl font-semibold text-gray-500">Loading Form...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-red-600 mb-4">An Error Occurred</h2>
        <p className="text-gray-700 mb-6">{error}</p>
        <Link 
          to="/builder" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Go to Builder
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Rendered Form</h1>
            <Link 
              to="/builder" 
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              &larr; Back to Builder
            </Link>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            {schema && <Form form={schema} onChange={handleFormChange} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRendererScreen;
