
import { useState, useEffect } from 'react';
import { FormBuilder } from '@formio/react';

const defaultSchema = {
  components: [
    { type: 'textfield', key: 'firstName', label: 'First Name' },
    { type: 'email', key: 'email', label: 'Email' },
    { type: 'button', key: 'submit', label: 'Submit', action: 'submit' },
  ],
};

const FormBuilderScreen = () => {
  const [schema, setSchema] = useState(defaultSchema);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSchema = localStorage.getItem('formioSchema');
    if (savedSchema) {
      try {
        setSchema(JSON.parse(savedSchema));
      } catch (error) {
        console.error('Error parsing saved schema:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('formioSchema', JSON.stringify(schema));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
        <div className="flex justify-end mb-4">
          <button 
            onClick={handleSave} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {saved ? 'Saved!' : 'Save Form'}
          </button>
        </div>
        <FormBuilder form={schema} onChange={setSchema} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-2">Live JSON Schema</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto max-h-96">
          <code>{JSON.stringify(schema, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default FormBuilderScreen;
