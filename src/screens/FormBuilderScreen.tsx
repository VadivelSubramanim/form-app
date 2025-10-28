
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
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Builder Card */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Form Builder</h1>
                <button 
                  onClick={handleSave} 
                  className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${saved ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {saved ? '✓ Saved' : 'Save Form'}
                </button>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <FormBuilder form={schema} onChange={setSchema} />
              </div>
            </div>
          </div>

          {/* JSON Schema Card */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-lg h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Live JSON Schema</h2>
              <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-auto h-[calc(100%-3rem)] text-sm">
                <code>{JSON.stringify(schema, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderScreen;
