'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { QuestionWithAnswers } from '@/lib/types';
import { fixHtmlLinks } from '@/lib/html-utils';

interface Props {
  question: QuestionWithAnswers;
  translations: {
    correctAnswer: string;
    explanation: string;
    description: string;
    selectAnswer: string;
    correctFeedback: string;
    incorrectFeedback: string;
  };
}

export default function InteractiveQuestion({ question, translations }: Props) {
  const params = useParams();
  const locale = (params?.locale as string) || 'pl';

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerClick = (position: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(position);
      setShowExplanation(true);
    }
  };

  const isImage = question.media?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isVideo = question.media?.match(/\.(mp4|webm|mov)$/i);
  const mediaUrl = question.media ? `https://coffeebrew.org/media/${question.media}` : null;

  // Fix HTML links to point to our reference pages
  const fixedDescription = useMemo(
    () => question.description ? fixHtmlLinks(question.description, locale) : null,
    [question.description, locale]
  );

  const fixedExplanation = useMemo(
    () => question.explanation ? fixHtmlLinks(question.explanation, locale) : null,
    [question.explanation, locale]
  );

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 mb-4 sm:mb-6">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 sm:mb-6">
        {question.question}
      </h1>

      {/* Media */}
      {mediaUrl && (
        <div className="mb-4 sm:mb-6 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          {isImage && (
            <img
              src={mediaUrl}
              alt={question.question}
              className="w-full h-auto"
              loading="lazy"
            />
          )}
          {isVideo && (
            <video
              src={mediaUrl}
              controls
              className="w-full h-auto"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}

      {/* Description */}
      {fixedDescription && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
          <p className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            {translations.description}
          </p>
          <div
            className="text-sm text-zinc-600 dark:text-zinc-400 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-700 dark:[&_a]:text-blue-400"
            dangerouslySetInnerHTML={{ __html: fixedDescription }}
          />
        </div>
      )}

      {/* Answers */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {question.answers.map((answer) => {
          const isCorrect = answer.position === question.correct_answer;
          const isSelected = answer.position === selectedAnswer;
          const isWrong = isSelected && !isCorrect;
          const showAsCorrect = selectedAnswer !== null && isCorrect;
          const labels = ['A', 'B', 'C'];

          // Determine button styling
          let buttonStyle = 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900';
          let badgeStyle = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50';
          let textStyle = 'text-zinc-700 dark:text-zinc-300';

          if (showAsCorrect) {
            buttonStyle = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            badgeStyle = 'bg-green-500 text-white';
            textStyle = 'text-zinc-900 dark:text-zinc-50 font-semibold';
          } else if (isWrong) {
            buttonStyle = 'border-red-500 bg-red-50 dark:bg-red-900/20';
            badgeStyle = 'bg-red-500 text-white';
            textStyle = 'text-zinc-900 dark:text-zinc-50';
          }

          return (
            <button
              key={answer.id}
              onClick={() => handleAnswerClick(answer.position)}
              disabled={selectedAnswer !== null}
              className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all ${buttonStyle} ${
                selectedAnswer === null ? 'hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div
                  className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm ${badgeStyle}`}
                >
                  {labels[answer.position]}
                </div>
                <p className={`flex-1 text-left text-sm sm:text-base ${textStyle}`}>
                  {answer.answer}
                </p>
                {showAsCorrect && (
                  <span className="flex-shrink-0 px-2 py-1 bg-green-500 text-white text-xs rounded font-semibold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {translations.correctAnswer}
                  </span>
                )}
                {isWrong && (
                  <span className="flex-shrink-0 px-2 py-1 bg-red-500 text-white text-xs rounded font-semibold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Message */}
      {selectedAnswer !== null && (
        <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border-l-4 ${
          selectedAnswer === question.correct_answer
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
            : 'bg-red-50 dark:bg-red-900/20 border-red-500'
        }`}>
          <p className={`text-sm sm:text-base font-semibold ${
            selectedAnswer === question.correct_answer
              ? 'text-green-900 dark:text-green-100'
              : 'text-red-900 dark:text-red-100'
          }`}>
            {selectedAnswer === question.correct_answer
              ? `✓ ${translations.correctFeedback}`
              : `✗ ${translations.incorrectFeedback}`
            }
          </p>
        </div>
      )}

      {/* Explanation (shown after answering) */}
      {showExplanation && fixedExplanation && (
        <div className="p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
          <p className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
            {translations.explanation}
          </p>
          <div
            className="text-sm text-zinc-700 dark:text-zinc-300 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-700 dark:[&_a]:text-blue-400"
            dangerouslySetInnerHTML={{ __html: fixedExplanation }}
          />
        </div>
      )}
    </div>
  );
}
