import {ADD_TICKET, CREATE_TICKET, RESET_CREATE_TICKET} from '@constants';

const initialState = {
  user_balance: 3,
  tickets: [
    '1282828',
    '9383838',
    '7691709',
    '3910378',
    '7629817',
    '8729671',
    '8720216',
    '6742082',
    '7328901',
    '7628191',
    '3568108',
    '1111111',
    '9999999',
    '1234567',
    '9876543',
    '7264509',
    '1672902',
    '2288918',
    '3698963',
    '7227973',
    '9823724',
    '3755786',
    '8967220',
    '2072808',
    '7608144',
    '9074429',
    '3530163',
    '4202298',
    '5406505',
    '9544494',
    '8625201',
    '5741387',
    '9926504',
    '2947681',
    '8452884',
    '9758924',
    '5683891',
    '8014020',
    '9610578',
    '9768895',
  ],
  selectedTickets: [],
  createTicket: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TICKET:
      return {
        ...state,
        selectedTickets: action.payload,
      };
    case CREATE_TICKET:
      return {
        ...state,
        createTicket: action.payload,
      };
    case RESET_CREATE_TICKET:
      return {
        ...state,
        createTicket: '',
      };
    default:
      return state;
  }
};
