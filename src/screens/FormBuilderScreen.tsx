import { useState, useEffect } from 'react';
import { FormBuilder } from '@formio/react';

const defaultSchema = {
  components: [
    { 
      type: 'textfield', 
      key: 'firstName', 
      label: 'First Name',
      placeholder: 'Enter your first name',
      validate: { required: true }
    },
    { 
      type: 'textfield', 
      key: 'lastName', 
      label: 'Last Name',
      placeholder: 'Enter your last name',
      validate: { required: true }
    },
    { 
      type: 'email', 
      key: 'email', 
      label: 'Email Address',
      placeholder: 'you@example.com',
      validate: { required: true }
    },
    { 
      type: 'phoneNumber', 
      key: 'phone', 
      label: 'Phone Number',
      placeholder: '+1 (555) 000-0000'
    },
    { 
      type: 'button', 
      key: 'submit', 
      label: 'Submit Form', 
      action: 'submit',
      theme: 'primary'
    },
  ],
};

const FormBuilderScreen = () => {
  const [schema, setSchema] = useState(defaultSchema);
  const [saved, setSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    const savedSchema = localStorage.getItem('formioSchema');
    const savedTime = localStorage.getItem('formioSavedTime');
    
    if (savedSchema) {
      try {
        setSchema(JSON.parse(savedSchema));
        setLastSaved(savedTime);
      } catch (error) {
        console.error('Error parsing saved schema:', error);
      }
    }
  }, []);

  const handleSave = () => {
    const currentTime = new Date().toLocaleString();
    localStorage.setItem('formioSchema', JSON.stringify(schema));
    localStorage.setItem('formioSavedTime', currentTime);
    setLastSaved(currentTime);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default schema? This cannot be undone.')) {
      setSchema(defaultSchema);
      localStorage.removeItem('formioSchema');
      localStorage.removeItem('formioSavedTime');
      setLastSaved(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Form Builder Studio</h1>
          <p className="text-gray-600">Design and customize your forms with drag-and-drop simplicity</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Builder Card */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Build Your Form</h2>
                  {lastSaved && (
                    <p className="text-sm text-gray-500 mt-1">Last saved: {lastSaved}</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleReset} 
                    className="px-5 py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={handleSave} 
                    className={`px-6 py-2.5 rounded-lg font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg ${
                      saved 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {saved ? '✓ Saved Successfully' : '💾 Save Form'}
                  </button>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:border-blue-400 transition-colors">
                <FormBuilder form={schema} onChange={setSchema} />
              </div>
            </div>
          </div>

          {/* JSON Schema Card */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">📋 Live Schema</h2>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
                    alert('Schema copied to clipboard!');
                  }}
                  className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-gray-700 transition-colors"
                >
                  Copy JSON
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-inner">
                <pre className="text-green-400 p-5 overflow-auto max-h-[600px] text-xs font-mono leading-relaxed">
                  <code>{JSON.stringify(schema, null, 2)}</code>
                </pre>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Component count: <span className="font-semibold text-blue-600">{schema.components.length}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderScreen;
