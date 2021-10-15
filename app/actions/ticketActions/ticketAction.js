import {ADD_TICKET, CREATE_TICKET} from '@constants';

export const addTicket = item => (dispatch, getState) => {
  dispatch({
    type: ADD_TICKET,
    payload: item,
  });
};

export const createTicketAction = item => (dispatch, getState) => {
  dispatch({
    type: CREATE_TICKET,
    payload: item,
  });
};
