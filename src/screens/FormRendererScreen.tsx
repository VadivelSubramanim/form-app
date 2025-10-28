
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
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/builder" className="text-blue-600 hover:underline">Back to Builder</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Rendered Form</h1>
        {schema && <Form form={schema} onChange={handleFormChange} />}
        <div className="mt-6 text-center">
          <Link to="/builder" className="text-blue-600 hover:underline">Back to Builder</Link>
        </div>
      </div>
    </div>
  );
};

export default FormRendererScreen;
