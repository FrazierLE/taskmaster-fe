import ReactDOM from "react-dom";
import { waitFor } from "@testing-library/react";
import { render } from '@testing-library/react';
import App from "../../components/App/App";
import BehavioralQuestion from "../../components/BehavioralQuestion/BehavioralQuestion";

describe('Behavioral Test Suite', () => {
  test('initial test', () => {
    expect(false).toBeFalsy()
  })
  const baseLink = 'http://localhost:3000';
  test('renders correctly with user', () => {
    let container = document.getElementById('bquestion-div');
    waitFor(() => expect(container).toHaveTextContent('Daily Behavioral Interview Question'));
    let card = document.getElementById('daily-bquestion');
    waitFor(() => expect(card).toHaveTextContent('What is something you had to persevere at for multiple months?'));
})
})