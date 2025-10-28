import { useState, useEffect } from 'react';
import { Form } from '@formio/react';
import { Link } from 'react-router-dom';

const FormRendererScreen = () => {
  const [schema, setSchema] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleFormChange = (changed: any) => {
    if (changed?.changed) {
      console.log('Field Changed:', { 
        key: changed.changed.component.key, 
        value: changed.changed.value, 
        formData: changed.data 
      });
    }
  };

  const handleSubmit = (submission: any) => {
    console.log('Form Submitted:', submission);
    setSubmissionData(submission.data);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmissionData(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <div className="text-2xl font-semibold text-gray-700">Loading Form...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg border-2 border-red-100">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">Oops! Something Went Wrong</h2>
          <p className="text-gray-700 mb-8 text-lg">{error}</p>
          <Link 
            to="/builder" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Go to Form Builder
          </Link>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-10 rounded-2xl shadow-2xl border-2 border-green-100">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">✅</div>
              <h2 className="text-4xl font-bold text-green-600 mb-3">Form Submitted Successfully!</h2>
              <p className="text-gray-600 text-lg">Thank you for your submission. Here's what you sent:</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Submission Data</h3>
              <div className="bg-white rounded-lg p-4 border border-gray-300">
                <pre className="text-sm text-gray-700 overflow-auto max-h-96">
                  {JSON.stringify(submissionData, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Submit Another Response
              </button>
              <Link
                to="/builder"
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Edit Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Preview Your Form</h1>
              <p className="text-gray-600">Test how your form looks and behaves</p>
            </div>
            <Link 
              to="/builder" 
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100"
            >
              <span>←</span> Back to Builder
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border-2 border-gray-200 shadow-inner">
            {schema && (
              <Form 
                form={schema} 
                onChange={handleFormChange}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRendererScreen;
