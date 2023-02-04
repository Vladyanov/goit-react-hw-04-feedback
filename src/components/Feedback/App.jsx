import { useState } from 'react';

import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from 'components/Notification/Notification';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const calcFeedback = name => {
    setFeedback(prevState => {
      return { ...prevState, [name]: prevState[name] + 1 };
    });
  };

  const countPositiveFeedbackPercentage = propName => {
    if (!total) {
      return 0;
    }
    const value = ((propName / total) * 100).toFixed();
    return Number(value);
  };

  const { good, neutral, bad } = feedback;
  const total = good + neutral + bad;
  const positivePercent = countPositiveFeedbackPercentage(good);

  return (
    <>
      <Section title="Please leave feedback"></Section>
      <FeedbackOptions onLeaveFeedback={calcFeedback} />
      <Section title="Statistics"></Section>
      {!total ? (
        <Notification message="There is no feedback"></Notification>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercent}
        />
      )}
    </>
  );
};

export default App;
