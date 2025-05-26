import { ScaleLoader } from 'react-spinners';

type LoadingSpinnerProps = {
  smallHeight?: boolean;
};

const LoadingSpinner = ({ smallHeight }: LoadingSpinnerProps) => {
  return (
    <div
      className={`${
        smallHeight ? 'h-[250px]' : 'h-[70vh]'
      } flex flex-col justify-center items-center`}
    >
      <ScaleLoader height={35} width={4} radius={2} margin={2} color="red" />
    </div>
  );
};

export default LoadingSpinner;
