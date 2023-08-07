import {Circle} from 'react-native-svg';

interface DecoratorProps {
  x: (arg: number) => number;
  y: (arg: number) => number;
  data: number[];
}

export const Dots = (props: Partial<DecoratorProps>) => {
  const {x, y, data} = props;
  return (
    <>
      {data?.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={3}
          stroke={'rgb(255, 255, 255)'}
          fill={'white'}
        />
      ))}
    </>
  );
};
