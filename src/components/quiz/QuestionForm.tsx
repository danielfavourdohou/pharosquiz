
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Question {
  text: string;
  options: string[];
  correctOptionIndex: number;
}

interface QuestionFormProps {
  question: Question;
  onChange: (question: Question) => void;
}

const QuestionForm = ({ question, onChange }: QuestionFormProps) => {
  const updateQuestionText = (text: string) => {
    onChange({ ...question, text });
  };

  const updateQuestionOption = (index: number, text: string) => {
    const newOptions = [...question.options];
    newOptions[index] = text;
    onChange({ ...question, options: newOptions });
  };

  const updateCorrectAnswer = (index: number) => {
    onChange({ ...question, correctOptionIndex: index });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="question-text" className="block mb-2 text-sm font-medium">
          Question Text
        </label>
        <Input
          id="question-text"
          value={question.text}
          onChange={(e) => updateQuestionText(e.target.value)}
          placeholder="Enter your question here..."
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Answer Options
        </label>

        <RadioGroup
          value={question.correctOptionIndex.toString()}
          onValueChange={(value) => updateCorrectAnswer(Number(value))}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center gap-3 border border-gray-200 p-3 rounded-md">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="text-sm font-medium min-w-20">
                Option {String.fromCharCode(65 + index)}
              </Label>
              <Input
                value={option}
                onChange={(e) => updateQuestionOption(index, e.target.value)}
                placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                className="flex-grow"
              />
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default QuestionForm;
