import React from 'react';

interface SubmitButtonProps {
  label?: string;
  isSubmitting?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = 'Submit',
  isSubmitting = false,
}) => {
  return (
    <button
      type="submit"
  className="bg-gradient-to-r from-[#7FB77E] to-[#B1D7B4] text-white hover:from-[#B1D7B4] hover:to-[#7FB77E] px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 disabled:opacity-50"
 disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : label}
    </button>
  );
};

export default SubmitButton;
