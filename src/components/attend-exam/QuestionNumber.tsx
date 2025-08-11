interface Props {
  questionNumber: string;
}

function QuestionNumber(props: Props) {
  const { questionNumber } = props;
  return (
    <p className="w-16 bg-red-300 px-3 text-right text-xl  font-normal text-black">
      {questionNumber}
    </p>
  );
}

export default QuestionNumber;
